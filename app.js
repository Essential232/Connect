const joinForm = document.querySelector('#joinForm');
const nameInput = document.querySelector('#name');
const roomInput = document.querySelector('#room');
const formNote = document.querySelector('#formNote');
const previewAvatar = document.querySelector('#previewAvatar');
const previewMessage = document.querySelector('#previewMessage');
const cameraToggle = document.querySelector('#cameraToggle');
const micToggle = document.querySelector('#micToggle');
const copyRoom = document.querySelector('#copyRoom');

// Add your Scaledrone client and room subscription here when wiring the call layer.
const channelConfig = {
  roomName: roomInput.value,
  scaledroneChannel: '2GjuFGfVv6adrPZw'
};

function setPreviewState(isCameraOn) {
  cameraToggle.classList.toggle('is-off', !isCameraOn);
  cameraToggle.setAttribute('aria-pressed', String(isCameraOn));
  cameraToggle.title = isCameraOn ? 'Turn camera off' : 'Turn camera on';
  cameraToggle.querySelector('.sr-only').textContent = isCameraOn ? 'Turn camera off' : 'Turn camera on';
  previewMessage.textContent = isCameraOn ? 'Camera preview ready' : 'Camera preview is off';
  document.querySelector('#preview').classList.toggle('camera-on', isCameraOn);
}

cameraToggle.addEventListener('click', () => {
  setPreviewState(cameraToggle.classList.contains('is-off'));
});

micToggle.addEventListener('click', () => {
  const isOn = micToggle.getAttribute('aria-pressed') === 'true';
  micToggle.setAttribute('aria-pressed', String(!isOn));
  micToggle.classList.toggle('is-off', isOn);
  micToggle.title = isOn ? 'Unmute microphone' : 'Mute microphone';
  micToggle.querySelector('.sr-only').textContent = isOn ? 'Unmute microphone' : 'Mute microphone';
});

nameInput.addEventListener('input', () => {
  const initial = nameInput.value.trim().charAt(0).toUpperCase();
  previewAvatar.textContent = initial || 'Y';
});

copyRoom.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(roomInput.value);
    copyRoom.textContent = '✓';
    copyRoom.title = 'Room name copied';
    setTimeout(() => {
      copyRoom.textContent = '⧉';
      copyRoom.title = 'Copy room name';
    }, 1400);
  } catch {
    roomInput.select();
    formNote.textContent = 'Room name selected. Press Ctrl+C to copy it.';
  }
});

roomInput.addEventListener('input', () => {
  channelConfig.roomName = roomInput.value.trim();
});

joinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!nameInput.value.trim() || !roomInput.value.trim()) return;

  formNote.textContent = `Welcome, ${nameInput.value.trim()}. Room ${roomInput.value.trim()} is ready.`;
  formNote.style.color = '#2f706c';
});
