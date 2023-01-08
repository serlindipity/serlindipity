// SNAKE GAME CANVAS API - JAVASCRIPT
(function () {
    // Declaring variables for canvas settings
    let c, // c for canvas
    $; // $ for 2d
    // Declaring variables for the game movements
    let snake, // snake for player
    snakeDirection, // snakeDirection for the snake's direction
    snakeNextDirection, // snakeNextDirection for snake's next direction
    snakeSpeed; // snakeSpeed for snake's speed
    // Declaring variables for snake food
    let snakeFood = { 
      x: 0, // x for vertical food
      y: 0 // y for horizontal food
    };
    // Declaring variable for score & wall
    let score; // For score
    let wall; // For game obstacle
    // Declaring variable for game title, menus, settings, and gamescore
    let snakeGameTitle, // game title
      // Main display
      snakeGameMenu, // main game menu
      snakeGameSetting, // main game setting
      snakeGameGamover, // main game gameover
      // Newgame buttons 
      btnMenuNewgame, // button for newgame in menu
      btnSettingNewgame, // button for newgame in newgame
      btnGameoverNewgame, // button for newgame in gameover
      // Settings buttons
      btnMenuSetting, // button for setting in menu
      btnGameoverSetting, // button for setting in gameover
      // Settings for speed & wall
      gameSpeedSetting, // button for gamespeed setting
      gameWallSetting, // button for gamewall setting
      // Setting the game score
      gameScore; // game score
    // Declaring variable for food
    let targetFood = function (x, y) {
      $.fillStyle = "#fff"; // Food color
      $.fillRect(x * 10, y * 10, 10, 10); // Food rectangle size
    };
    // Declaring variable for changing direction
    let changeDirection = function (key) { // 
      // If statement checks if the up key is being pressed & if snakeDirection is not equal to 2
      if (key == 38 && snakeDirection != 2) { // Up key
        snakeNextDirection = 0; // Sets the snakeNextDirection into 0
      } else if (key == 39 && snakeDirection != 3) { // Checks if the right key is being pressed & if snakeDirection is not equal to 3
        snakeNextDirection = 1; // Sets the snakeNextDirection into 1
      } else if (key == 40 && snakeDirection != 0) { // Checks if the down key is being pressed & if snakeDirection is not equal to 0
        snakeNextDirection = 2; // Sets the snakeNextDirection into 2
      } else if (key == 37 && snakeDirection != 1) { // Checks if the left key is being pressed & if snakeDirection is not equal to 1
        snakeNextDirection = 3; // Sets the snakeNextDirection into 3
      }
    };
    // Declaring variable for addSnakeFood function 
    let addSnakeFood = function () {
      // Setting up vertical snakeFood 
      snakeFood.x = Math.floor(Math.random() * (c.width / 10 - 1)); // Computation for vertical food
      // Setting up horizontal snakeFood 
      snakeFood.y = Math.floor(Math.random() * (c.height / 10 - 1)); // Computation for horizontal food
      // forloop for adding food & adding lenght to snake
      for (let i = 0; i < snake.length; i++) {
        // If statement checks for blocks
        if (checkBlock(snakeFood.x, snakeFood.y, snake[i].x, snake[i].y)) { // checkBlock
          addSnakeFood(); // Calls the addSnakeFood() function
        }
      }
    };
    // Declaring variable for
    let checkBlock = function (x, y, _x, _y) { // Setting checkBlock function
      return x == _x && y == _y ? true : false; // Return x equals to _x & y equals to _y
    };
    // Declaring variable for altscore 
    let altScore = function (score_val) { // Setting altScore function
      gameScore.innerHTML = String(score_val); // Setting the gameScore equivalent to score_val
    };
    // Declaring mainLoop function 
    let mainLoop = function () { // Mainloop function
      let _x = snake[0].x, // Defining the value of _x
        _y = snake[0].y; // Defining the value of _y
      snakeDirection = snakeNextDirection; // Making the snakeDirection equivalent to snakeNextDirection
      // Switch case for snakeDirection
      switch (snakeDirection) {
        case 0: // case 0
          _y--; // Decreases the value of _y 
          break; // case break
        case 1: // case 1
          _x++; // Increases the value of _x
          break; // case break
        case 2: // case 2
          _y++; // Increases the value of _y
          break; // case break
        case 3: // case 3
          _x--; // Decreases the value of _x
          break; // case break
      }
      // Usage of pop() function 
      snake.pop(); // Last array element remover, it also returns that value to the function caller
      snake.unshift({ // Adds element(s) in the start of an array, which also returns the array's new length
        x: _x, // x equals to _x
        y: _y // y equls to _y
      });
      // If statement checks if the wall is equals to 1
      if (wall == 1) {
        // If statement checks if the game is over
        if ( 
          snake[0].x < 0 || // Checks if snake[0].x is less than 0
          snake[0].x == c.width / 10 || // Checks if snake[0].x is equals to canva's width / 10
          snake[0].y < 0 || // Checks if snake[0].y is less than 0 
          snake[0].y == c.height / 10 // Checks if snake[0].y is equals to canva's height / 10
        ) {
          gameScreenDisplay(3); // Calls the gameScreenDisplay() function, returns 3
          return; // Return function
        }
        // Else if statement checks if the game will continue despite the snake hitting the wall
      } else {
        // for loop for 
        for (let i = 0, x = snake.length; i < x; i++) {  
          // If statement checks if:
          if (snake[i].x < 0) { // snake[i].x is less than 0 
            snake[i].x = snake[i].x + c.width / 10; // Makes the snake[i].x equivalent to itself + canva's width / 10
          }
          // If statement checks if:
          if (snake[i].x == c.width / 10) { // snake[i].x is equals to canva's width / 10
            snake[i].x = snake[i].x - c.width / 10; // Makes the snake[i].x equivalent to snake[i].x - canva's width /10
          }
          // If statement checks if:
          if (snake[i].y < 0) { // snake[i].y is less than 0
            snake[i].y = snake[i].y + c.height / 10; // Makes the snake[i].y equivalent to itself + canva's height
          }
          // If statement checks if:
          if (snake[i].y == c.height / 10) { // snake[i].y is equivalent to canva's height / 10
            snake[i].y = snake[i].y - c.height / 10; // Makes the snake[i].y = snake[i].y - canva's height / 10
          }
        }
      }
      // for loop to initialize snake.length
      for (let i = 1; i < snake.length; i++) {
        // If statement checks if snake[o].x is equivalent to snake[i].x & if snake[0].y == snake[i].y
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
          gameScreenDisplay(3); // Calls the gameScreenDisplay() function, returns 3
          return; // return function
        }
      }
      // If statement checks if the block checker was able to:
      if (checkBlock(snake[0].x, snake[0].y, snakeFood.x, snakeFood.y)) { 
        snake[snake.length] = {
          x: snake[0].x, // Makes the x equivalent to snake[0].x
          y: snake[0].y  // Makes the y equivalent to snake[0].y
        };
        score += 1; // Adds 1 to score
        // Calling the following function
        altScore(score); // Calls the altScore() function & returns the score 
        addSnakeFood(); // Calls the addSnakeFood() function
        targetFood(snakeFood.x, snakeFood.y); // Calls the targetFood() function and returns the snakeFood.x & snakeFood.y
      }
      // Creating new game
      $.beginPath(); // Begins or creates a new path
      $.fillStyle = "#000"; // Adds color to canvas
      $.fillRect(0, 0, c.width, c.height); // Draws the canvas using width and height
      // for loop initializing snake length
      for (let i = 0; i < snake.length; i++) {
        targetFood(snake[i].x, snake[i].y); // Adds targetFood vertically or horizontally
      }
      // Calls targetFood() function
      targetFood(snakeFood.x, snakeFood.y); // Sets the snakeFood vertically or horizontally
      // Uisng setTimeout() function
      setTimeout(mainLoop, snakeSpeed); // Blocks the code after mainLoop & snakeSpeed
    };
    // Declaring variable for newGame() function
    let newGame = function () {
      gameScreenDisplay(0); // Calls the gameScreenDisplay() function & return 0
      snakeGameTitle.focus(); // Shows & focuses on the snakeGameTitle element
      // Snake player setting
      snake = [];
      // for loop for initializing snake x & y
      for (let i = 4; i >= 0; i--) {
        snake.push({ // Adds elements to snake's array & returns its new length
          x: i, // Making x equivalent to i
          y: 15 // Making y 
        });
      }
      // Changing variables for the following elements
      snakeNextDirection = 1; // Setting the snakeNextDirection to 1
      score = 0; // Setting the score to 0
      // Calling the altScore() & addSnakeFood() functions
      altScore(score); // Calls the altScore() function, returns the score
      addSnakeFood(); // Calls the addSnakeFood()
      // Using the onkeydown function to changeDirection
      c.onkeydown = function (e) {
        changeDirection(e.keyCode);
        if (e.keyCode == 27) { // Escape key 
          snakeNextDirection = null; // Nulls the snakeNextDirection
        }
      };
      mainLoop(); // Calls the mainLoop() function
    };
    // Declaring variable for setSnakeSpeed() function
    let setSnakeSpeed = function (speedValue) { // Gets the speedValue
      snakeSpeed = speedValue; // Sets the snakeSpeed equivalent to speedValue
    };
    // Declaring variable for setWallObstacle() function
    let setWallObstacle = function (wallValue) { // Gets the wallValue
      wall = wallValue; // Sets the wall equivalent to wallValue
      // If statement checks if there's no wall
      if (wall == 0) { // Checks if wall is equivalent to 0
        snakeGameTitle.style.borderColor = "#606060"; // Changes the snakeGame borderColor to grey
      }
      // If statement checks if there's wall
      if (wall == 1) { // Checks if wall is equivalent to 1
        snakeGameTitle.style.borderColor = "#fff"; // Changes the snakeGame borderColor to white
      }
    };
    // Declaring variable for gameScreenDisplay function ()
    let gameScreenDisplay = function (gameScreenOption) {
      // Using switch statement to organize the gameScreenOption
      switch (gameScreenOption) {
        // Shows game & game title
        case 0:
          snakeGameTitle.style.display = "block"; // Displays game & title
          snakeGameMenu.style.display = "none"; // Hides game menu
          snakeGameSetting.style.display = "none"; // Hides game setting
          snakeGameGamover.style.display = "none"; // Hides gameover display
          break;
        // Shows game menu
        case 1:
          snakeGameTitle.style.display = "none"; // Hides game & title
          snakeGameMenu.style.display = "block"; // Displays game menu
          snakeGameSetting.style.display = "none"; // Hides game setting
          snakeGameGamover.style.display = "none"; // Hides gameover display
          break;
        // Shows game setting
        case 2:
          snakeGameTitle.style.display = "none"; // Hides game & title
          snakeGameMenu.style.display = "none"; // Hides game menu
          snakeGameSetting.style.display = "block"; // Displays game setting
          snakeGameGamover.style.display = "none"; // Hides gameover display
          break;
        // Shows game over display
        case 3:
          snakeGameTitle.style.display = "none"; // Hides game & title
          snakeGameMenu.style.display = "none"; // Hides game menu
          snakeGameSetting.style.display = "none"; // Hides game setting
          snakeGameGamover.style.display = "block"; // Displays gameover 
          break;
      }
    };
    // Loads the following objects within the webpage
    window.onload = function () {
      c = document.querySelector("canvas"); // Gets the canvass
      $ = c.getContext("2d"); // Sets the canvas
      // Drawing the game's main displays into the canvas
      snakeGameTitle = document.getElementById("snake_game"); // Snake game title
      snakeGameMenu = document.getElementById("menu_display"); // Snake game menu
      snakeGameGamover = document.getElementById("gameover_display"); // Gameover display
      snakeGameSetting = document.getElementById("setting_display"); // Snake game setting
      // Drawing the game buttons into the canvas
      btnMenuNewgame = document.getElementById("newgame_menu"); // Button for newgame in menu
      btnSettingNewgame = document.getElementById("newgameBtn_setting"); // Button for newgame in setting
      btnGameoverNewgame = document.getElementById("newgameBtn_gameover"); // Button for newgame in gameover
      btnMenuSetting = document.getElementById("setting_menu"); // Button for setting in menu
      btnGameoverSetting = document.getElementById("settingBtn_gameover"); // Button for setting in gameover
      // Drawing the settings for speed & wall, and the game score into the canvas
      gameScore = document.getElementById("game_score"); // Game score
      gameSpeedSetting = document.getElementsByName("speed"); // Setting for player speed
      gameWallSetting = document.getElementsByName("wall"); // Setting for wall obstacle in the game
      // Giving functionalities for buttons
      btnMenuNewgame.onclick = () => newGame(); // Calls the newgame() function
      btnGameoverNewgame.onclick = () => newGame(); // Calls the newgame() function
      btnSettingNewgame.onclick = () => newGame(); // Calls the newgame() function
      btnMenuSetting.onclick = () => gameScreenDisplay(2); // Calls the gameScreenDisplay() function, returns 2
      btnGameoverSetting.onclick = () => gameScreenDisplay(2); // Calls the gameScreenDisplay() function, returns 2
      // Calling the following functions
      setSnakeSpeed(150); // Calls the setSnakeSpeed() function, returns 150
      setWallObstacle(1); // Calls setWallObstacle() function, returns 1
      gameScreenDisplay(1); // Calls the gameScreenDisplay() function, returns 1
      // for loop to initialize gameSpeedSetting.length
      for (let i = 0; i < gameSpeedSetting.length; i++) {
        gameSpeedSetting[i].addEventListener("click", () => { // Checks if gameSpeedSetting is being clicked
          // for loop to initialize gameSpeedSetting.length
          for (let i = 0; i < gameSpeedSetting.length; i++) {
            // If statement to check gameSpeedSetting 
            if (gameSpeedSetting[i].checked) { // Returns & determines the checked state of a checkbox
              setSnakeSpeed(gameSpeedSetting[i].value); // Calls the setSnakeSpeed() function, returns its value
            }
          }
        });
      }
      // for loop to initialize gameWallSetting.length
      for (let i = 0; i < gameWallSetting.length; i++) { // gameWallSetting.length
        gameWallSetting[i].addEventListener("click", () => { // Checks if gameWallSetting is being clicked
          // for loop to initialize gameWallSetting.length
          for (let i = 0; i < gameWallSetting.length; i++) { 
            // If statement to check gameWallSetting 
            if (gameWallSetting[i].checked) { // Returns & determines the checked state of a checkbox
              setWallObstacle(gameWallSetting[i].value); // Calls the gameWallSetting() function, returns its value
            }
          }
        });
      }
    };
  })();