// AUTOMATIC SLIDE SHOW - JAVASCRIPT
// Declaring variable for slideIndex
let slideIndex = 0;
// Calling the showSlides function
showSlides();
// Next-previous control
function nextSlide() {
  slideIndex++; // Next the slide by increasing the slideIndex
  showSlides(); // Calls the showSlides() function
  timer = _timer; // Resetting the timer
}
function prevSlide() {
  slideIndex--; // Goes to the previous slide by decreasing the slideIndex
  showSlides(); // Calls the showSlides() function
  timer = _timer; // Resetting the timer
}
// Thumbnail image controlls
function currentSlide(n) {
  slideIndex = n - 1; // Stays at the current slide
  showSlides();
  timer = _timer; // Resetting the timer
}
function showSlides() { // showSlides function
  let slides = document.querySelectorAll(".slide");
// If statement checks if slideIndex is greater than the slides.length decrease by 1
  if (slideIndex > slides.length - 1) {
    slideIndex = 0; // Sets the slideIndex as 0
  }
// If statement checks if slideIndex is less than 0
  if (slideIndex < 0){
    slideIndex = slides.length - 1; // Sets the slideIndex as equals to slides.length decrease by 1
  } 
  // Hiding all slides
  slides.forEach((slide) => { 
    slide.style.display = "none"; // Sets the slide.style.display to none
  });
 // Showing one slide base on index number
  slides[slideIndex].style.display = "flex"; // Sets the slide[slideIndex].style.display to flex
}
// Autoplaying the slides 
let timer = 7; // Declaring the variable for timer
const _timer = timer;  // Declaring the variable for _timer as equals to timer

// SetInterval function
setInterval(() => {
  timer--; // Decreasing the timer
  // If statement checks if timer is less than 1 
  if (timer < 1) {
    // If statement checks if slideIndex is not equal to 9
    if(slideIndex != 9){ 
      nextSlide(); // Calls the nextSlide() function 
    }
    timer = _timer; // Resets timer
  }
}, 1000); // 1sec