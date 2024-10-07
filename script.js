// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');

  if (event.detail.totalProgress === 0) {
    progressBar.style.display = 'block';
    updatingBar.style.width = '0%';
  } else {
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

    if (event.detail.totalProgress === 1) {
      setTimeout(() => {
        progressBar.style.display = 'none';
      }, 500);
    }
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);
//https://github.com/google/model-viewer/discussions/4142