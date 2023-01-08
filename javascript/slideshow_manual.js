// MANUAL SLIDE SHOW - JAVASCRIPT
// Getting the video
const videos = document.getElementsByTagName("video");
// Declaring variable for slideIndex
let slideIndex = 0;
// Calling the showSlides function
showSlides();
// Next & previous control
function nextSlide() { // nextSlide function
  slideIndex++; // Next the slide by increasing the slideIndex
  showSlides(); // Calls the showSlides() function
} 
function prevSlide() { // prevSlide function
  slideIndex--; // Goes to the previous slide by decreasing the slideIndex
  showSlides(); // Calls the showSlides() function
}
// Thumbnail image controlls
function currentSlide(n) { // currentSlide() function
  slideIndex = n - 1; // Stays at the current slide
  showSlides(); // Calls the showSlides() function
}
// showSlide function
function showSlides() {
  let slides = document.querySelectorAll(".slide"); // Declaring variable for slides
  // Testing the videos
  console.log(videos);
  // If statement checks if videos.length is greater than 0
  if (videos.length > 0) {
    // Array for showing the videos / div
    Array.from(videos).forEach((video) => 
      video.pause() // Calls the pause() function 
      );
  }
  // If statement checks if slideIndex is greater than slides.length
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