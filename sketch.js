var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird;
var backGround;

var score=0;

var obstaclestopGroup;

var obstaclesbottomGroup;

var gameOver;

var tunnel,tunnel1;



var space;

var die;




function preload(){
  birdImg = loadImage("Bird.png");
  tunneltopImg = loadImage("tunneltop.png");
  tunnelbottemImg = loadImage("tunnelbottem.png");
  backGroundImg = loadImage("bg.png");
  gameOverImg = loadImage("gameOver.png");
  spaceImg = loadImage("Space.png");
  die = loadSound("die.mp3");
  
}


function setup(){
  createCanvas(800,800);

  
  backGround1 = createSprite(400,20,1600,1000);
  backGround1.addImage("background",backGroundImg);
  backGround1.scale = 10;
 
  bird = createSprite(100,200,20,30);
  bird.addImage("bird",birdImg);
  bird.scale = 0.5;
  bird.setCollider("circle",0,0,20);
  

   gameOver = createSprite(400,400,20,20);
   gameOver.addImage("gameover",gameOverImg);

 

   space = createSprite(400,300,10,10);
   space.addImage("sp",spaceImg);
   space.scale = 0.3;

 
   

   gameOver.visible = false; 
   
   space.visible = false;


  obstaclestopGroup = new Group();

  obstaclesbottomGroup = new Group();

  bird.debug = true;
 

  





}

function draw(){

  background(255);



  if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/50);

    if(backGround1.x < 0){
      backGround1.x = backGround1.width/2;
    }
    
    backGround1.velocityX = -10

    

    

    spawntopObstacles();
    spawnbottomObstacles();
    

    if(obstaclestopGroup.isTouching(bird)){
      gameState = END;
    }

    if(obstaclesbottomGroup.isTouching(bird)){
      gameState = END;
      die.play();
    }
  }

    if(gameState === END){
    
     

      backGround1.velocityX = 0
      obstaclestopGroup.setVelocityXEach(0);

      obstaclestopGroup.setLifetimeEach(-1);

      obstaclesbottomGroup.setVelocityXEach(0);

      obstaclesbottomGroup.setLifetimeEach(-1);

      
      gameOver.visible = true;
      
      space.visible = true;

      if(keyDown("SPACE")){
        reset();
      }

      
      

      
    }

    if(keyDown("UP_ARROW")){
      bird.velocityY = -3;
    }
    bird.velocityY = .10;


  
    drawSprites();
    textSize(25);
    text("Score: "+ score, 500,50);
}




function spawntopObstacles(){

  if(frameCount % 180 ===0){
    tunnel = createSprite(800,100,20,20);
  tunnel.addImage(tunneltopImg);
  tunnel.velocityX = -10.
  tunnel.lifetime = 300;
  tunnel.scale = 5;
  
  obstaclestopGroup.add(tunnel);
  }
}

function spawnbottomObstacles(){

  if(frameCount % 120 ===0){
    tunnel1 = createSprite(800,700,20,20);
    tunnel1.addImage(tunnelbottemImg);
    tunnel1.velocityX = -10
    tunnel1.lifetime = 300
    tunnel1.scale = 5;

    obstaclesbottomGroup.add(tunnel1);
  }
}

function reset(){
gameState = PLAY
gameOver.visible = false;

space.visible = false;

bird.x = 100;
bird.y = 200;

obstaclesbottomGroup.destroyEach();
obstaclestopGroup.destroyEach();
score = 0;

}



