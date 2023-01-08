// SHUFFLE GALLERY WEB ANIMATION API - JAVASCRIPT
// Declaring variable for animations
// slingInAnimation
const slingInAnimation = [ 
  {transform: 'none'}, // Defines that there's no tranformation
  {transform: 'scale(0.9)', offset: 0.5}, // Defines scale transformation & offset by given value
  {transform: 'scale(0.9)'} // Defines scale transformation by given value
]
// slingOutAnimation 
const slingOutAnimation = [ 
  {transform: 'scale(0.9)'}, // Defines scale transformation by given value
  {transform: 'none'}, // Defines that there's no tranformatiosn
]
// slingshotOutAndMoveAnim
const slingOutMoveAnimation = (x, y) => ([
  {transform: `translate(${x}px, ${y}px) scale(0.9)`}, // Defines 2D translation & scale transformation by given value 
  {transform: `none`}, // Defines that there's no tranformation
])
// Declaring variables for pictures
// pictures variable
const pictures = Array.from(document.getElementsByClassName("item")); // Gets the item by class name from canvas 
pictures.forEach(item => { // forEach function
  // Adding event lsitener
  item.addEventListener('click', () => { onClick(item) } ) // Identify if any pictures is being clicked
});
// onClick vairable
const onClick = item => {
  // center elements
  const centerElement = item.parentElement.children[4] // Positions the item 
  // start animations
  const animations = pictures.map(item => item.animate( 
    slingInAnimation, // Calls the slingInAnimation
    { duration: 300 } // Duration of the slingshotAnim
  ))
  // Applies to each animations
  animations.forEach(animation => {
    // Adding event listener
    animation.addEventListener("finish", e => { // Identify if the animation is finish
      onslingInAnimationFinished(e, item, centerElement) // Calls the onslingInAnimationFinished() function & return elements inside()
    })
  })
}
// Declaring variable for onslingInAnimationFinished() function
const onslingInAnimationFinished = (e, item, centerElement) => { 
  // Declaring variable for animationDuration
  const animationDuration = {duration: 300, ease: 'ease-out'} // Defines variable for animationDuration using the given elements
  // Declaring variable for animationElement
  const animationElement = e.target.effect.target // Starts the other half of the animation
  // If statement checks if:
  if (animationElement === item && item !== centerElement) { // The item animated element & the chosen item is the same, but is different on the 2nd chosen/centered item.  
    // Declaring variables for elements position for swapping
    const firstPickedPic = animationElement.getBoundingClientRect() // Gets & apply animation to the first picked item
    const nextPickedPic = centerElement.getBoundingClientRect() // Gets & apply animation to the second picked item
    // Declaring variables for swapping the elements
    var posToCenter = centerElement.nextElementSibling // Defining variable of posToCenter
    var posToTarget = item.nextElementSibling // Defining variable of posToTarget
    // Positioning the pictures
    item.parentElement.insertBefore(item, posToCenter) // Swaps element next to Center
    item.parentElement.insertBefore(centerElement, posToTarget) // Swaps Element next to Target
    // Declaring variables for flip animation
    const deltaX = firstPickedPic.left - nextPickedPic.left; // Defining variable of deltaX
    const deltaY = firstPickedPic.top - nextPickedPic.top; // Defining variable of deltaY
    // Animating the pictures
    item.animate(slingOutMoveAnimation(deltaX, deltaY),  animationDuration) // Animate the pictures using the class & elements used
    centerElement.animate(slingOutMoveAnimation(-deltaX, -deltaY), animationDuration) // Centers & animate the pictures using the class & elements used
  }
  // Else if statement:
  else if (animationElement !== centerElement || item === centerElement) { // Checks if the first & second pictures picked are the same or the pictures are already centered
    animationElement.animate(slingOutAnimation, animationDuration) // Only uses slingOutAnimation to animate the picked item
  }
}