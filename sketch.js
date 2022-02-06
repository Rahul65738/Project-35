var balloon;
var backgroundImg;

function preload() {
  backgroundImg = loadImage("images/1.png")
  balloonImage1 = loadAnimation("images/2.png");
  balloonImage2 = loadAnimation("images/3.png");
  balloonImage3 = loadAnimation("images/4.png");
}

function setup(){
   database = firebase.database();
    createCanvas(500,500);

balloon = createSprite (100,250, 20, 20)
  balloon.addAnimation("balloon", balloonImage1);
  balloon.scale = 0.4;

var balloonPosition = database.ref('balloon/position');
balloonPosition.on("value", readPosition, showError);
}

function draw(){

    background(backgroundImg);
  
        if(keyDown(LEFT_ARROW)){
         writePosition(-10,0);
            balloon.addAnimation("hotAirBalloon", balloonImage2);
            //balloon.scale = balloon.scale -0.01;
        }
        else if(keyDown(RIGHT_ARROW)){
         writePosition(10,0);
            balloon.addAnimation("hotAirBalloon", balloonImage3);
        }
        else if(keyDown(UP_ARROW)){
         writePosition(0,-10);
            balloon.addAnimation("hotAirBalloon", balloonImage2);
            balloon.scale = balloon.scale -0.01;
        }
        else if(keyDown(DOWN_ARROW)){
         writePosition(0,10);
            balloon.addAnimation("hotAirBalloon", balloonImage3);
            balloon.scale = balloon.scale +0.01;
        }
        drawSprites();
        fill(0);
        stroke("white");
        textSize(25);
        text("Use arrow keys to move Hot Air Balloon!",40,40);
    }

    function writePosition(x,y){
        database.ref('balloon/position').set({
            'x': position.x + x ,
            'y': position.y + y
        })
    }

    function readPosition(data){
        position = data.val();
        balloon.x = position.x;
        balloon.y = position.y;
    }

    function showError(){
        console.log("Error in writing to the database");
    }
