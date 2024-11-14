//const rollSlider = document.querySelector('#roll');
//const pitchSlider = document.querySelector('#pitch');
//const yawSlider = document.querySelector('#yaw');

var RollValue = 0;
var PitchValue = 0;
var YawValue = 0;

function SetRollValue(value)
{
  RollValue = value;
  updateOrientation();
}

function SetPitchValue(value)
{
  PitchValue = value;
  updateOrientation();
}

function SetYawValue(value)
{
  YawValue = value;
  updateOrientation();
}



// Track the current orientation as a quaternion (initially set to no rotation)
let currentQuaternion = { x: 0, y: 0, z: 0, w: 1 };

// Convert degrees to radians
function degreesToRadians(deg) {
  return (deg * Math.PI) / 180;
}

// Convert quaternion to Euler angles (roll, pitch, yaw in degrees)
function quaternionToEuler(q) {
  const sinr_cosp = 2 * (q.w * q.x + q.y * q.z);
  const cosr_cosp = 1 - 2 * (q.x * q.x + q.y * q.y);
  const roll = Math.atan2(sinr_cosp, cosr_cosp);

  const sinp = 2 * (q.w * q.y - q.z * q.x);
  const pitch = Math.abs(sinp) >= 1 ? Math.sign(sinp) * Math.PI / 2 : Math.asin(sinp);

  const siny_cosp = 2 * (q.w * q.z + q.x * q.y);
  const cosy_cosp = 1 - 2 * (q.y * q.y + q.z * q.z);
  const yaw = Math.atan2(siny_cosp, cosy_cosp);

  return {
    roll: (roll * 180) / Math.PI,
    pitch: (pitch * 180) / Math.PI,
    yaw: (yaw * 180) / Math.PI
  };
}

// Update the model orientation based on sliders (local rotation)
function updateOrientation() {
  const roll = degreesToRadians(parseFloat(RollValue));
  const pitch = degreesToRadians(parseFloat(PitchValue));
  const yaw = degreesToRadians(parseFloat(YawValue));

  // Create quaternions for each rotation axis
  const rollQuat = { x: Math.sin(roll / 2), y: 0, z: 0, w: Math.cos(roll / 2) };
  const pitchQuat = { x: 0, y: Math.sin(pitch / 2), z: 0, w: Math.cos(pitch / 2) };
  const yawQuat = { x: 0, y: 0, z: Math.sin(yaw / 2), w: Math.cos(yaw / 2) };

  // Apply yaw -> pitch -> roll to maintain local rotation
  currentQuaternion = multiplyQuaternions(multiplyQuaternions(yawQuat, pitchQuat), rollQuat);

  // Convert the updated quaternion back to Euler angles for display
  const euler = quaternionToEuler(currentQuaternion);
  modelViewer.orientation = `${euler.roll}deg ${euler.pitch}deg ${euler.yaw}deg`;
}

// Quaternion multiplication (for combining rotations)
function multiplyQuaternions(q1, q2) {
  return {
    w: q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z,
    x: q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
    y: q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
    z: q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w
  };
}

// Event listeners for each slider
//rollSlider.oninput = updateOrientation;
//pitchSlider.oninput = updateOrientation;
//yawSlider.oninput = updateOrientation;