
function updateTray(sliderElement) 
{
  const min = parseFloat(sliderElement.min);
  const max = parseFloat(sliderElement.max);
  const currentValue = parseFloat(sliderElement.value);
  const percentage = ((currentValue - min) / (max - min)) * 100;

  sliderElement.style.background = `linear-gradient(to right, rgb(0, 40, 85) 0%, rgb(0, 40, 85) ${percentage}%, rgb(211, 211, 211) ${percentage}%, rgb(211, 211, 211) 100%)`;
}



document.addEventListener("DOMContentLoaded", function () {

  var ScaleSliderValue = document.getElementById("ScaleSliderValue2");
  var PitchSliderValue = document.getElementById("pitchSliderValue");
  var RollSliderValue = document.getElementById("rollSliderValue");
  var YawSliderValue = document.getElementById("yawSliderValue");
  
  // Create multiple sliders in different divs
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
        let normalSlider = document.getElementById('yawSlider');
        normalSlider.value = value;
        updateTray(normalSlider);                
        YawSliderValue.value = value;
      }
  });

  //SetYawValue(180);

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
        SetPitchValue(value); // Callback when value changes
        let normalSlider = document.getElementById('pitchSlider');
        normalSlider.value = value;
        updateTray(normalSlider);
        PitchSliderValue.value = value;
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
        SetRollValue(value); // Callback when value changes
        let normalSlider = document.getElementById('rollSlider');
        normalSlider.value = value;
        updateTray(normalSlider);
        RollSliderValue.value = value;
      }
    });

    var scaleSlider = document.getElementById("scaleSlider");
    

    const sliders = document.querySelectorAll('.Rensonslider');
    sliders.forEach(slider => {
      slider.oninput = function() 
      {
        if (this.id === "scaleSlider2") 
        {
            modelViewer.scale = `${this.value} ${this.value} ${this.value}`;
            scaleSlider.value = this.value;
            ScaleSliderValue.value = this.value;
            updateTray(scaleSlider);
        }
        else if (this.id === "yawSlider") 
        {            
          SetYawValue(this.value);
          YawSliderValue.value = (this.value);
          slider1.setHandlePosition(-this.value);
        }
        else if (this.id === "pitchSlider") 
        {
          SetPitchValue(this.value);
          PitchSliderValue.value = this.value;
          slider2.setHandlePosition(-this.value);
        }
        else if (this.id === "rollSlider") 
        {
          SetRollValue(this.value);
          RollSliderValue.value = this.value;
          slider3.setHandlePosition(-this.value);
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
      ScaleSliderValue.value = this.value;
      let extraslider = document.getElementById("scaleSlider2");
      extraslider.value = this.value;
      updateTray(extraslider);
    }

    ScaleSliderValue.oninput = function() {
      // Define minimum and maximum values
      let minScale = parseFloat(this.min) || 0.25;
      let maxScale = parseFloat(this.max) || 2;

      let scaleValue = parseFloat(this.value);
      
      if (isNaN(scaleValue))
      {
        scaleValue = minScale;
      } 
      else if (scaleValue < minScale) 
      {
        scaleValue = minScale;
      } 
      else if (scaleValue > maxScale) 
      {
        scaleValue = maxScale;
        this.value = maxScale;
      }
      modelViewer.scale = `${scaleValue} ${scaleValue} ${scaleValue}`;

      scaleSlider.value = scaleValue;
      updateTray(scaleSlider);
      let extraslider = document.getElementById("scaleSlider2");
      extraslider.value = scaleValue;
      updateTray(extraslider);
    }

    ScaleSliderValue.onblur = function()
    {
      let scaleValue = parseFloat(this.value);
      
      if (isNaN(scaleValue))
      {
        scaleValue = 1;
        modelViewer.scale = `${scaleValue} ${scaleValue} ${scaleValue}`;      
        scaleSlider.value = scaleValue;
        updateTray(scaleSlider);
        let extraslider = document.getElementById("scaleSlider2");
        extraslider.value = scaleValue;
        updateTray(extraslider);
        ScaleSliderValue.value = scaleValue;
      }
    }
    

    PitchSliderValue.oninput = function() 
    {
      var minPitch = parseFloat(this.min) || -180;
      var maxPitch = parseFloat(this.max) || 180;

      let PitchValue = parseFloat(this.value);
      
      if (isNaN(PitchValue))
      {
        PitchValue = minPitch;
        return;             
      } 
      else if (PitchValue < minPitch) 
      {
        PitchValue = minPitch;
        this.value = minPitch;
      } 
      else if (PitchValue > maxPitch) 
      {
        PitchValue = maxPitch;
        this.value = maxPitch;
      }
      SetPitchValue(PitchValue);
      slider2.setHandlePosition(-PitchValue); 
      let normalSlider = document.getElementById('pitchSlider');            
      normalSlider.value = PitchValue;
      updateTray(normalSlider);           
    }

    PitchSliderValue.onblur = function()
    {
      let PitchValue = parseFloat(this.value);
      
      if (isNaN(PitchValue))
      {
        PitchValue = 0;
             
        SetPitchValue(PitchValue);
        slider2.setHandlePosition(PitchValue); 
        let normalSlider = document.getElementById('pitchSlider');            
        normalSlider.value = PitchValue;
        updateTray(normalSlider);
        this.value = PitchValue;
      }
    }

    RollSliderValue.oninput = function() 
    {
      var minRoll = parseFloat(this.min) || -180;
      var maxRoll = parseFloat(this.max) || 180;

      let RollValue = parseFloat(this.value);
      
      if (isNaN(RollValue))
      {
        RollValue = minRoll;
        return;             
      } 
      else if (RollValue < minRoll) 
      {
        RollValue = minRoll;
        this.value = minRoll;
      } 
      else if (RollValue > maxRoll) 
      {
        RollValue = maxRoll;
        this.value = maxRoll;
      }
      SetRollValue(RollValue);
      slider3.setHandlePosition(-RollValue); 
      let normalSlider = document.getElementById('rollSlider');            
      normalSlider.value = RollValue;
      updateTray(normalSlider);           
    }

    RollSliderValue.onblur = function()
    {
      let RollValue = parseFloat(this.value);
      
      if (isNaN(RollValue))
      {
        RollValue = 0;
             
        SetRollValue(RollValue);
        slider3.setHandlePosition(RollValue); 
        let normalSlider = document.getElementById('rollSlider');            
        normalSlider.value = RollValue;
        updateTray(normalSlider);
        this.value = RollValue;      
      }
    }

    YawSliderValue.oninput = function() 
    {
      var minYaw = parseFloat(this.min) || -180;
      var maxYaw = parseFloat(this.max) || 180;

      let YawValue = parseFloat(this.value);
      
      if (isNaN(YawValue))
      {
        YawValue = minYaw;
        return;             
      } 
      else if (YawValue < minYaw) 
      {
        YawValue = minYaw;
        this.value = minYaw;
      } 
      else if (YawValue > maxYaw) 
      {
        YawValue = maxYaw;
        this.value = maxYaw;
      }

      
      SetYawValue(YawValue);
      slider1.setHandlePosition(-YawValue); 
      let normalSlider = document.getElementById('yawSlider');            
      normalSlider.value = YawValue;
      updateTray(normalSlider);           
    }

    YawSliderValue.onblur = function()
    {
      let YawValue = parseFloat(this.value);
      
      if (isNaN(YawValue))
      {
        YawValue = 0;
        this.value = YawValue;
        SetYawValue(YawValue);
        slider1.setHandlePosition(-YawValue); 
        let normalSlider = document.getElementById('yawSlider');            
        normalSlider.value = YawValue;
        updateTray(normalSlider);      
      }
    }

  });

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

const GizmoCheckbox = document.getElementById('gizmoCheckbox');
GizmoCheckbox.onchange = function(){
  if(GizmoCheckbox.checked)
  {
    //document.getElementById('AdvancedRotationSettings').style.display = "block";
    document.getElementById('AdvancedRotationSettings').classList.add("expanded");
    document.getElementById('AdvancedRotationSliders').style.display = "block";
  }
  else
  {
    //document.getElementById('AdvancedRotationSettings').style.display = "none";
    document.getElementById('AdvancedRotationSettings').classList.remove("expanded");
    document.getElementById('AdvancedRotationSliders').style.display = "none";
  }
};