// PONG GAME CANVAS API - JAVASCRIPT
(function(){
	// Declaring variables for canvas settings
	var canvas = document.getElementById("pong_game"); // Gets the canvas
	var ctx = canvas.getContext("2d"); // Sets up the canvas
	var width=canvas.width; // Sets up the width of the canvas
	var height=canvas.height; // Sets up the height of the canvas
	var x = canvas.width/2; // Defines variable for x 
	var y = canvas.height-30; // Defines variable for y
	// Declaring variables for movements
	var movementX = 2; // Defines movementX
	var movementY = -2; // Defines Y
	// Declaring variables for game elements
	var pongBallRadius = 20; // Defines pong ball's radius
	var pongPaddleHeight = 10; // Defines pongPaddle's height
	var pongPaddleWidth = 75; // Defines pongPaddle's width
	var pongPaddleX = (canvas.width-pongPaddleWidth)/2; // Defines pongPaddleX
	// Declaring variables for keys pressed
	var rightPressed = false; // Defines right arrow
	var leftPressed = false; // Defines left arrow
	// Declaring variables for bricks elements
	var brickRowNum = 3; // Defines number of brickRowNum
	var brickColNum = 5; // Defines number of brickColNum
	var brickWidthVal = 75; // Defines size of brick's width
	var brickHeightVal = 20; // Defines size brick's height
	var brickPaddingSize = 10; // Defines size of brick's padding
	var topOffset = 30; // Defines size of brick's top offset
	var leftOffset = 30; // Defines size of brick's left offset
	// Declaring variable for score
	var score = 0; // Defines 0 as score's variable
	// Declaring variable for bricks
	var bricks = [];
	// for loop to initialize brickColNum
	for(c=0; c<brickColNum; c++) {
		bricks[c] = []; // Defining bricks using c
		// for loop to intialize brickRowNum
		for(r=0; r<brickRowNum; r++) {
			bricks[c][r] = { x: 0, y: 0,status: 1}; // Defining bricks using c & r
		}
	}
	// Declaring variable for brickX & brickY
	var brickX = (c*(brickWidthVal+brickPaddingSize))+leftOffset; // Defines brickX using this formula
	var brickY = (r*(brickHeightVal+brickPaddingSize))+topOffset; // Defines brickY using this formula
	// Declaring variable for fetchId
	var fetchId=function(e_id){ 
		var element=document.getElementById(e_id); // Gets the element id
		// If statement checks if:
		if(element!==null){ // element is not null
			return element; // returns element
		}
		// Else statement:
		else{
			return false; // Makes the return false
		}
	};
	// Declaring variable for mouseMovement
	var mouseMovement=function(e){ 
		// Declaring variable for relativeX
		var relativeX = e.clientX - canvas.offsetLeft; // Defines the variable for relativeX using this formula
			// If statement checks if relativeX is greater than 0, and if its less than the canvas.Width
			if(relativeX > 0 && relativeX < canvas.width) {
				pongPaddleX = relativeX - pongPaddleWidth/2; // Defines the pongPaddleX variable
			}
	};
	// Declaring variable for withKeyPressed
	var withKeyPressed=function(e){
		// Checks if the key:
		if(e.keyCode ==39){ // Right arrow is being pressed
			rightPressed = true; // Sets the rightPressed to true
		}
		else if(e.keyCode == 37){ // Left arrow is being pressed
			leftPressed=true; // Sets the leftPressed to true
		}
	};
	// Declaring variable for withoutKeyPressed
	var withoutKeyPressed=function(e){
		if(e.keyCode ==39){ // Right arrow is not being pressed
			rightPressed = false; // Sets the rightPressed to false
		}
		else if(e.keyCode == 37){ // Left arrow is being pressed
			leftPressed=false; // Sets the leftPressed to false
		}
	};
	// Declaring variable for drawBall
	var drawBall=function(){
		// Drawing the ball into the canvas
		ctx.beginPath(); // Begins or creates a new path
		ctx.arc(x,y,pongBallRadius,0,Math.PI*2,false); // Draws the arc using the formula
		ctx.fillStyle="#FFFFFF"; // Adds whhite color to circle
		ctx.fill(); // Fills the circle using the element on fillstyle
		ctx.closePath(); // Creates path starting from the current point, going back to the original starting point.
	};
	// Declaring variable for drawpongPaddle
	var drawpongPaddle=function(){
		// Drawing the drawpongPaddle into the canvas
		ctx.beginPath(); // Begins or creates a new path
		ctx.rect(pongPaddleX,canvas.height-pongPaddleHeight,pongPaddleWidth,pongPaddleHeight); // Draws the rectangle using the formula
		ctx.fillStyle="#FFFFFF"; // Adds whhite color to rectangle
		ctx.fill(); // Fills the circle using the element on fillstyle
		ctx.closePath(); // Creates path starting from the current point, going back to the original starting point.
	};
	// Declaring variable for drawBricks
	var drawBricks=function(){
		// for loop for initializing the brickColNum
		for(c=0; c<brickColNum; c++) {
			// for loop for intitializing the brickRowNum
			for(r=0; r<brickRowNum; r++) {
				// If statement checks if:
	            if(bricks[c][r].status == 1) { // brick's status is 1 which means that the game is on
					// Changing defined variables
	        		var brickX = (c*(brickWidthVal+brickPaddingSize))+leftOffset; // Defining brickX using this new formula
	       			var brickY = (r*(brickHeightVal+brickPaddingSize))+topOffset; // Defining brickY using this new formula
	        		bricks[c][r].x = brickX; // Uses brickX as a variable
	        		bricks[c][r].y = brickY; // Uses brickY as a variable
					// Drawing bricks into the canvas
	        		ctx.beginPath();  // Begins or creates a new path
	        		ctx.rect(brickX, brickY, brickWidthVal, brickHeightVal); // Draws the rectangle using the formula
	        		ctx.fillStyle = "#FFFFFF"; // Adds whhite color to recta
	        		ctx.fill(); // Fills the circle using the element on fillstyle
	        		ctx.closePath();  // Creates path starting from the current point, going back to the original starting point.
	    		}
			}
		}
	};
	// Declaring variable for detectingCollision 
	var detectingCollision=function(){
		// for loop for initializing the brickColNum
		for(c=0; c<brickColNum; c++){
			// for loop for intitializing the brickRowNum
			for(r=0; r<brickRowNum; r++){
				// Declaring variable for b
	    		var b = bricks[c][r]; // Uses bricks[c][r] as its variable
				 // If statement checks if:
	   			 if(b.status == 1){ // brick's status is 1 which means that the game is on
					// If statement checks if the is hitting the bricks
	        		if(x > b.x && x < b.x+brickWidthVal && y > b.y && y < b.y+brickHeightVal){
	            		movementY = -movementY; // Makes the ball move to the opposite direction
	           			 b.status = 0; // Makes the status 0, which means the game started 
	           			 score++; // Increases the score
						 // If statement checks if there's no more bricks left
	           			 if(score == brickRowNum*brickColNum) {
	                		clearInterval(inter); // Stops the game
		    				ctx.clearRect(0,0,canvas.width,canvas.height); // Clears the canvas
							// Draws Congratulation Message to canvas
				    		ctx.font = "16px VT323"; // Font used
				    		ctx.fillStyle = "#FFFFFF";  // Adds whhite color to font text
				    		ctx.textAlign="center"; // Alligns the text to center
				    		ctx.textBaseline="middle"; // Adjusts the text's baseline to middle
				    		ctx.fillText("YOU WIN, CONGRATULATIONS!",width/2,height/2); // Draws the message to canvas
	            		}
	        		}
	    		}
			}
		}
	};
	// Declaring variable for drawScore 
	var drawScore=function(){
		// Drawing into the canvas
		ctx.font = "16px VT323"; // Font used
		ctx.fillStyle = "#FFFFFF"; // Adds whhite color to font text
		ctx.textAlign="left"; // Alligns the text to left
		ctx.textBaseline="left"; // Adjusts the text's baseline to left
		ctx.fillText("Score: "+score, 8, 20); // Draws the score to canvas
	};
	// Declaring variable for draw
	var draw=function(){
		// Drawing into the canvas
		ctx.clearRect(0,0,canvas.width,canvas.height); // Clears the canvas
		drawBall(); // Calls the drawBall() function
		drawpongPaddle(); // Calls the drawpongPaddle() function
		drawBricks(); // Calls the drawBricks() function
		detectingCollision(); // Calls the detectingCollision() function
		drawScore(); // Calls the drawScore() function
		// Defining 
		x += movementX; // Add's movementX value as x's variable
		y += movementY; // Add's movementY value as y's variable
		// If statement checks if: 
		if(x + movementX > canvas.width-pongBallRadius || x+movementX < pongBallRadius){ // The vertical movement of the ball hit the canvas
			movementX = -movementX; // Makes the ball move to the opposite vertical direction
		}
		// If statement checks if: 
		if(y+movementY <pongBallRadius){ // The y+movementY is less than the pongBallRadius
			movementY = -movementY; // Makes the ball move to the opposite horizontal direction
		}
		// If statement checks if: 
		else if(y+movementY > canvas.height-pongBallRadius){ // The horizontal movement of the ball hit the canvas
			// If statement checks if:
			if(x > pongPaddleX && x < pongPaddleX + pongPaddleWidth){ // The ball was caught with the pongPaddle
				movementY = -movementY; // Makes the ball move to the opposite horizontal direction
			}
			// Else statement:
			else{
				clearInterval(inter); // Stops the game
				ctx.clearRect(0,0,canvas.width,canvas.height); // Clears the canvas
				// Draws Gameover Message to canvas
	    		ctx.font = "16px VT323"; // Font used
	    		ctx.fillStyle = "#FFFFFF"; // Adds whhite color to font text
	    		ctx.textAlign="center"; // Alligns the text to center
	    		ctx.textBaseline="middle"; // Adjusts the text's baseline to middle
	    		ctx.fillText("GAME OVER",width/2,height/2); // Draws the message to canvas
	    		startButton.disabled=false; // Makes the replay button appear
			}
		}
		// If statement checks: // If the right arrow is being pressed
		if(rightPressed&&pongPaddleX<canvas.width-pongPaddleWidth){ // and the pongPaddleX is less than canvas width - pongPaddle's width
			pongPaddleX+=7; // Adds 7 as pongPaddleX's variable
		}
		// Else if statement checks: // If the left arrow is being pressed
		else if(leftPressed&&pongPaddleX>0){ // and the pongPaddleX is greater than 0
			pongPaddleX -=7; // Subtracts 7 as pongPaddleX's variable
		}
	};
	// Declaring variable for inter
	var inter;
	// Calls the draw function
	draw();
	// Adding event listener elements
	document.addEventListener("keydown",withKeyPressed,false); // Identify if any key is pressed
	document.addEventListener("keyup",withoutKeyPressed,false); // Identify if any key is not pressed
	document.addEventListener("mousemove", mouseMovement, false); // Identify mouse movement
	// Declaring variable for startButton
	var startButton=fetchId("startBtn"); // Gets the replay button from canvas
	startButton.onclick=function(){ // Adding functionality for startButton
		// Replay game default settings
		pongPaddleX = (canvas.width-pongPaddleWidth)/2; // Re-difining variable for pongPaddleX
		x = canvas.width/2; // Re-difining variable for x
		y = canvas.height-30; // Re-difining variable for y
		brickRowNum = 3; // Making the brickRowNum into 3 again
		brickColNum = 5; // Making the brickColNum into 5 again
		score = 0; // Setting the score into 0 again
		bricks = []; // Restarts the brick array elements
		// for loop for initializing the brickColNum
		for(c=0; c<brickColNum; c++) {
			bricks[c] = []; // bricks count array emptied
			// for loop for initializing the brickRowNum
			for(r=0; r<brickRowNum; r++) {
				bricks[c][r] = { x: 0, y: 0,status: 1}; // brick's status is 1 which means that the game is on
			}
		}
		// Using setInterval() function
		inter=setInterval(function(){
			draw(); // Calls the draw() function
		},10); // Allows to call the function() every 10 milliseconds
		this.disabled=true; // Hides the replay button 
	};
})();