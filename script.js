// DOM Elements
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const audioCheckbox = document.getElementById('audioCheckbox');
const previewVideo = document.getElementById('previewVideo');
const downloadBtn = document.getElementById('downloadBtn');
const statusIndicator = document.getElementById('statusIndicator');
const statusText = statusIndicator.querySelector('.status-text');
const recordingInfo = document.getElementById('recordingInfo');
const timer = document.getElementById('timer');
const emptyState = document.getElementById('emptyState');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');

// Recording State
let mediaRecorder = null;
let recordedChunks = [];
let stream = null;
let timerInterval = null;
let recordingStartTime = 0;

// Event Listeners
startBtn.addEventListener('click', startRecording);
stopBtn.addEventListener('click', stopRecording);
downloadBtn.addEventListener('click', downloadVideo);

// Start Recording Function
async function startRecording() {
    try {
        // Get display media (screen capture)
        const displayStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                mediaSource: 'screen',
                width: { ideal: 1920 },
                height: { ideal: 1080 },
                frameRate: { ideal: 30 }
            },
            audio: audioCheckbox.checked
        });

        // If audio is enabled and not included in display stream, get separate audio
        let audioStream = null;
        if (audioCheckbox.checked) {
            try {
                audioStream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                });
            } catch (audioError) {
                console.warn('Could not capture audio:', audioError);
                showNotification('Screen capture started without microphone audio', 'warning');
            }
        }

        // Combine streams if we have both
        if (audioStream) {
            const audioTracks = audioStream.getAudioTracks();
            audioTracks.forEach(track => displayStream.addTrack(track));
        }

        stream = displayStream;

        // Set up MediaRecorder
        const options = {
            mimeType: 'video/webm;codecs=vp9',
            videoBitsPerSecond: 2500000
        };

        // Fallback to vp8 if vp9 is not supported
        if (!MediaRecorder.isTypeSupported(options.mimeType)) {
            options.mimeType = 'video/webm;codecs=vp8';
        }

        mediaRecorder = new MediaRecorder(stream, options);

        // Handle data available
        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };

        // Handle recording stop
        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);

            previewVideo.src = url;
            previewVideo.classList.add('active');
            emptyState.classList.add('hidden');
            downloadBtn.style.display = 'flex';

            showNotification('Recording saved successfully!', 'success');
        };

        // Handle stream end (user stops sharing)
        stream.getVideoTracks()[0].addEventListener('ended', () => {
            stopRecording();
        });

        // Start recording
        recordedChunks = [];
        mediaRecorder.start(100); // Collect data every 100ms

        // Update UI
        updateUIForRecording(true);
        startTimer();

        showNotification('Recording started!', 'success');

    } catch (error) {
        console.error('Error starting recording:', error);

        let errorMessage = 'Failed to start recording. ';
        if (error.name === 'NotAllowedError') {
            errorMessage += 'Permission denied.';
        } else if (error.name === 'NotFoundError') {
            errorMessage += 'No screen source found.';
        } else if (error.name === 'NotSupportedError') {
            errorMessage += 'Screen recording not supported in this browser.';
        } else {
            errorMessage += error.message;
        }

        showNotification(errorMessage, 'error');
    }
}

// Stop Recording Function
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();

        // Stop all tracks
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }

        // Update UI
        updateUIForRecording(false);
        stopTimer();
    }
}

// Download Video Function
function downloadVideo() {
    if (previewVideo.src) {
        const a = document.createElement('a');
        a.href = previewVideo.src;
        a.download = `screen-recording-${Date.now()}.webm`;
        a.click();

        showNotification('Download started!', 'success');
    }
}

// Update UI for Recording State
function updateUIForRecording(isRecording) {
    if (isRecording) {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        audioCheckbox.disabled = true;
        statusIndicator.classList.add('recording');
        statusText.textContent = 'Recording';
        recordingInfo.classList.add('active');
        document.querySelector('.recorder-card').classList.add('recording');
    } else {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        audioCheckbox.disabled = false;
        statusIndicator.classList.remove('recording');
        statusText.textContent = 'Ready';
        recordingInfo.classList.remove('active');
        document.querySelector('.recorder-card').classList.remove('recording');
    }
}

// Timer Functions
function startTimer() {
    recordingStartTime = Date.now();
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
}

function updateTimer() {
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    timer.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Notification Function
function showNotification(message, type = 'info') {
    notificationMessage.textContent = message;
    notification.className = 'notification';

    if (type === 'error') {
        notification.classList.add('error');
    } else if (type === 'success') {
        notification.classList.add('success');
    } else if (type === 'warning') {
        notification.classList.add('warning');
    }

    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl+Alt+R - Start/Stop Recording
    if (e.ctrlKey && e.altKey && e.key === 'r') {
        e.preventDefault();
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            stopRecording();
        } else if (!startBtn.disabled) {
            startRecording();
        }
    }

    // Ctrl+Alt+A - Toggle Audio
    if (e.ctrlKey && e.altKey && e.key === 'a') {
        e.preventDefault();
        if (!audioCheckbox.disabled) {
            audioCheckbox.checked = !audioCheckbox.checked;
            showNotification(`Audio ${audioCheckbox.checked ? 'enabled' : 'disabled'}`, 'info');
        }
    }

    // Ctrl+Alt+D - Download Video
    if (e.ctrlKey && e.altKey && e.key === 'd') {
        e.preventDefault();
        if (downloadBtn.style.display !== 'none' && previewVideo.src) {
            downloadVideo();
        }
    }
});

// Check browser support on load
window.addEventListener('load', () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        showNotification('Screen recording is not supported in this browser. Please use Chrome, Edge, or Firefox.', 'error');
        startBtn.disabled = true;
    } else {
        // Show keyboard shortcuts hint
        setTimeout(() => {
            showNotification('Tip: Use Ctrl+Alt+R to start/stop recording', 'info');
        }, 1000);
    }
});

// Handle page unload during recording
window.addEventListener('beforeunload', (e) => {
    if (mediaRecorder && mediaRecorder.state === 'recording') {
        e.preventDefault();
        e.returnValue = 'Recording in progress. Are you sure you want to leave?';
        return e.returnValue;
    }
});
