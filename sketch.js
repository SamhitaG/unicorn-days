var unicorn, unicorn3Image
var  coinImage, unicorn1Image, unicorn3Image
var score = 1
var chances =3
var PLAY=1
var SERVE = 2
var END = 0
var DAY= 5
var NIGHT= 6
var coinGroup, coin
var happyImage,darkImage,obstacle,monster,obstacleImage, monsterImage,monsterGroup
var gameState = SERVE;
function preload() {
  unicorn3Image= loadImage(" unicorn.png")
  coinImage=loadImage("coin.png")
    darkImage=loadImage("dark.png")
   happyImage=loadImage("happy.png")
   obstacleImage= loadImage("obstacle.png");
   monsterImage= loadImage ("monster.png")
  
}

function setup(){
  createCanvas(displayWidth-50, displayHeight-30);
  unicorn= createSprite(200,335,20,20)
  unicorn.addImage(unicorn3Image)
  unicorn.scale=0.3
   ground=createSprite(400, displayHeight-100,displayWidth,10);
   ground.velocityX=-4
   ground.x=ground.width/2;

   coinGroup= createGroup();
   obstacleGroup=createGroup();
   monsterGroup=createGroup();

}

function draw(){
 

  background(happyImage);
  ground.visible= false;
    
  unicorn.collide(ground);

  async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    
    if(min%1===0){
        bg = "happy.png";

    }
    else{
        bg = "dark.png";
     
      }}
  if(gameState === SERVE){
    stroke("black");
    textSize(20);
    fill("black");
    text("press 'space or up ' to jump", displayWidth/4, displayHeight/4);
    text("press 'space' to start", displayWidth/4, displayHeight/2+5);  
    if(keyDown("space")){
      gameState = PLAY;
    }}
    if(gameState === PLAY){
      if(unicorn.isTouching(coinGroup)){
      coinGroup.destroyEach();
      score = score + 1;       
      
     }
    
     
     if (gameState=== NIGHT){

enemy();
     }

     gold();
      obstacles();
      

     stroke("black");
     textSize(20);
     fill("black");
     survivalTime = Math.round(frameCount/80);
     text("score:"+score, displayWidth/2.5, displayHeight/5);  
     text("lives:"+chances,  displayWidth/2, displayHeight/5);
      ground.x=ground.width/2;

      if(keyDown("space")&& unicorn.y >= 100) {
        unicorn.velocityY = -7; 
        }
        if(keyDown("up")&& unicorn.y >= 100) {
          unicorn.velocityY = -12; 
        }
        unicorn.velocityY = unicorn.velocityY + 1.5;
        
        if(unicorn.isTouching(monsterGroup)){
           score=score-3
          monsterGroup.destroyEach()
         }
        if(score<=0){
          gameState=END;
        }
        if(unicorn.isTouching(obstacleGroup)){
          
          chances = chances - 1;
          obstacleGroup.destroyEach();}
         
      
          if(chances === 0){
            gameState = END;
          }
      }
      else if(gameState === END){
    
  
        obstacleGroup.setVelocityXEach(0);
   
        obstacleGroup.setLifetimeEach(-1);
        
        coinGroup.setVelocityXEach(0);
  
        coinGroup.setLifetimeEach(-1);
        
        ground.velocityX = 0;
      }
      

      drawSprites()
}
function gold() {
  if(frameCount % 170 === 0){
  
    coin= createSprite(displayWidth,displayHeight-130,40,10);
    
    coin.addImage("coin",coinImage);
  
    coin.y = Math.round(random(400,450));
   
    coin.scale = 0.07;

    coin.velocityX = -6;
    
    coin.lifetime = 400;
    
    coinGroup.add(coin);
  }
}

function obstacles() {
  if(frameCount % 100 === 0 ){
                     
    obstacle = createSprite(displayWidth,displayHeight-120,10,10);

    obstacle.addImage(obstacleImage);

    obstacle.velocityX = -8;

    obstacle.lifetime = 200;
 
    obstacle.scale = 0.;
    
    obstacleGroup.add(obstacle);
  }
}

function enemy() {
  if(frameCount % 200 === 0 ){
                     
    monster = createSprite(displayWidth,displayHeight-120,10,10);
   
    monster.addImage(monsterImage);
 
    monster.velocityX = -9;
 
    monster.lifetime = 200;
   
    monster.scale = 0.3;
   
    monsterGroup.add(monster);
  }
}
    

