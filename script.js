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

function openNav() {  
  if (window.matchMedia("(max-width: 480px)").matches) {
    document.getElementById("mySidenav").style.width = "100%"; //phone
    
  } else {
    document.getElementById("mySidenav").style.width = "30%"; //pc
  }
  //https://stackoverflow.com/questions/54044739/how-can-i-define-a-variable-depending-on-the-width-of-the-screen
  document.getElementById("mySidenav").style.textWrap = "wrap";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("mySidenav").style.textWrap = "nowrap";
}

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav