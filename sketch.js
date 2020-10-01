const Engine = Matter.Engine;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
var player,dead,playerImg;
var gameState = "Start";
var edges;
var start,startimg;
var butcher;
var time = 0;
var bat,batimg,swing;
var hit,bullet;
var butchers = [];
function preload() {
  startimg = loadImage("images/play.jpg");
  //playerImg = loadImage("images/chicken.png");
  batimg = loadImage("images/bat.png");
  swing = loadImage("images/swing.png");
}

function setup() {
  createCanvas(displayWidth,displayHeight-150);
  engine = Engine.create();
  world = engine.world;
  player = createSprite(30,650,25,25);
  //player.addImage(playerImg);
  edges = createEdgeSprites();
  start = createSprite(750,340,200,50);
  start.addImage(startimg);
  start.scale = 1.5;
  butcher = new Butcher();
  lumberGroup = new Group();

  bat = createSprite(random(100,1500),random(0,715),10,10);
  bat.addImage(batimg);
  bat.scale = 0.1;
  }
  


function draw() {
  background(0);

  Engine.update(engine);

  
  text(mouseX + " " + mouseY,700,50);
  text("Time Survived : " + time,1230,50);

  console.log(gameState);
  //console.log(getFrameRate());

  if (mousePressedOver(start)) {
    gameState = "survive";
  }

  if (frameCount % 1800 === 0) {
    butcher = new Butcher();
    lumberGroup.add(butcher.butcher);
  }
  if (gameState === "survive") {
    start.remove();
    butcher.butcher.attractionPoint(0.1,player.x,player.y);

    if(player.isTouching(bat)){
      bat.x = player.x + 5;
      bat.y = player.y;
      if (mouseIsPressed) {
        if (mouseButton === LEFT) {
          bat.addImage(swing);
        }
        if (bat.isTouching(butcher.butcher) && mouseButton === LEFT) {
          butcher.butcher.attractionPoint(0,butcher.butcher.x,butcher.butcher.y);
        }
      }
    }


    if(frameCount % 30 === 0){
      time = time + 1;
    }


    

    player.collide(edges);

    if (keyWentDown ("w")) {
      player.velocityY = -4;
    }
    if (keyWentUp ("w")) {
      player.velocityY = 0;
    }
    if (keyWentDown ("a")) {
      player.velocityX = -4;
    }
    if (keyWentUp ("a")) {
      player.velocityX = 0;
    }
    if (keyWentDown ("s")) {
      player.velocityY = 4;
    }
    if (keyWentUp ("s")) {
      player.velocityY = 0;
    }
    if (keyWentDown ("d")) {
      player.velocityX = 4;
    }
    if (keyWentUp ("d")) {
      player.velocityX = 0;
    }
  }


  butcher.display(); 
  
  butcher.butcher.collide(edges);

  drawSprites();
}

