var trex, trex_running, edges;
var groundImage,ground,invisibleGround,bloco
var cloud,cloudsImg
var cacto,cactoImg1,cactoImg2,cactoImg3,cactoImg4,cactoImg5,cactoImg6
var score = 0,record = 0;
var play = 1,end = 0,gameState = play;
var cloudsGroup,cactosGroup
var trexCollided
var gameOver, reset, gameOverImg, resetImg
var jumpSound,dieSound,checkSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollided = loadAnimation('trex_collided.png')
  groundImage = loadImage("ground2.png")
  cloudsImg = loadImage('cloud.png')
  cactoImg1 = loadImage('obstacle1.png')
  cactoImg2 = loadImage('obstacle2.png')
  cactoImg3 = loadImage('obstacle3.png')
  cactoImg4 = loadImage('obstacle4.png')
  cactoImg5 = loadImage('obstacle5.png')
  cactoImg6 = loadImage('obstacle6.png')
  gameOverImg = loadImage('gameOver.png')
  resetImg = loadImage('restart.png')
  jumpSound = loadSound('jump.mp3')
  dieSound = loadSound('die.mp3')
  checkSound = loadSound('checkpoint.mp3')

}

function setup(){
  createCanvas(windowWidth,windowHeight);
  //600 200
  // bloco = createSprite(150,100,20,20)
  

  //criando ,0o trex
  trex = createSprite(50,height-40,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollided)
  edges = createEdgeSprites();
  
  //adicione dimensão e posição ao trex
  trex.scale = 0.5;
  trex.x = 50
  trex.debug = false
  trex.setCollider('rectangle',-2 ,0,50,50,60)
  //trex.setCollider('circle',0,0,30)
  //chão
  ground = createSprite(width/2,height-15)
  ground.addImage("chão", groundImage)
  
  invisibleGround = createSprite(width/2,height-10,width,10)
  invisibleGround.visible = false
  
  cloudsGroup = new Group();
  cactosGroup = new Group();

  gameOver = createSprite(width/2,height-125,100,10)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.7
  reset = createSprite(width/2,height-95)
  reset.addImage(resetImg)
  reset.scale = 0.3
  reset.visible = false
  gameOver.visible = false
  
}


function draw(){
  //definir a cor do plano de fundo 
  background("white");
  if (trex.isTouching(cactosGroup)) {
    gameState = end
    
  }
  if (gameState == play) {
    score += Math.round(getFrameRate()/60);
    if(score%200 == 0 && score>0){
      checkSound.play(); 
    }
    if(touches.length > 0 || keyDown("space")&& trex.y> height-35){
      trex.velocityY = -12;
      jumpSound.play()
      touches =  []

    }
    ground.velocityX = -(12 + score/100)
  
  if(ground.x < 200){
    ground.x = ground.width/2
  }
  clouds();
  cactos();


  }
  if (gameState == end) {
    trex.changeAnimation("collided", trexCollided)
    ground.velocityX = 0
    cactosGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    cactosGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    reset.visible = true
    gameOver.visible = true



    //dieSound.play();
    if(record < score){
      record = score
    }
    if(mousePressedOver(reset)){
      gameState = play
      reset.visible = false
      gameOver.visible = false
      cactosGroup.destroyEach();
      cloudsGroup.destroyEach();
      trex.changeAnimation("running", trex_running)
      score = 0
    


    }

  
  }
  //registrando a posição y do trex
  //console.log(trex.y)
  
  //pular quando tecla de espaço for pressionada
  
  
  trex.velocityY = trex.velocityY + 0.5;
  

  
  fill ('gray')
  stroke('gray')
  textAlign(CENTER,TOP)
  textSize(14)
 
   text('pontos: '+ score,width-100,height-170)
   text('recorde: '+ record,width-100,height-150)

 //impedir que o trex caia
  trex.collide(invisibleGround)
  //cordenada do T-rex
  //text('X: '+mouseX+' /Y: '+mouseY,mouseX,mouseY)
  drawSprites();
}
function clouds() {
  if (frameCount%70 == 0) {
     cloud = createSprite(width,random(height-180,height-110),30,15)
     cloud.velocityX = -(5 + score/100)
     cloud.addImage(cloudsImg)
     cloud.scale = random(0.3,1.5)
     cloud.depth = trex.depth -1
     cloud.lifetime = width/cloud.velocityX
     cloudsGroup.add(cloud)
       
     
  }


}
function cactos() {
  if (frameCount%100 == 0) {
    cacto = createSprite(width,height-30,70,30);
    cacto.velocityX = -(4 + score/100)
    cacto.scale = 0.5
    cacto.lifetime = width/cacto.velocityX
    cacto.depth = trex.depth 
    cactosGroup.add(cacto)

    var sorte = Math.round(random(1,6));
    switch (sorte) {
      case 1: cacto.addImage(cactoImg1)
    
        break;
      case 2: cacto.addImage(cactoImg2)
        break;
      case 3 : cacto.addImage(cactoImg3)
      break;
      case 4 : cacto.addImage(cactoImg4)
      break;
      case 5 : cacto.addImage(cactoImg5)
      break;
      case 6 : cacto.addImage(cactoImg6)
      break;
     
    }
 
  }
}