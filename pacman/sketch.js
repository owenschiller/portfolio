let tileMap
let gridSize = 28;
let player, walls, floor, dots, blocks, hwalls, tester, ghosts = []
let playerSpeed = 0;
let playerImage;
let maxPlayerSpeed = 3;
let ghostDirectionFrameCount = 60;
let score = 0;
let isGameOver = false;
let map = 
["|||||||||||||||||||||||",//1 top wall
     "|fff|fffffffffffff|fff|",//2 
     "|fff|f|||||f|||||f|fff|",//3 
     "|fffffff|fffff|fffffff|",//4
     "|||f|f|f|f|||f|f|f|f|||",//5 
     "|fff|f|f|f|b|f|f|f|fff|",//6
     "|fff|f|f|f|||f|f|f|fff|",//7
     "|fff|f|fffffffff|f|fff|",//8 
     "|||||f|f|||||||f|f|||||",//9 line
     "|fffff|fffffffff|fffff|",//10
     "| |||||f||| |||f||||| |",//11

     " fffffff 1234  fffffff ",//12 middle
     
     "| |||||f|||||||f||||| |",//26
     "|fffff|ffffpffff|fffff|",//26
     "|||||f|f|||||||f|f|||||",//26
     "|fff|f|fffffffff|f|fff|",//16
     "|fff|f|f|f|||f|f|f|fff|",//17
     "|fff|f|f|f|b|f|f|f|fff|",//18
     "|||f|f|f|f|||f|f|f|f|||",//19
     "|fffffff|fffff|fffffff|",//20
     "|fff|f|||||f|||||f|fff|",//22
     "|fff|fffffffffffff|fff|",//23
     
     "|||||||||||||||||||||||",//28
    ];

class Ghost{
    constructor(tile, img){
        img.resize(gridSize * .75, 0)
      this.ghost = new Sprite()
      this.ghost.w = gridSize * .75
      this.ghost.h = gridSize * .75
      this.ghost.image = img;
      this.ghost.dir = 270
      this.ghost.nextDirection = 0;
      this.ghost.tile =tile
      this.speed = maxPlayerSpeed;
      this.ghost.rotationLock = true;
      this.ghost.collider = 'd'
    }
    
     updateDirection(){

    // if(this.ghost.x % gridSize > 2 || this.ghost.y % gridSize > 2){
    //     return
    // }
    
    let ghostCol = Math.round(this.ghost.x / gridSize) - 1;
    let ghostRow = Math.round(this.ghost.y / gridSize) - 1;
    
    switch(this.ghost.nextDirection){
        case 270:
        {
           
            if (map[ghostRow - 1][ghostCol] == "|") return;
            // print(tileMap[ghostRow - 1][ghostCol])
            this.ghost.dir = 270
            this.ghost.rotation = 270
            this.ghost.mirror.x = false
            this.ghost.x = (ghostCol + 1) * gridSize;
            break;
        }
       case 90:{
            if (map[ghostRow + 1][ghostCol] == "|") return;
            this.ghost.dir = 90
            this.ghost.rotation = 90
            this.ghost.mirror.x = false
            this.ghost.x = (ghostCol + 1) * gridSize;
            break;
        }
        case 180:{
            if (map[ghostRow][ghostCol - 1] == "|") return;
            this.ghost.dir = 180
            this.ghost.rotation = 0
            this.ghost.mirror.x = true
            this.ghost.y = (ghostRow + 1) * gridSize;
            break;
        }
        case 0: {
            if (map[ghostRow][ghostCol + 1] == "|") return;
            this.ghost.dir = 0
            this.ghost.rotation = 0
            this.ghost.mirror.x = false
            this.ghost.y = (ghostRow + 1) * gridSize;
        }
    }
    
    this.speed = maxPlayerSpeed;
}
     movement(){


   if(this.ghost.colliding(player)){
    noLoop();
    isGameOver = true;
    fill('orange');
    text('Game Over!', gridSize * 10, height - gridSize / 2)
    text('\'r\'=restart', gridSize * 17, height - gridSize / 2)
}

    
     if(this.ghost.x < gridSize / 2){
          this.ghost.x = width - gridSize / 2;
      }
      else if(this.ghost.x > width - gridSize / 2){
          this.ghost.x = gridSize / 2;
      }



    // tester.vel.x = playerSpeed * cos(player.dir);
    // tester.vel.y = playerSpeed * sin(player.dir);
    for (let ghost of ghosts) {
        if (ghost != this && this.ghost.colliding(ghost.ghost)) {
            this.changeDirections();
        }
    }
    if (this.ghost.colliding(walls) || frameCount % ghostDirectionFrameCount == 0 ) {
      this.changeDirections();

    }
    else {

        this.ghost.vel.x = this.speed * cos(this.ghost.dir);
        this.ghost.vel.y = this.speed * sin(this.ghost.dir);
        
    }



}
  changeDirections() {
        // print("hit")
        this.ghost.speed = 0;
        this.ghost.nextDirection = Math.floor(random(4)) * 90
        // print(this.ghost.nextDirection)
        if ((this.ghost.direction - this.ghost.nextDirection) % 180 != 0) {
            this.ghost.x = Math.round(this.ghost.x / gridSize) * gridSize;
            this.ghost.y = Math.round(this.ghost.y / gridSize) * gridSize;
        }
        // this.speed = 0;
        this.updateDirection()
  }
}



function preload() {
    
    playerImage = loadImage('https://codehs.com/uploads/0fb604b86477fcf8bb9dd100387a2c83')
    ghost1Image = loadImage('https://codehs.com/uploads/982f89e75e57d1babcf992641a7b5359')
    ghost2Image = loadImage('https://codehs.com/uploads/79fb795aea642acc48fe5b9ee169b722')
    ghost3Image = loadImage('https://codehs.com/uploads/741f1c79c4a680f5842f1783d3ae980c')
    ghost4Image = loadImage('https://codehs.com/uploads/fe18528dfaa5fb77ae44329ac19027f4')
    
  
 
  
}
 function setup() {
//   createCanvas(windowWidth, windowHeight);
createCanvas((map[0].length + 1) * gridSize, (map.length + 2) * gridSize);
    frameRate(30);
  background("black");
   background("black");
  
  player = new Sprite()
  player.d = 0.75 * gridSize;
  player.rotationLock = true;
  player.dir = 0
  player.nextDirection = 0
  player.tile = 'p'
  player.color = "yellow"
  player.speed = 0;
  player.bounciness = 0
//   player.collider = 'k';
  player.image = playerImage;
  player.image.scale = 0.045
  
  ghosts.push(new Ghost('1', ghost1Image))
  ghosts.push(new Ghost('2', ghost2Image))
  ghosts.push(new Ghost('3', ghost3Image))
  ghosts.push(new Ghost('4', ghost4Image))
//   ghost1.debug = true
 
//   player.bounciness = 0
  
  walls = new Group()
  walls.strokeWeight = 0
  walls.color = "#0000e6"
//   walls.stroke = "#0000e6"
  walls.tile = '|'
  walls.collider = 's'
  walls.w = gridSize;
  walls.h = gridSize;
  
//   hwalls = new Group()
//   hwalls.stroke = "#0000e6"
//   hwalls.color = "#0000e6"
//   hwalls.tile = '-'
//   hwalls.collider = 's'
//   hwalls.w = gridSize;
//   hwalls.h = gridSize;
  
  
  
  blocks = new Group()
  
  blocks.color = "black"
  blocks.tile = 'b'
  blocks.collider = 's'
  blocks.w = gridSize;
  blocks.h = gridSize;

  dots = new Group()
  dots.color = "#e67300"
  dots.tile = 'f' 
  dots.collider = 'none'
  dots.d = gridSize/4;
  dots.overlaps(player, removeDots)
  dots.layer = 1;
//   shadows.h = gridSize;

  tileMap = new Tiles(
    map, gridSize, gridSize, gridSize, gridSize
  )
  
   tester = new Sprite()
  tester.d = gridSize - 4;
  tester.rotationLock = true;
  tester.dir = 270
  tester.nextDirection = 270
//   tester.tile = 'p'
  tester.x = player.x
  tester.y = player.y
  tester.color = "red"
  tester.speed = playerSpeed;
  tester.overlaps(player)
  tester.visible = false
  

  
 
 }
function draw() {
    background(0)
    // cameraControl()
    movement()
    fill('white')
    textSize(25)
     textFont('Courier New');
    text('Score: ' + score, gridSize * 0.9, height - gridSize / 2)
    
    for(let ghost of ghosts){
        ghost.movement()
    }
    
}
function keyPressed(){
    if(isGameOver == true && key == 'r'){
        loop()
        isGameOver = false;
        location.reload()
        // allSprites.removeAll();
        // setup()
    }
}
// function cameraControl(){
//     camera.zoom = 1;
//     camera.x = player.x
//     camera.y = player.y

// }
function removeDots(dot, player){
    dot.remove();
    score+= 10;
      if(dots.length == 0){
    noLoop();
    isGameOver = true;
    fill('orange');
    text('You Win!', gridSize * 10, height - gridSize / 2)
    text('\'r\'=restart', gridSize * 17, height - gridSize / 2)
    
}
}

function updateDirection(){
    // if(player.dir == player.nextDirection){
    //     return 
    // }
    if(player.x % gridSize > 2 || player.y % gridSize > 2){
        return
    }
    
    let playerCol = Math.round(player.x / gridSize) - 1;
    let playerRow = Math.round(player.y / gridSize) - 1;
    
    switch(player.nextDirection){
        case 270:
        {
            // print(map[playerRow - 1][playerCol])
            if (map[playerRow - 1][playerCol] == "|") return;
            // print(tileMap[playerRow - 1][playerCol])
            player.dir = 270
            player.rotation = 270
            player.mirror.x = false
            player.x = (playerCol + 1) * gridSize;
            break;
        }
       case 90:{
            if (map[playerRow + 1][playerCol] == "|") return;
            player.dir = 90
            player.rotation = 90
            player.mirror.x = false
            player.x = (playerCol + 1) * gridSize;
            break;
        }
        case 180:{
            if (map[playerRow][playerCol - 1] == "|") return;
            player.dir = 180
            player.rotation = 0
            player.mirror.x = true
            player.y = (playerRow + 1) * gridSize;
            break;
        }
        case 0: {
            if (map[playerRow][playerCol + 1] == "|") return;
            player.dir = 0
            player.rotation = 0
            player.mirror.x = false
            player.y = (playerRow + 1) * gridSize;
        }
    }
    
    // player.x = (playerCol + 1) * gridSize;
    // player.y = (playerRow + 1) * gridSize;
    // player.speed = 0;
    
    playerSpeed = maxPlayerSpeed;
}
function movement(){

   
    
    if(kb.pressing('up')){
        player.nextDirection = 270
        
    }
    else if(kb.pressing('down')){
        player.nextDirection = 90
        
    }
    if(kb.pressing('left')){
        player.nextDirection = 180
        
    }
    else if(kb.pressing('right')){
        player.nextDirection = 0
        
    }
    updateDirection()

 if(player.x < gridSize / 2){
      player.x = width - gridSize / 2;
  }
  else if(player.x > width - gridSize / 2){
      player.x = gridSize / 2;
  }


    tester.x = player.x
    tester.y = player.y
    // tester.vel.x = playerSpeed * cos(player.dir);
    // tester.vel.y = playerSpeed * sin(player.dir);
    if (tester.colliding(walls)) {
        //print("hit")
        player.speed = 0;
        tester.speed = 0;
        player.x = Math.round(player.x / gridSize) * gridSize;
        player.y = Math.round(player.y / gridSize) * gridSize;
        playerSpeed = 0;
     
    }
    else {
        player.vel.x = playerSpeed * cos(player.dir);
        player.vel.y = playerSpeed * sin(player.dir);
        
    }



}