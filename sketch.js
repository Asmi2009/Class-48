var bg,bgimg;
var ballon,ballonimg;
var topground;
var bottomground;
var obsT1img;
var obsT2img,obsTop;
var obsB1img;
var obsB2img;
var obsB3img;
var obsB;
var bargrp;
var score = 0;
var restart, restartimg;
var gameOver, gameoverimg;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var bottomobsgrp;
var topobsgrp;



function preload() {
  bgimg = loadImage("assets/bg.png")
  ballonimg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")
  obsT1img = loadImage("assets/obsTop1.png")
  obsT2img = loadImage("assets/obsTop2.png")
  obsB1img = loadImage("assets/obsBottom1.png")
  obsB2img = loadImage("assets/obsBottom2.png")
  obsB3img = loadImage("assets/obsBottom3.png")
  restartimg = loadImage("assets/restart.png")
  gameoverimg = loadImage("assets/gameOver.png")
}

function setup () {
createCanvas(1700,1000)

bg = createSprite(width/2-100,height/2-100)
bg.addImage(bgimg)
bg.scale=1.8

gameOver = createSprite(850,400)
restart = createSprite(850,450)
gameOver.addImage(gameoverimg)
gameOver.scale = 0.5
restart.addImage(restartimg)
restart.scale = 0.5
gameOver.visible = false;
restart.visible = false;

ballon = createSprite(130,height/2,10,10)
ballon.addAnimation("ballonimg",ballonimg)
ballon.scale=0.35

topground = createSprite(0,10,3500,20)
bottomground = createSprite(0,1000,3500,20)

bargrp = new Group()
bottomobsgrp = new Group()
topobsgrp = new Group()


topground.visible=false;
bottomground.visible=false;

}

function draw () {
 background("red")
  

 if (gamestate === PLAY) {

if (keyDown("space")) {
  ballon.velocityY = -6
}
ballon.velocityY = ballon.velocityY + 2;
spawnTopObstacle();
spawnBottomObstacle();
bar();


if (ballon.isTouching(bottomobsgrp) || ballon.isTouching(topobsgrp) ||  ballon.isTouching(topground) || ballon.isTouching(bottomground)) {
  gamestate = END;

}
 }

 if (gamestate == END ) {
   gameOver.visible = true;
   restart.visible = true;

   ballon.velocityX = 0;
   ballon.velocityY = 0;
   topobsgrp.setVelocityXEach(0)
   bottomobsgrp.setVelocityXEach(0)
   bargrp.setVelocityXEach(0)
 }


drawSprites()
Score();

}

function spawnTopObstacle()
{
if (frameCount % 60 === 0) {
  obsTop = createSprite(1700,Math.round(random(50,200)),40,50)
  obsTop.velocityX = -4

   var rand = Math.round(random(1,2));
   switch(rand) {
     case 1: obsTop.addImage(obsT1img);
             break;
     case 2: obsTop.addImage(obsT2img);
             break;
    default: break;
   }
   obsTop.scale = 0.25;
   obsTop.lifetime = 380;
   ballon.depth = ballon.depth + 1;
   topobsgrp.add(obsTop)
  }
}
 
function spawnBottomObstacle () {
if (frameCount % 60 === 0) {
  obsB = createSprite(1700,850,40,50)
  obsB.velocityX = -4

  var rand = Math.round(random(1,3));
  switch(rand) {
    case 1: obsB.addImage(obsB1img);
            break;
    case 2: obsB.addImage(obsB2img);
            break;
    case 3: obsB.addImage(obsB3img);
            break;
    default: break;
  }
  obsB.scale = 0.2;
  obsB.lifetime =380;
  ballon.depth = ballon.depth + 1;  
  bottomobsgrp.add(obsB)
}           
}
 function bar () {
 if (frameCount % 60 === 0) {
   var bar = createSprite (1700,500,10,100)
   bar.velocityX = -4     
   bar.lifetime = 380;
   bar.visible = false;
   bargrp.add(bar)                     
 }
 }
  function Score () {
if (ballon.isTouching(bargrp)) {
  score = score + 1 
  }
  textSize(26)
  text("score: "+score,100,100)
  }