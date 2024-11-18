// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');

  if (event.detail.totalProgress === 0) {
    progressBar.style.display = 'block';
    updatingBar.style.width = '0%';
  } else {
    updatingBar.style.width = `${event.detail.totalProgress * 100}%`; // Fixed template string
    const progressCompleteEvent = new CustomEvent('progressComplete', {
      detail: { message: 'Progress is complete!' }
    });
    event.target.dispatchEvent(progressCompleteEvent);

    if (event.detail.totalProgress === 1) {
      setTimeout(() => {
        progressBar.style.display = 'none';

        // Dispatch a custom event when the progress is complete
        const progressCompleteEvent = new CustomEvent('progressComplete', {
          detail: { message: 'Progress is complete!' }
        });
        event.target.dispatchEvent(progressCompleteEvent); // Dispatch the event

      }, 500);
      
    }
  }
};


if(document.querySelector('model-viewer'))
{
  document.querySelector('model-viewer').addEventListener('progress', onProgress);
}
//https://github.com/google/model-viewer/discussions/4142

function openNav() {  
  if (window.matchMedia("(max-width: 480px)").matches) {
    document.getElementById("mySidenav").style.width = "100%"; //phone    
    
  } else {
    document.getElementById("mySidenav").style.width = "30%"; //pc
    //document.getElementById("Sidepush").style.marginLeft = "30%";
  }
  //https://stackoverflow.com/questions/54044739/how-can-i-define-a-variable-depending-on-the-width-of-the-screen
  document.getElementById("mySidenav").style.textWrap = "wrap";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  /*document.getElementById("Sidepush").style.marginLeft = "30%";*/
  document.getElementById("mySidenav").style.textWrap = "nowrap";
}

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_sidenav

var elementTime = document.getElementById('myTimeOut');
if(elementTime)
{// Set the time in milliseconds for fade-out
var time = 3000;
// Show the element by setting opacity to 1 and display block
elementTime.style.display = 'block';
elementTime.style.opacity = '1'; // Make sure it's fully visible
// Hide the element with a fade-out effect after the specified time
setTimeout(function() 
{
  // Gradually reduce the opacity to 0
  elementTime.style.transition = 'opacity 1s'; // 1 second fade effect
  elementTime.style.opacity = '0'; // Fades out
  // Optional: Set display to 'none' after the fade-out is done (after 1 second)
  setTimeout(function() 
  {
    elementTime.style.display = 'none';
  }, 1000); // Time to match the fade-out duration

}, time);

window.addEventListener('DOMContentLoaded', () => {
  if (!window.matchMedia("(max-width: 480px)").matches) {
    setTimeout(function() 
    {openNav();},0)    
  }
  
  
});}

var fileTag = document.getElementById("filetag");
    
fileTag.addEventListener("change", function() {
  changeImage(this);
});

function changeImage(input)
{
  let reader;
  if (input.files && input.files[0])
  {
    reader = new FileReader();
    reader.onload = function(e) 
    {        
      document.getElementById("model-viewer").style.backgroundImage = `url(${e.target.result})`;
    }
    reader.readAsDataURL(input.files[0]);

    if (!window.matchMedia("(max-width: 480px)").matches) 
    {
      let displayitems = document.querySelectorAll(".DispplayOnlyOnImageBackground");
      displayitems.forEach(element => {
      element.style.display = "block";    
      });
    }
    document.getElementById("clearImageButton").style.display = "flex";
  }
}

function clearImage() {
  document.getElementById("model-viewer").style.backgroundImage = `url("#")`;
  document.getElementById("clearImageButton").style.display = "none";
  
  // Reset the file input
  const fileInput = document.getElementById("filetag");
  fileInput.value = ""; // Clear the input value
  
  let displayitems = document.querySelectorAll(".DispplayOnlyOnImageBackground");
  displayitems.forEach(element => {
    element.style.display = "none";    
  });
}

//const modelViewer = document.getElementById('model-viewer');
var scaleSlider = document.getElementById("scaleSlider");
scaleSlider.oninput = function() 
{        
  modelViewer.scale = `${this.value} ${this.value} ${this.value}`;
  let Scalevalue = (this.value-this.min)/(this.max-this.min)*100
  this.style.background = 'linear-gradient(to right, rgb(0, 40, 85) 0%, rgb(0, 40, 85) ' + Scalevalue + '%, rgb(211, 211, 211) ' + Scalevalue + '%, rgb(211, 211, 211) 100%)';
}

var rotationSelector = document.getElementById("rotationSelector");

function selectSlider() 
{
  var selected = rotationSelector.querySelector('input[name="rotation"]:checked');
  /*console.log(selected.value);*/
  if (selected.value == "Roll") 
  {
      var RollSlider1 = document.getElementById("slider1-container");
      RollSlider1.style.display = "none";
      var PitchSlider1 = document.getElementById("slider2-container");
      PitchSlider1.style.display = "none";
      var YawSlider1 = document.getElementById("slider3-container");
      YawSlider1.style.display = "block";
      var ScaleSlider1 = document.getElementById("scaleSlider");
      ScaleSlider1.style.display = "none";
  }
  else if (selected.value == "Pitch") 
  {
      let RollSlider1 = document.getElementById("slider1-container");
      RollSlider1.style.display = "none";
      let PitchSlider1 = document.getElementById("slider2-container");
      PitchSlider1.style.display = "block";
      let YawSlider1 = document.getElementById("slider3-container");
      YawSlider1.style.display = "none";
      let ScaleSlider1 = document.getElementById("scaleSlider");
      ScaleSlider1.style.display = "none";
  }
  else if (selected.value == "Yaw") 
  {
      let RollSlider1 = document.getElementById("slider1-container");
      RollSlider1.style.display = "block";
      let PitchSlider1 = document.getElementById("slider2-container");
      PitchSlider1.style.display = "none";
      let YawSlider1 = document.getElementById("slider3-container");
      YawSlider1.style.display = "none";
      let ScaleSlider1 = document.getElementById("scaleSlider");
      ScaleSlider1.style.display = "none";
  }
  else if (selected.value == "All") 
  {
      let RollSlider1 = document.getElementById("slider1-container");
      RollSlider1.style.display = "block";
      let PitchSlider1 = document.getElementById("slider2-container");
      PitchSlider1.style.display = "block";
      let YawSlider1 = document.getElementById("slider3-container");
      YawSlider1.style.display = "block";
      let ScaleSlider1 = document.getElementById("scaleSlider");
      ScaleSlider1.style.display = "block";
  }
  else if (selected.value == "None") 
  {
      let RollSlider1 = document.getElementById("slider1-container");
      RollSlider1.style.display = "none";
      let PitchSlider1 = document.getElementById("slider2-container");
      PitchSlider1.style.display = "none";
      let YawSlider1 = document.getElementById("slider3-container");
      YawSlider1.style.display = "none";
      let ScaleSlider1 = document.getElementById("scaleSlider");
      ScaleSlider1.style.display = "none";
  }
  else if (selected.value == "Scale") 
  {
      let RollSlider1 = document.getElementById("slider1-container");
      RollSlider1.style.display = "none";
      let PitchSlider1 = document.getElementById("slider2-container");
      PitchSlider1.style.display = "none";
      let YawSlider1 = document.getElementById("slider3-container");
      YawSlider1.style.display = "none";
      let ScaleSlider1 = document.getElementById("scaleSlider");
      ScaleSlider1.style.display = "block";
  }
};

if(rotationSelector != null)
{
  rotationSelector.oninput = selectSlider;
  window.addEventListener('DOMContentLoaded', () => {
    selectSlider();
  });
}
