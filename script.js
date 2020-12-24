document.addEventListener('DOMContentLoaded', () => {


//VARIABLES
const grid = document.querySelectorAll(".grid div");
const view = document.querySelectorAll(".visual")[0];

//starting pos variables
let currentLocation = 90;
let counter = 0;
let row = 30;
let faceDirection = "N";
let checker = true;
let returnedItem = "";

//MODIFIABLE
let object_list = ["tree"];




//OBJECTS
function asset(name, type, receive, cause, obj_position) {
    this.name = name;
    this.type = type;
    this.receive = receive;
    this.cause = cause;
    this.obj_position = obj_postition;
}




//FUNCTIONS
//creates board
function makeBoard() {
    for (i = 0; i < grid.length; i++) {
        check = true;
        if(i % 2 == 0 && Math.ceil((i+1)/10) * 10 % 20 == 0) {
            grid[i].classList.add("green");
            check = false;
        }
        if(i % 2 != 0 && Math.ceil((i+1)/10) * 10 % 20 != 0) {
            grid[i].classList.add("green");
            check = false;
        }

        if(check == true) {
            grid[i].classList.add("green2");
        }
        grid[i].classList.add(i);
    }

    for (j = 0; j < grid.length; j ++) {
        if ((j) % 10 === 0) {
            row = row + 1;
        }
        grid[j].classList.add("row" + row)

    }

    grid[60].classList.add("tree");
    grid[47].classList.add("tree");
}

//
function control(e) {
    direction = 0;
    grid[currentLocation].classList.remove("player" + faceDirection);
    if(e.keyCode === 39) {    
        direction = 1    
        faceDirection = "E";
    }
    if(e.keyCode === 38) {
        direction = -10;
        faceDirection = "N";
    }
    if(e.keyCode === 37) {
        direction = -1;
        faceDirection = "W";
    }
    if(e.keyCode === 40) {
        direction = 10;
        faceDirection = "S";        
    }
    console.log(currentLocation - direction)
    if ((currentLocation + direction) >= 100 || (currentLocation + direction) <= 0) {
        grid[currentLocation].classList.add("player" + faceDirection)
        return currentLocation;        
    }
    if (grid[currentLocation + direction].classList.contains(objectIterator())){
        grid[currentLocation].classList.add("player" + faceDirection)
        return currentLocation;  
    }
    currentLocation += direction;
    grid[currentLocation].classList.add("player" + faceDirection);
    loadTiles();
    }

function loadTiles() {
    let visibleObject = 0;
    let arry = "";
    counter = 0;
    checker = true;
    if (faceDirection === "N") {
        row -= 1;
        visibleObject = currentLocation - 40;
        if (visibleObject > 10) {  
        for (i = currentLocation - 10; i > visibleObject; i -= 10) {
            counter += 1;
            if (checker === false) {
                break;
            }
            located_grid = grid[i];
            generateView(located_grid);     
        }
    } 
    }
    if (faceDirection === "S") {
        row += 1;
        visibleObject = currentLocation + 40; 
        if (visibleObject < 109) {
        for (i = currentLocation + 10; i < visibleObject; i += 10) {
            counter += 1;
            if (checker === false) {
                break;
            }
            located_grid = grid[i];
            generateView(located_grid);     
        }
    }
    }        
    if (faceDirection === "E") {
        visibleObject = currentLocation + 3;
        for (i = currentLocation + 1; i <= visibleObject; i += 1) {
            counter += 1;
            if (checker === false) {
                break;
            }
            located_grid = grid[i];
            generateView(located_grid);     
        
    }
    }        
    if (faceDirection === "W") {
        visibleObject = currentLocation - 3;
        for (i = currentLocation - 1; i >= visibleObject; i -= 1) {
            counter += 1;
            if (checker === false) {
                break;
            }
            located_grid = grid[i];

            generateView(located_grid);     
        }
    } 
    if(checker === true) {
        view.style.backgroundImage = "url(images/grass.jpg)";
    }       
}   

function generateView(gridLocation) {
    for (j = 0; j < object_list.length; j++) {
        item = object_list[j];
        if (faceDirection === "N" || faceDirection === "S") {
            if (gridLocation.classList.contains(item)) { 
                console.log(gridLocation.classList);              
                view.style.backgroundImage = "url(images/" + item + counter + ".jpg)";
                checker = false;
                console.log("generating tree");
                break;
            }
            else {
                view.style.backgroundImage = "url(images/grass.jpg)";
                console.log("generating grass");
            }
        }   
        else if (faceDirection === "E" || faceDirection === "W") {
            if (gridLocation.classList.contains(item) && gridLocation.classList.contains("row" + row)){          
                view.style.backgroundImage = "url(images/" + item + counter + ".jpg)";
                checker = false;
                break;
            }
            else {
                view.style.backgroundImage = "url(images/grass.jpg)";
            }
        }   
    }
}

function objectIterator() {
    for (j = 0; j < object_list.length; j++) {
        item = object_list[j];
        returnedItem = item;
        return returnedItem;
    }
}






//game setup
makeBoard();
grid[currentLocation].classList.add("player" + faceDirection);
document.addEventListener('keyup', control)
})