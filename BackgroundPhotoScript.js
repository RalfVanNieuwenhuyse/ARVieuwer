
function updateTray(sliderElement) 
{
  const min = parseFloat(sliderElement.min);
  const max = parseFloat(sliderElement.max);
  const currentValue = parseFloat(sliderElement.value);
  const percentage = ((currentValue - min) / (max - min)) * 100;

  sliderElement.style.background = `linear-gradient(to right, rgb(0, 40, 85) 0%, rgb(0, 40, 85) ${percentage}%, rgb(211, 211, 211) ${percentage}%, rgb(211, 211, 211) 100%)`;
}

function syncValues(query, value) 
{
  let elements = document.querySelectorAll(query); 

  if (elements.length <= 0) 
  {
    console.warn("there are no elements with query: " + query);  
  } 

  elements.forEach(element => 
  {    
    element.value = value;
    if (element.tagName === 'INPUT' && element.type === 'range') 
    {
      updateTray(element);
    }    
  });
}

document.addEventListener("DOMContentLoaded", function () {  
  
  const slider1 = new EllipticalSlider('slider1-container', 'slider1', {
      radiusX: 150,
      radiusY: 40,
      color: 'blue',
      handleColor: 'var(--Button-blue-color)',
      initialValue: 0,
      min: 180,
      max: -180,
      showValue: false,
      borderThickness: 5,           
      onChange: function(value) 
      {
        SetYawValue(value);
        syncValues("#yawSlider",value);
        syncValues("#yawSliderValue",value);
      }
  });
  
  const slider2 = new EllipticalSlider('slider2-container', 'slider2', {
      radiusX: 50,
      radiusY: 150,
      color: 'green',
      handleColor: 'var(--Button-blue-color)',
      initialValue: 0,
      min: -180,
      max: 180,
      showValue: false,
      borderThickness: 5,
      onChange: function(value) 
      {
        SetPitchValue(value);
        syncValues("#pitchSlider",value);
        syncValues("#pitchSliderValue",value);
      }
    });

    const slider3 = new EllipticalSlider('slider3-container', 'slider3', {
      radiusX: 125,
      radiusY: 125,
      color: 'red',
      handleColor: 'var(--Button-blue-color)',
      initialValue: 0,
      min: 180,
      max: -180,
      showValue: false,
      borderThickness: 5,
      onChange: function(value) 
      {
        SetRollValue(value);
        syncValues("#rollSlider",value);
        syncValues("#rollSliderValue",value);
      }
    });

    var scaleSlider = document.getElementById("scaleSlider");
    updateTray(scaleSlider);
    

    const sliders = document.querySelectorAll('.Rensonslider');
    sliders.forEach(slider => {
      slider.oninput = function() 
      {
        if (this.id === "scaleSlider2") 
        {
            modelViewer.scale = `${this.value} ${this.value} ${this.value}`;
            scaleSlider.value = this.value;
            syncValues("#ScaleSliderValue2",this.value)
            updateTray(scaleSlider);
            syncValues("#scaleSlider2",this.value);            
        }
        else if (this.id === "yawSlider") 
        {            
          SetYawValue(this.value);
          slider1.setHandlePosition(-this.value);
          syncValues("#yawSlider",this.value);
          syncValues("#yawSliderValue",this.value);
        }
        else if (this.id === "pitchSlider") 
        {
          SetPitchValue(this.value);
          slider2.setHandlePosition(-this.value);
          syncValues("#pitchSlider",this.value);
          syncValues("#pitchSliderValue",this.value);
        }
        else if (this.id === "rollSlider") 
        {
          SetRollValue(this.value);
          slider3.setHandlePosition(-this.value);
          syncValues("#rollSlider",this.value);
          syncValues("#rollSliderValue",this.value);
        }
        
        let Scalevalue = (this.value - this.min) / (this.max - this.min) * 100;
        this.style.background = 
        `linear-gradient(to right, rgb(0, 40, 85) 0%, rgb(0, 40, 85) ${Scalevalue}%, rgb(211, 211, 211) ${Scalevalue}%, rgb(211, 211, 211) 100%)`;
        
      };
    });

    sliders.forEach(slider => 
    {
      let scaleValue = (slider.value - slider.min) / (slider.max - slider.min) * 100;
      slider.style.background = `linear-gradient(to right, rgb(0, 40, 85) 0%, rgb(0, 40, 85) ${scaleValue}%, rgb(211, 211, 211) ${scaleValue}%, rgb(211, 211, 211) 100%)`;
    });
    
    scaleSlider.oninput = function() 
    {        
      modelViewer.scale = `${this.value} ${this.value} ${this.value}`;
      updateTray(this);
      syncValues("#ScaleSliderValue2",this.value)
      syncValues("#scaleSlider2",this.value);
      //let extraslider = document.getElementById("scaleSlider2");
      //extraslider.value = this.value;
      //updateTray(extraslider);
    }
     
    const InputFields = document.querySelectorAll('.sliderValue');
      InputFields.forEach(inputField => {
        inputField.oninput = function() 
        {
          let minValue = parseFloat(this.min) || 0.25;
          let maxValue = parseFloat(this.max) || 2;

          let inputValue = parseFloat(this.value);
          

          if (isNaN(inputValue))
          {
            inputValue = minValue;
          } 
          else if (inputValue < minValue) 
          {
            inputValue = minValue;
          } 
          else if (inputValue > maxValue) 
          {
            inputValue = maxValue;            
          }

          if (this.id === "ScaleSliderValue2") 
          {
            modelViewer.scale  = `${inputValue} ${inputValue} ${inputValue}`;
            syncValues("#scaleSlider2",inputValue);
            scaleSlider.value = inputValue;
            updateTray(scaleSlider);
          }
          else if (this.id === "yawSliderValue")
          {
            SetYawValue(inputValue);
            slider1.setHandlePosition(-inputValue); 
            syncValues("#yawSlider",inputValue);
          }
          else if (this.id === "pitchSliderValue")
          {
            SetPitchValue(inputValue);
            slider2.setHandlePosition(-inputValue); 
            syncValues("#pitchSlider",inputValue);
          }
          else if (this.id === "rollSliderValue")
          {
            SetRollValue(inputValue);
            slider3.setHandlePosition(-inputValue); 
            syncValues("#rollSlider",inputValue);
          }

        };
      });

      InputFields.forEach(inputField => {
        inputField.onblur = function() 
        {
          let minValue = parseFloat(this.min) || 0.25;
          let maxValue = parseFloat(this.max) || 2;

          let inputValue = parseFloat(this.value);

          if (inputValue < minValue) 
          {
            inputValue = minValue;
          } 
          else if (inputValue > maxValue) 
          {
            inputValue = maxValue;            
          }

          if (this.id === "ScaleSliderValue2") 
          {
            if (isNaN(inputValue))
            {
              inputValue = 1;
            }
            modelViewer.scale  = `${inputValue} ${inputValue} ${inputValue}`;
            syncValues("#scaleSlider2",inputValue);
            scaleSlider.value = inputValue;
            updateTray(scaleSlider);
            syncValues("#ScaleSliderValue2", inputValue);
          }
          else if (this.id === "yawSliderValue")
          {            
            if (isNaN(inputValue))
            {
              inputValue = 0;
            }
            SetYawValue(inputValue);
            slider1.setHandlePosition(-inputValue); 
            syncValues("#yawSlider",inputValue);
            syncValues("#yawSliderValue", inputValue);
          }
          else if (this.id === "pitchSliderValue")
          {
            if (isNaN(inputValue))
            {
              inputValue = 0;
            }
            SetPitchValue(inputValue);
            slider2.setHandlePosition(-inputValue); 
            syncValues("#pitchSlider",inputValue);
            syncValues("#pitchSliderValue", inputValue);
          }
          else if (this.id === "rollSliderValue")
          {
            if (isNaN(inputValue))
            {
              inputValue = 0;
            }
            SetRollValue(inputValue);
            slider3.setHandlePosition(-inputValue); 
            syncValues("#rollSlider",inputValue);
            syncValues("#rollSliderValue", inputValue);
          }
        };
      });
});//end document.addEventListener("DOMContentLoaded", function ())

var rotationSelector = document.getElementById("rotationSelector");

function selectSlider(selector) 
{
  var selected = selector.querySelector('input[name="rotation"]:checked');  
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

  synchronizeSelections(selected.value);
};

function synchronizeSelections(value) {  
  let forms = document.querySelectorAll('.AdvancedRotationSettings form');
  if (!forms.length) {
      console.warn("No forms found in .AdvancedRotationSettings.");
      return;
  }
  forms.forEach(form => {
      let radio = form.querySelector(`input[name="rotation"][value="${value}"]`);
      if (radio) {
          radio.checked = true;
      } else {
          console.warn(`No radio button with value="${value}" found in form.`);
      }
  });
}

if(rotationSelector != null)
{
  window.addEventListener('DOMContentLoaded', () => {
    selectSlider(rotationSelector);
  });
}

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

    
      let displayitems = document.querySelectorAll(".DispplayOnlyOnImageBackground");
      displayitems.forEach(element => {
      element.style.display = "block";    
      });
        
      let displayitems2 = document.querySelectorAll(".DispplayOnlyOnImageBackground2");
      displayitems2.forEach(element => {
      element.style.display = "block";    
      });
    
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

  let displayitems2 = document.querySelectorAll(".DispplayOnlyOnImageBackground2");
  displayitems2.forEach(element => {
    element.style.display = "none";    
  });
  
  let checkboxs = document.querySelectorAll(".customCheckbox");
  checkboxs.forEach(element => {
    element.checked=false;
    displayAdvancedSliders(element);
  });
}

function displayAdvancedSliders(checkbox) 
{
  const settings = document.querySelectorAll(".AdvancedRotationSettings");
  if (checkbox.checked) 
  {
    document.getElementById('AdvancedRotationSliders').style.display = "block";    
    settings.forEach(element => {
      element.classList.add("expanded");
    });
    let checkboxs = document.querySelectorAll(".customCheckbox");
    checkboxs.forEach(element => 
    {
      element.checked=true;      
    });
  } 
  else 
  {
    document.getElementById('AdvancedRotationSliders').style.display = "none";
    settings.forEach(element => 
    {
      element.classList.remove("expanded");
    });

    let checkboxs = document.querySelectorAll(".customCheckbox");
    checkboxs.forEach(element => 
    {
      element.checked=false;      
    });
  }
}