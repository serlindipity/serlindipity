// OSCILLATION CANVAS API - JAVASCRIPT
// Declaring variables for canvas
var canvas = document.getElementById("oscillation_interaction"); // Gets the canvas
var ctx = canvas.getContext("2d"); // Sets up the canvas
// Declaring variables for input sliders
var amplitudeSlider = document.getElementById("amplitude_slider"); // Amplitude input slider
var waveLengthSlider = document.getElementById("wavelength_slider"); // WaveLength input slider
// Declaring variables for waveLengthSlider.value, intervalCount lengthOfWave , & amplitudeVibration
waveLengthSlider.value = 50; // Sets the waveLengthSlider's length value to 50 (the middle)
var intervalCount = 0; // intervalCount to count how many times the window.setInterval is running
var lengthOfWave = 176; // Defines lengthOfWave 's variable
var amplitudeVibration = 30; // Defines wave's amplitudeVibration variable
// Amplitude input slider details -----------------------
amplitudeSlider.value = amplitudeVibration; // Makes the slider and the defalut value "get along"
amplitudeSlider.addEventListener("input", function() { // Adds an event listener to the amplitude slider
  amplitudeVibration = amplitudeSlider.value; // Sets the amplitudeVibration equivalent to amplitudeSlider
});
// Wave length input slider details -----------------------
waveLengthSlider.addEventListener("input", function() { // Adds an event listener to the wave slider
  lengthOfWave  = 176; // Default lengthOfWave  size 
  lengthOfWave  += (waveLengthSlider.value - 50) / 100; // Adds 50 to the original 176 to lengthOfWave 
});
// If statement to check if canvas API is supported
if (canvas.getContext) {
  window.setInterval(function() { // Calls the function() 
    intervalCount++; // Increases the intervalCount
    // Drawing into the canvas 
    ctx.strokeStyle = "#000000"; // Draws circle's border using black color
    ctx.fillStyle = "#FFFFFF"; // Draws circle's using white color
    // Clearing Canvas
    ctx.clearRect(0, 0, 300, 200); // Clears screen
    // for loop for initializing through points -10 through half the screen
    for (var i = -10; i < 150; i++) {
      // displays circle based on intervalCount and other values passed in by the sliders
      ctx.beginPath(); // Begins or creates a new path
      ctx.arc(i, ( // Create the circles
          // Usage of Math.sin() function
          Math.sin(
            ((intervalCount) + i) * lengthOfWave) * amplitudeVibration) + 100, // Calculation for circles
            10, 10, 0, Math.PI * 2, false); // Defining angles for arc
      ctx.stroke(); // Draws the outline of the arc to canvas
      ctx.fill(); // Draws the inside contents of the arc to canvas
    }
  }, 10); // Allows to call the function() every 10 milliseconds
}