const addItemInput = document.getElementById('abc');
const send = document.getElementById("sendit");

function hide() {
    var x = document.getElementById("def");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
} 	
  
send.addEventListener('click', () => {
    let div2 = document.getElementsByClassName("msg-insert")[0];
    let div1 = document.createElement('div');
    div1.textContent = addItemInput.value;
    div1.className = "msg-send";
    div2.appendChild(div1);
    addItemInput.value = '';
});

  
class Point {
constructor(x, y) {
    this.X = x;
    this.Y = y;
  }
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

    // canvas = document.getElementById("main");
var stage = new createjs.Stage("main");
var w = stage.canvas.width;
var h = stage.canvas.height;

let STEP_MAX = 1.0;
let STEP_CHANGE = 0.2;
let HEIGHT_MAX = h * 0.7;

// starting conditions
var height = Math.random() * HEIGHT_MAX;
var slope = Math.random() * STEP_MAX * 2 - STEP_MAX;
let base_a = new Array();
let base_b = new Array();
let TerainPath = new Array();
let PrevTerain = new Array();
var basea = [];
var baseb = [];
var TerrainShape = new createjs.Shape();
var TankShape = new createjs.Shape();
var Tankstickl = new createjs.Shape();
var Tankstickr = new createjs.Shape();
var randX1;
var randY1;  
var randX2;
var randY2;
var blastocc=false;
var fire = document.getElementById("fireit");
var launchv1 = document.getElementById("v1");
var launchv2 = document.getElementById("v2");
var launcht1 = document.getElementById("t1");
var launcht2 = document.getElementById("t2");
const launchButton = document.querySelector('.fireit');
var isLeft = true;
const forward1 = document.querySelector('#left-player .plus');
const backward1 = document.querySelector('#left-player .minus');
const forward2 = document.querySelector('#right-player .plus');
const backward2 = document.querySelector('#right-player .minus');
var movleft=false;var moveright =false;
// canvas.width = canvas.clientWidth;
// canvas.height = canvas.clientHeight;

var threeShots=false, sniper=false, oneShot=true, isgamma=false;


var moveLogic,moveLogic1,moveLogic2,moveLogic3;
var positionX = 0, positionY = 0,positionX1 = 0, positionY1 = 0,positionX2 = 0, positionY2 = 0,positionX3 = 0, positionY3 = 0,positionX4 = 0, positionY4 = 0, gravity = 10, time = 0,time1=0,time2=0,time3=0, pi = 3.1415, ang = 0, speed = 0, x = 0, y = 0, initialXPosition = 5, initialYPosition = 15;
var loop = false;
var rad =0, vox = 0, voy=0, vox1 = 0, voy1=0, vox2 = 0, voy2=0, vox3 = 0, voy3=0, vox4 = 0, voy4=0;

var C_theta_rads;
var C_sin_theta_voi;
var C_cos_theta_voi;

if(isLeft == true){
	C_theta_rads = launcht1.value * Math.PI / 180.0;
	C_sin_theta_voi = Math.sin(C_theta_rads) * launchv1.value;
	C_cos_theta_voi = Math.cos(C_theta_rads) * launchv1.value;
}
else{
	C_theta_rads = launcht2.value * Math.PI / 180.0;
	C_sin_theta_voi = Math.sin(C_theta_rads) * launchv2.value;
	C_cos_theta_voi = Math.cos(C_theta_rads) * launchv2.value;
}

// var C_half_gravity = this.World.Gravity / 2;


function startGame(){
  GenerateTerrain();
  stage.update();
}
var stt=1;

function GenerateTerrain(){

	var circle = new createjs.Shape();
    circle.graphics.beginRadialGradientFill(["#e5df6e","#d67d24"], [0, 1], 0, 5, 0, 0, 5, 30).drawCircle(0, 5, 30);
    circle.x = 0;
    circle.y = 90;
    stage.addChild(circle);
	createjs.Tween.get(circle, { loop: true })
    .to({ x: 1000 }, 200000)
  // .to({ alpha: 0, y: 175 }, 500, createjs.Ease.getPowInOut(2))
  // .to({ alpha: 0, y: 225 }, 100)
  // .to({ alpha: 1, y: 200 }, 500, createjs.Ease.getPowInOut(2))
  // .to({ x: 100 }, 800, createjs.Ease.getPowInOut(2));

  createjs.Ticker.setFPS(60);
createjs.Ticker.addEventListener("tick", stage);

    while (stt) {
      stt=0;
      // creating the landscape
      for (var x = 0; x < w; x++) {
        // change height and slope
        height += slope;
        slope += Math.random() * STEP_CHANGE * 2 - STEP_CHANGE;

        // clip height and slope to maximum
        if (slope > STEP_MAX) {
          slope = STEP_MAX;
        }
        if (slope < -STEP_MAX) {
          slope = -STEP_MAX;
        }

        if (height > HEIGHT_MAX) {
          height = HEIGHT_MAX;
          slope *= -1;
        }
        if (height < 0) {
          height = 0;
          slope *= -1;
        }


        // save the terain path
        TerainPath[x] = height;
      }
      console.log("Atul");
    }
    let max_w = TerainPath.length;
    randX1 = rand(0,max_w/3);
    randY1 = h - TerainPath[randX1];
    randX2 = rand(2*max_w/3,max_w);
    randY2 = h - TerainPath[randX2];
    // randY1 = h - TerainPath[rand(0,TerainPath.length)];

    TerrainShape.graphics.beginStroke("rgb(0, 150, 0)");
    //TerrainShape.graphics.beginFill("red");            // TerrainShape.strokeStyle = "black";
    TerrainShape.lineWidth = 1;
    var randdiff;
    //myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120);
    
    for (let x = 0; x < max_w; x++) {
      // draw column
      // TerrainShape.graphics.beginStroke();
      randdiff = rand(0,10);
      TerrainShape.graphics.moveTo(x, h);
      TerrainShape.graphics.lineTo(x, h - TerainPath[x]-randdiff);
      TerrainShape.graphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], x, h, x, h - TerainPath[x]-randdiff);
      // TerrainShape.graphics.stroke();
    }
    // 
    TerrainShape.graphics.beginStroke("rgb(51, -119, 0)");
    //TerrainShape.graphics.beginFill("red");            // TerrainShape.strokeStyle = "black";
    TerrainShape.lineWidth = 1;
    
    for (let x = 0; x < max_w; x++) {
      // draw column
      // TerrainShape.graphics.beginStroke();
      TerrainShape.graphics.moveTo(x, h);
      TerrainShape.graphics.lineTo(x, h - TerainPath[x]+10);
      // TerrainShape.graphics.stroke();
    }

    //console.log("Dwij");
    stage.addChild(TerrainShape);
    DrawBaseleft(randX1,randY1);
    DrawBaseright(randX2,randY2);

    
}
function UpdateTerrain(){
	let max_w = TerainPath.length;
	movleft=false;
	moveright=false;
	randY1 = h - TerainPath[randX1];	
	randY2 = h - TerainPath[randX2];
	TerrainShape.graphics.beginStroke("rgb(0, 150, 0)");
    //TerrainShape.graphics.beginFill("red");            // TerrainShape.strokeStyle = "black";
    TerrainShape.lineWidth = 1;
    var randdiff;
    //myGraphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], 0, 20, 0, 120);
    
    for (let x = 0; x < max_w; x++) {
      // draw column
      // TerrainShape.graphics.beginStroke();
      randdiff = rand(0,10);
      TerrainShape.graphics.moveTo(x, h);
      TerrainShape.graphics.lineTo(x, h - TerainPath[x]-randdiff);
      TerrainShape.graphics.beginLinearGradientFill(["#000","#FFF"], [0, 1], x, h, x, h - TerainPath[x]-randdiff);
      // TerrainShape.graphics.stroke();
    }
    // 
    TerrainShape.graphics.beginStroke("rgb(51, -119, 0)");
    //TerrainShape.graphics.beginFill("red");            // TerrainShape.strokeStyle = "black";
    TerrainShape.lineWidth = 1;
    
    for (let x = 0; x < max_w; x++) {
      // draw column
      // TerrainShape.graphics.beginStroke();
      TerrainShape.graphics.moveTo(x, h);
      TerrainShape.graphics.lineTo(x, h - TerainPath[x]+10);
      // TerrainShape.graphics.stroke();
    }

    //console.log("Dwij");
    stage.addChild(TerrainShape);
    DrawBaseleft(randX1,randY1);
	DrawBaseright(randX2,randY2);
	//stage.update();
}


function oShot(){
	console.log("Dwij");
	threeShots = false;
	oneShot = true;
	sniper = false;
	isgamma = false;
}

function sniperS(){
	console.log("Dwij");
	sniper = true;
	threeShots = false;
	oneShot = false;
	isgamma = false;
}

function tShots(){
	console.log("Dwij");
	threeShots = true;
	oneShot = false;
	sniper = false;
	isgamma = false;
}

function gammat(){
	console.log("Dwij");
	threeShots = false;
	oneShot = false;
	sniper = false;
	isgamma = true;
}

fire.addEventListener('click', start, false);

     function start() {
        if(isLeft){
	      	if(sniper){
				rad = launcht1.value * Math.PI / 180;
				vox = launchv1.value * Math.cos(rad);
				voy = launchv1.value * Math.sin(rad);
				moveLogic = setInterval(mainLooplefts, 4);
			} 
	      	else if(threeShots){
	      		console.log("Working button");
				rad = launcht1.value * Math.PI / 180;
				vox1 = launchv1.value * Math.cos(rad+0.15);
				voy1 = launchv1.value * Math.sin(rad+0.15);
				vox2 = launchv1.value * Math.cos(rad);
				voy2 = launchv1.value * Math.sin(rad);
				vox3 = launchv1.value * Math.cos(rad-0.15);
				voy3 = launchv1.value * Math.sin(rad-0.15);
				moveLogic1 = setInterval(mainLoopleft3Shots1, 4);
				moveLogic2 = setInterval(mainLoopleft3Shots2, 4);
				moveLogic3 = setInterval(mainLoopleft3Shots3, 4);
			
					}
				
	      	else if(oneShot){
				console.log("Working button");
				rad = launcht1.value * Math.PI / 180;
				vox = launchv1.value * Math.cos(rad);
				voy = launchv1.value * Math.sin(rad);
				moveLogic = setInterval(mainLoopleft, 4);
			}
			else if(isgamma){
				rad = launcht1.value * Math.PI / 180;
				vox = launchv1.value * Math.cos(rad);
				voy = launchv1.value * Math.sin(rad);
				moveLogic = setInterval(mainLoopleftg, 4);
			} 
			isLeft=false;
	    }
		else{
			if(sniper){
				rad = rand(50,85) * Math.PI / 180;
				vox = -(rand(50,85)* Math.cos(rad));
				voy = rand(50,85)* Math.sin(rad);
				moveLogic = setInterval(mainLooprights, 4);
			} 
	  	else if(threeShots){
	      		console.log("Working button");
				rad =rand(50,85) * Math.PI / 180;
				vox1 = -(rand(50,85)* Math.cos(rad+0.15));
				voy1 = rand(50,85) * Math.sin(rad+0.15);
				vox2 = -(rand(50,85) * Math.cos(rad));
				voy2 = rand(50,85) * Math.sin(rad);
				vox3 = -(rand(50,85)* Math.cos(rad-0.15));
				voy3 = rand(50,85) * Math.sin(rad-0.15);
				moveLogic1 = setInterval(mainLoopright3Shots1, 4);
				moveLogic2 = setInterval(mainLoopright3Shots2, 4);
				moveLogic3 = setInterval(mainLoopright3Shots3, 4);
					}
		
			else if(oneShot){
		  		console.log("Working button");
				rad = rand(50,85) * Math.PI / 180;
				vox =-(rand(50,85) * Math.cos(rad));
				voy = rand(50,85) * Math.sin(rad);
		    	moveLogic = setInterval(mainLoopright, 4);
				}
				else if(isgamma){
				rad = rand(50,85) * Math.PI / 180;
				vox = -(rand(50,85)* Math.cos(rad));
				voy =rand(50,85)* Math.sin(rad);
				moveLogic = setInterval(mainLooprightg, 4);
			}
		   isLeft =true;
		}
	}

	function mainLoopleftg() {
	
		time += 0.03;
		x = vox * time + randX1;
		y =(-voy)* time + randY1;
		positionX = x;
		positionY = y;
		var mS = new createjs.Shape();	
		mS.graphics.beginStroke("skyblue");
			mS.graphics.beginFill("skyblue");
			mS.graphics.moveTo(positionX - 5*Math.sin(rad),positionY - 5*Math.cos(rad));
			mS.graphics.lineTo(positionX + 10*Math.cos(rad),positionY - 10*Math.sin(rad));
			mS.graphics.lineTo(positionX + 5*Math.sin(rad),positionY + 5*Math.cos(rad));
			mS.graphics.lineTo(positionX + 5*Math.cos(rad),positionY - 5*Math.sin(rad));
			mS.graphics.lineTo(positionX - 5*Math.sin(rad),positionY - 5*Math.cos(rad));
	    stage.addChild(mS);

	    setTimeout(function(){
		    stage.removeChild(mS);
			}, 4);
			if((randX2 - 15) <= positionX && positionX <= (randX2 + 15) && positionY <= (randY2 + 15) && positionY >= (randY2 - 15) ) {
					
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS);
			clearInterval(moveLogic);
			var r=0;
			 var blastcreator = setInterval(function(){
				 for(var t = Math.ceil(positionX+15)-r; t <= Math.ceil(positionX+15)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX+15)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>20){
				clearInterval(blastcreator);
				x=0;y=0;time=0;positionX=0;positionY=0;
				blastocc=false;
				}
			},5);
		 }
		 if (positionX > 1000 || positionY > 500 || positionY < 0){
			 console.log("out");
			 stage.removeChild(mS);
      clearInterval(moveLogic);
      x=0;y=0;time=0;positionX=0;positionY=0;
    }

	}

	
	function mainLoopleft3Shots1() {
		console.log("out1");
		if (positionY1 >= h -TerainPath[Math.ceil(positionX1)]){
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS1);
			clearInterval(moveLogic1);
			var r=0;
			 var blastcreator1 = setInterval(function(){
				 for(var t = Math.ceil(positionX1)-r; t <= Math.ceil(positionX1)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX1)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator1);
				x1=0;y1=0;time1=0;positionX1=0;positionY1=0;
				blastocc=false;
				}
			},5);
		}
		if (positionX1 > 1000){
			stage.removeChild(mS1);
      clearInterval(moveLogic1);
      x1=0;y1=0;time1=0;positionX1=0;positionY1=0;
    }
		
		time1 += 0.03;
		x1 = vox1 * time1 + randX1;
		y1 = (-((voy1 * time1 )- (0.5 * gravity * (time1 * time1))))+ randY1;
		positionX1 = x1;
		positionY1 = y1;
		
		var mS1 = new createjs.Shape();	
		mS1.graphics.beginStroke("black");
	    mS1.graphics.beginFill("black"); 
	    mS1.graphics.arc(
	      positionX1,
	       positionY1,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS1);
	  
	    setTimeout(function(){
		    stage.removeChild(mS1);
		  }, 4);
		  if((randX2 - 15) <= positionX1 && positionX1 <= (randX2 + 15) && positionY1 <= (randY2 + 15) && positionY1 >= (randY2 - 15) ) {
					
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS1);
			clearInterval(moveLogic1);
			var r=0;
			 var blastcreator1 = setInterval(function(){
				 for(var t = Math.ceil(positionX1)-r; t <= Math.ceil(positionX1)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX1)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>10){
				clearInterval(blastcreator1);
				x1=0;y1=0;time1=0;positionX1=0;positionY1=0;
				blastocc=false;
				}
			},5);
		 }

	}
	function mainLoopleft3Shots2() {
	
		if (positionY2 >= h -TerainPath[Math.ceil(positionX2)]){
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS2);
			clearInterval(moveLogic2);
			var r=0;
			 var blastcreator2 = setInterval(function(){
				 for(var t = Math.ceil(positionX2)-r; t <= Math.ceil(positionX2)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX2)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator2);
				x2=0;y2=0;time2=0;positionX2=0;positionY2=0;
				blastocc=false;
				}
			},5);
		}
		if (positionX2 > 1000){
			stage.removeChild(mS2);
      clearInterval(moveLogic2);
      x2=0;y2=0;time2=0;positionX2=0;positionY2=0;
    }
	
		 time2 += 0.03;
	
	
		x2 = vox2 * time2 + randX1;
		y2 = (-((voy2 * time2 )- (0.5 * gravity * (time2 * time2))))+ randY1;
		positionX2 = x2;
		positionY2 = y2;
	
	    var mS2 = new createjs.Shape();	
		mS2.graphics.beginStroke("yellow");
	    mS2.graphics.beginFill("yellow"); 
	    mS2.graphics.arc(
	      positionX2,
	       positionY2,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS2);
	 
	    setTimeout(function(){
		    stage.removeChild(mS2);
		  }, 4);
		  if((randX2 - 15) <= positionX2 && positionX2 <= (randX2 + 15) && positionY2 <= (randY2 + 15) && positionY2 >= (randY2 - 15) ) {
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS2);
			clearInterval(moveLogic2);
			var r=0;
			 var blastcreator2 = setInterval(function(){
				 for(var t = Math.ceil(positionX2)-r; t <= Math.ceil(positionX2)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX2)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator2);
				x2=0;y2=0;time2=0;positionX2=0;positionY2=0;
				blastocc=false;
				}
			},5);
		
		}
	}


	function mainLoopleft3Shots3() {
	
		if (positionY3 >= h -TerainPath[Math.ceil(positionX3)]){
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS3);
			clearInterval(moveLogic3);
			var r=0;
			 var blastcreator3 = setInterval(function(){
				 for(var t = Math.ceil(positionX3)-r; t <= Math.ceil(positionX3)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX3)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator3);
				x3=0;y3=0;time3=0;positionX3=0;positionY3=0;
				blastocc=false;
				}
			},5);
		}
		if (positionX3 > 1000){
			stage.removeChild(mS3);
      clearInterval(moveLogic3);
      x3=0;y3=0;time3=0;positionX3=0;positionY3=0;
    }
		time3 += 0.03;
	
		x3 = vox3 * time3 + randX1;
		y3 = (-((voy3 * time3 )- (0.5 * gravity * (time3 * time3))))+ randY1;
		positionX3 = x3;
		positionY3 = y3;
	
	    var mS3 = new createjs.Shape();	
		mS3.graphics.beginStroke("black");
	    mS3.graphics.beginFill("black"); 
	    mS3.graphics.arc(
	      positionX3,
	       positionY3,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS3);
	   
	    setTimeout(function(){
		    stage.removeChild(mS3);
		  }, 4);
		  if((randX2 - 15) <= positionX3 && positionX3 <= (randX2 + 15) && positionY3 <= (randY2 + 15) && positionY3 >= (randY2 - 15) ) {
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS3);
			clearInterval(moveLogic3);
			var r=0;
			 var blastcreator3 = setInterval(function(){
				 for(var t = Math.ceil(positionX3)-r; t <= Math.ceil(positionX3)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX3)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator3);
				x3=0;y3=0;time3=0;positionX3=0;positionY3=0;
				blastocc=false;
				}
			},5); 
		  }
	}

	function mainLooplefts() {

		
		 if (positionY >= h -TerainPath[Math.ceil(positionX)]){
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS);
			clearInterval(moveLogic);
			var r=0;
			 var blastcreator = setInterval(function(){
				 for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>10){
				clearInterval(blastcreator);
				x=0;y=0;time=0;positionX=0;positionY=0;
				blastocc=false;
				}
			},50);
		}
		if (positionX > 1000){
			stage.removeChild(mS);
      clearInterval(moveLogic);
	  x=0;y=0;time=0;positionX=0;positionY=0;
    }
		time += 0.03;
		x = vox * time + randX1;
		y = (-((voy * time )- (0.5 * gravity * (time * time))))+ randY1;
		positionX = x;
		positionY = y;
		var mS = new createjs.Shape();	
		mS.graphics.beginStroke("red");
	    mS.graphics.beginFill("red"); 
	    mS.graphics.arc(
	      positionX,
	       positionY,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS);

	    setTimeout(function(){
		    stage.removeChild(mS);
			}, 4);
			if((randX2 - 5) <= positionX && positionX <= (randX2 + 5) && positionY <= (randY2 + 5) && positionY >= (randY2 - 5) ) {
					
				PrevTerain=TerainPath;	
				blastocc=true;
				stage.removeChild(mS);
				clearInterval(moveLogic);
				var r=0;
				 var blastcreator = setInterval(function(){
					 for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
						 if (TerainPath[t] >6 ){
					TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2)))/10;
						 }
					 }
					TerrainShape.graphics.clear(); 
					TankShape.graphics.clear();
					Tankstickl.graphics.clear();
					Tankstickr.graphics.clear();
				UpdateTerrain();
	
					 r++;
					 if(r>10){
					clearInterval(blastcreator);
					x=0;y=0;time=0;positionX=0;positionY=0;
					blastocc=false;
					}
				},50);
		}
	}

	


    function mainLoopleft() {	
		console.log("Working button");	

		if (positionY >= h -TerainPath[Math.ceil(positionX)]){
			PrevTerain=TerainPath;
			blastocc=true;
			stage.removeChild(mS);
			clearInterval(moveLogic);
			var r=0;
			 var blastcreator = setInterval(function(){
			 	for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2))/8);
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();
			 	r++;
			 	if(r>20){
				clearInterval(blastcreator);
				x=0;y=0;time=0;positionX=0;positionY=0;
				blastocc=false;
				}
			},100);
		}
		if (positionX > 1000){
			stage.removeChild(mS);
      clearInterval(moveLogic);
	  x=0;y=0;time=0;positionX=0;positionY=0;  
    }
		time += 0.03;
		x = vox * time + randX1;
		y = (-((voy * time )- (0.5 * gravity * (time * time))))+ randY1;
		positionX = x;
		positionY = y;
		var mS = new createjs.Shape();	
		mS.graphics.beginStroke("black");
	    mS.graphics.beginFill("black"); 
	    mS.graphics.arc(
	      positionX,
	       positionY,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS);

	    setTimeout(function(){
		    stage.removeChild(mS);
			}, 4);
			if((randX2 - 15) <= positionX && positionX <= (randX2 + 15) && positionY <= (randY2 + 15) && positionY >= (randY2 - 15) ) {
				PrevTerain=TerainPath;	
				blastocc=true;
				stage.removeChild(mS);
				clearInterval(moveLogic);
				var r=0;
				 var blastcreator = setInterval(function(){
					 for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
						 if (TerainPath[t] >6 ){
					TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2)))/10;
						 }
					 }
					TerrainShape.graphics.clear(); 
					TankShape.graphics.clear();
					Tankstickl.graphics.clear();
					Tankstickr.graphics.clear();
				UpdateTerrain();
	
					 r++;
					 if(r>20){
					clearInterval(blastcreator);
					x=0;y=0;time=0;positionX=0;positionY=0;
					blastocc=false;
					}
				},100);
		 }
		//stage.removeChild(mS);	
		// ball.style.left = positionX + "px";
		// ball.style.bottom = positionY + "px";
		// posX.innerHTML = "PositionX: " + Math.round(positionX);
		// posY.innerHTML = "PositionY: " + Math.round(positionY);

		// if(positionY <= 10) {		
		// 	clearInterval(moveLogic);
		// }	
	}




function mainLoopright3Shots1() {


	if (positionY1 >= h -TerainPath[Math.ceil(positionX1)]){

		PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS1);
			clearInterval(moveLogic1);
			var r=0;
			 var blastcreator1 = setInterval(function(){
				 for(var t = Math.ceil(positionX1)-r; t <= Math.ceil(positionX1)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX1)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator1);
				x1=0;y1=0;time1=0;positionX1=0;positionY1=0;
				blastocc=false;
				}
			},5);
	}
	if (positionX1 < 0){
		stage.removeChild(mS1);
      clearInterval(moveLogic1);
      x1=0;y1=0;time1=0;positionX1=0;positionY1=0;
    }
	
	
	time1 += 0.03;
	x1 = vox1 * time1 + randX2;
	y1 = (-((voy1 * time1 )- (0.5 * gravity * (time1 * time1))))+ randY2;
	positionX1 = x1;
	positionY1 = y1;
	
	var mS1 = new createjs.Shape();	
	mS1.graphics.beginStroke("black");
		mS1.graphics.beginFill("black"); 
		mS1.graphics.arc(
			positionX1,
			 positionY1,
			 2,
			 0,
			 2*Math.PI,
			 true
			);
		stage.addChild(mS1);
	
		setTimeout(function(){
			stage.removeChild(mS1);
		}, 4);
		if((randX1 - 15) <= positionX1 && positionX1 <= (randX1 + 15) && positionY1 <= (randY1 + 15) && positionY1 >= (randY1 - 15) ) {
					
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS1);
			clearInterval(moveLogic1);
			var r=0;
			 var blastcreator1 = setInterval(function(){
				 for(var t = Math.ceil(positionX1)-r; t <= Math.ceil(positionX1)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX1)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>10){
				clearInterval(blastcreator1);
				x1=0;y1=0;time1=0;positionX1=0;positionY1=0;
				blastocc=false;
				}
			},5);
		}

}
function mainLoopright3Shots2() {
	console.log("out1");
	if (positionY2 >= h -TerainPath[Math.ceil(positionX2)]){
		PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS2);
			clearInterval(moveLogic2);
			var r=0;
			 var blastcreator2 = setInterval(function(){
				 for(var t = Math.ceil(positionX2)-r; t <= Math.ceil(positionX2)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX2)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator2);
				x2=0;y2=0;time2=0;positionX2=0;positionY2=0;
				blastocc=false;
				}
			},5);
    }

	 time2 += 0.03;


	x2 = vox2 * time2 + randX2;
	y2 = (-((voy2 * time2 )- (0.5 * gravity * (time2 * time2))))+ randY2;
	positionX2 = x2;
	positionY2 = y2;

		var mS2 = new createjs.Shape();	
	mS2.graphics.beginStroke("yellow");
		mS2.graphics.beginFill("yellow"); 
		mS2.graphics.arc(
			positionX2,
			 positionY2,
			 2,
			 0,
			 2*Math.PI,
			 true
			);
		stage.addChild(mS2);
 
		setTimeout(function(){
			stage.removeChild(mS2);
		}, 4);
		if((randX1 - 15) <= positionX2 && positionX2 <= (randX1 + 15) && positionY2 <= (randY1 + 15) && positionY2 >= (randY1 - 15) ) {
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS2);
			clearInterval(moveLogic2);
			var r=0;
			 var blastcreator2 = setInterval(function(){
				 for(var t = Math.ceil(positionX2)-r; t <= Math.ceil(positionX2)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX2)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator2);
				x2=0;y2=0;time2=0;positionX2=0;positionY2=0;
				blastocc=false;
				}
			},5);
		
		}
}


function mainLoopright3Shots3() {
	if (positionY3 >= h -TerainPath[Math.ceil(positionX3)]){

		PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS3);
			clearInterval(moveLogic3);
			var r=0;
			 var blastcreator3 = setInterval(function(){
				 for(var t = Math.ceil(positionX3)-r; t <= Math.ceil(positionX3)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX3)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator3);
				x3=0;y3=0;time3=0;positionX3=0;positionY3=0;
				blastocc=false;
				}
			},5);
	}
	if (positionX3 < 0){
		stage.removeChild(mS3);
      clearInterval(moveLogic3);
      x3=0;y3=0;time3=0;positionX3=0;positionY3=0;
    }
	time3 += 0.03;

	x3 = vox3 * time3 + randX2;
	y3 = (-((voy3 * time3 )- (0.5 * gravity * (time3 * time3))))+ randY2;
	positionX3 = x3;
	positionY3 = y3;

		var mS3 = new createjs.Shape();	
	mS3.graphics.beginStroke("black");
		mS3.graphics.beginFill("black"); 
		mS3.graphics.arc(
			positionX3,
			 positionY3,
			 2,
			 0,
			 2*Math.PI,
			 true
			);
		stage.addChild(mS3);
	 
		setTimeout(function(){
			stage.removeChild(mS3);
		}, 4);
		if((randX1 - 15) <= positionX3 && positionX3 <= (randX1 + 15) && positionY3 <= (randY1 + 15) && positionY3 >= (randY1 - 15) ) {
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS3);
			clearInterval(moveLogic3);
			var r=0;
			 var blastcreator3 = setInterval(function(){
				 for(var t = Math.ceil(positionX3)-r; t <= Math.ceil(positionX3)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX3)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>15){
				clearInterval(blastcreator3);
				x3=0;y3=0;time3=0;positionX3=0;positionY3=0;
				blastocc=false;
				}
			},5); 
		  }
}

	function mainLooprights() {
		console.log("out1");
		if (positionY >= h -TerainPath[Math.ceil(positionX)]){
			PrevTerain=TerainPath;	
			blastocc=true;
			stage.removeChild(mS);
			clearInterval(moveLogic);
			var r=0;
			 var blastcreator = setInterval(function(){
				 for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2)))/10;
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();

				 r++;
				 if(r>10){
				clearInterval(blastcreator);
				x=0;y=0;time=0;positionX=0;positionY=0;
				blastocc=false;
				}
			},50);
		}
		if (positionX < 0){
			stage.removeChild(mS);
      clearInterval(moveLogic);
      x=0;y=0;time=0;positionX=0;positionY=0;
    }
		time += 0.03;
		x = vox * time + randX2;
		y = (-((voy * time )- (0.5 * gravity * (time * time))))+ randY2;
		positionX = x;
		positionY = y;
		var mS = new createjs.Shape();	
		mS.graphics.beginStroke("red");
	    mS.graphics.beginFill("red"); 
	    mS.graphics.arc(
	      positionX,
	       positionY,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS);

	    setTimeout(function(){
		    stage.removeChild(mS);
			}, 4);
			if((randX1 - 5) <= positionX && positionX <= (randX1 + 5) && positionY <= (randY1 + 5) && positionY >= (randY1 - 5) ) {
					
				PrevTerain=TerainPath;	
				blastocc=true;
				stage.removeChild(mS);
				clearInterval(moveLogic);
				var r=0;
				 var blastcreator = setInterval(function(){
					 for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
						 if (TerainPath[t] >6 ){
					TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2)))/10;
						 }
					 }
					TerrainShape.graphics.clear(); 
					TankShape.graphics.clear();
					Tankstickl.graphics.clear();
					Tankstickr.graphics.clear();
				UpdateTerrain();
	
					 r++;
					 if(r>10){
					clearInterval(blastcreator);
					x=0;y=0;time=0;positionX=0;positionY=0;
					blastocc=false;
					}
				},50);
		 }
		 
	}

	


    

  function mainLoopright() {	
		console.log("Working button");	
		if (positionY >= h -TerainPath[Math.ceil(positionX)]){
			PrevTerain=TerainPath;
			blastocc=true;
			stage.removeChild(mS);
			clearInterval(moveLogic);
			var r=0;
			 var blastcreator = setInterval(function(){
			 	for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
					 if (TerainPath[t] >6 ){
				TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2))/8);
					 }
				 }
				TerrainShape.graphics.clear(); 
				TankShape.graphics.clear();
				Tankstickl.graphics.clear();
				Tankstickr.graphics.clear();
			UpdateTerrain();
			 	r++;
			 	if(r>20){
				clearInterval(blastcreator);
				x=0;y=0;time=0;positionX=0;positionY=0;
				blastocc=false;
				}
			},100);	
		}
if (positionX < 0){
stage.removeChild(mS);
clearInterval(moveLogic);
x=0;y=0;time=0;positionX=0;positionY=0;
}
		time += 0.03;
		x = vox * time + randX2;
		y = (-((voy * time )- (0.5 * gravity * (time * time))))+ randY2;
		positionX = x;
		positionY = y;
		var mS = new createjs.Shape();	
		mS.graphics.beginStroke("black");
	    mS.graphics.beginFill("black"); 
	    mS.graphics.arc(
	      positionX,
	       positionY,
	       2,
	       0,
	       2*Math.PI,
	       true
	      );
	    stage.addChild(mS);

	    setTimeout(function(){
		    stage.removeChild(mS);
			}, 4);
			if((randX1 - 15) <= positionX && positionX <= (randX1 + 15) && positionY <= (randY1 + 15) && positionY >= (randY1 - 15)) {
				PrevTerain=TerainPath;
				blastocc=true;
				stage.removeChild(mS);
				clearInterval(moveLogic);
				var r=0;
				 var blastcreator = setInterval(function(){
					 for(var t = Math.ceil(positionX)-r; t <= Math.ceil(positionX)+r;t++){
						 if (TerainPath[t] >6 ){
					TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX)-t,2))/8);
						 }
					 }
					TerrainShape.graphics.clear(); 
					TankShape.graphics.clear();
					Tankstickl.graphics.clear();
					Tankstickr.graphics.clear();
				UpdateTerrain();
					 r++;
					 if(r>20){
					clearInterval(blastcreator);
					x=0;y=0;time=0;positionX=0;positionY=0;
					blastocc=false;
					}
				},100);	
		 }
	

			
	}
function mainLooprightg(){

		time += 0.03;
		x = vox * time + randX2;
		y =(-voy) * time + randY2;
		positionX = x;
		positionY = y;
		var mS = new createjs.Shape();	
		mS.graphics.beginStroke("skyblue");
			mS.graphics.beginFill("skyblue");
			mS.graphics.moveTo(positionX - 5*Math.sin(rad),positionY + 5*Math.cos(rad));
			mS.graphics.lineTo(positionX - 10*Math.cos(rad),positionY - 10*Math.sin(rad));
			mS.graphics.lineTo(positionX + 5*Math.sin(rad),positionY - 5*Math.cos(rad));
			mS.graphics.lineTo(positionX - 5*Math.cos(rad),positionY - 5*Math.sin(rad));
			mS.graphics.lineTo(positionX - 5*Math.sin(rad),positionY + 5*Math.cos(rad));
	    stage.addChild(mS);

	    setTimeout(function(){
		    stage.removeChild(mS);
			}, 4);
			if((randX1 - 15) <= positionX && positionX <= (randX1 + 15) && positionY <= (randY1 + 15) && positionY >= (randY1 - 15) ) {
					
				PrevTerain=TerainPath;	
				blastocc=true;
				stage.removeChild(mS);
				clearInterval(moveLogic);
				var r=0;
				 var blastcreator = setInterval(function(){
					 for(var t = Math.ceil(positionX-15)-r; t <= Math.ceil(positionX-15)+r;t++){
						 if (TerainPath[t] >6 ){
					TerainPath[t]=PrevTerain[t] -( Math.sqrt(Math.pow(r,2)*2-Math.pow(Math.ceil(positionX-15)-t,2)))/10;
						 }
					 }
					TerrainShape.graphics.clear(); 
					TankShape.graphics.clear();
					Tankstickl.graphics.clear();
					Tankstickr.graphics.clear();
				UpdateTerrain();
	
					 r++;
					 if(r>20){
					clearInterval(blastcreator);
					x=0;y=0;time=0;positionX=0;positionY=0;
					blastocc=false;
					}
				},5);	
		 }
		 if (positionX <=0 || positionY >= 500 || positionY <=0){
			stage.removeChild(mS);
			clearInterval(moveLogic);
			x=0;y=0;time=0;positionX=0;positionY=0;
			
    }
}
function DrawBaseleft(x,y){
	//Tankstick.graphics.clear();
	//TankShape.graphics.clear();
    TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      x,
       y,
       6,
       0,
       2*Math.PI,
       true
			);
		 stage.addChild(TankShape);
		var tankstk =setInterval(function(){
			Tankstickl.graphics.clear();
			Tankstickl.graphics.beginStroke("black");
		 //Tankstick.graphics.lineWidth(5);
			Tankstickl.graphics.moveTo(x,y);
			Tankstickl.graphics.lineTo(x+20*Math.cos(-(launcht1.value * Math.PI / 180)),y+20*Math.sin(-launcht1.value * Math.PI / 180));
		stage.addChild(Tankstickl);
		if (movleft){
			Tankstickl.graphics.clear();
			clearInterval(tankstk);
		}
		if (blastocc){
			//Tankstickl.graphics.clear();
			clearInterval(tankstk);
		}
		},4);
}
function DrawBaseright(x,y){
	//
	//Tankstick.graphics.clear();
    TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      x,
       y,
       6,
       0,
       2*Math.PI,
       true
			);
		stage.addChild(TankShape);
		var tankstk=setInterval(function(){
			Tankstickr.graphics.clear();
			Tankstickr.graphics.beginStroke("black");
			 //Tankstick.lineWidth(5);
			Tankstickr.graphics.moveTo(x,y);
			Tankstickr.graphics.lineTo(x-20*Math.cos(-launcht2.value * Math.PI / 180),y+20*Math.sin(-launcht2.value * Math.PI / 180));
			stage.addChild(Tankstickr);
			if (moveright){
				Tankstickr.graphics.clear();
				clearInterval(tankstk);
			}
			if (blastocc){
				//Tankstickr.graphics.clear();
				clearInterval(tankstk);
			}
		},4);
}




forward1.addEventListener('click',go1,true);
backward1.addEventListener('click',back1,true);
forward2.addEventListener('click',go2,true);
backward2.addEventListener('click',back2,true);

function back1(){
	movleft=true;
	TankShape.graphics.clear();
	//
    randX1=randX1-8;
	randY1=h-TerainPath[randX1];
	//.graphics.clear();
	TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX1,
       randY1,
       6,
       0,
       2*Math.PI,
       true
			);
		setInterval(function(){
			Tankstickl.graphics.clear();
			Tankstickl.graphics.beginStroke("black");
		 //Tankstick.graphics.lineWidth(5);
			Tankstickl.graphics.moveTo(randX1,randY1);
			Tankstickl.graphics.lineTo(randX1+20*Math.cos(-(launcht1.value * Math.PI / 180)),randY1+20*Math.sin(-launcht1.value * Math.PI / 180));
		stage.addChild(Tankstickl);
			
		},4);
		//stage.addChild(Tankstick);
	DrawBaseright(randX2,randY2);
	//TankShape.graphics.updateCache();
    

}
function back2(){
	moveright=true;
	TankShape.graphics.clear();
	TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX2-8,
       h-TerainPath[randX2-8],
       6,
       0,
       2*Math.PI,
       true
      );
    randX2=randX2-8;
	randY2=h-TerainPath[randX2];
		setInterval(function(){
			Tankstickr.graphics.clear();
			Tankstickr.graphics.beginStroke("black");
		 //Tankstick.graphics.lineWidth(5);
			Tankstickr.graphics.moveTo(randX2,randY2);
			Tankstickr.graphics.lineTo(randX2-20*Math.cos(-launcht2.value * Math.PI / 180),randY2+20*Math.sin(-launcht2.value * Math.PI / 180));
		stage.addChild(Tankstick);
			
		},4);
    TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX1,
       h-TerainPath[randX1],
       6,
       0,
       2*Math.PI,
       true
      );
    TankShape.graphics.updateCache();
    

}

function go1(){
	movleft=true;
  TankShape.graphics.clear();
	TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX1+8,
       h-TerainPath[randX1+8],
       6,
       0,
       2*Math.PI,
       true
      );
    randX1=randX1+8;
    randY1=h-TerainPath[randX1];
    TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX2,
       h-TerainPath[randX2],
       6,
       0,
       2*Math.PI,
       true
	  );
		setInterval(function(){
			Tankstickl.graphics.clear();
			Tankstickl.graphics.beginStroke("black");
		 //Tankstick.graphics.lineWidth(5);
			Tankstickl.graphics.moveTo(randX1,randY1);
			Tankstickl.graphics.lineTo(randX1+20*Math.cos(-(launcht1.value * Math.PI / 180)),randY1+20*Math.sin(-launcht1.value * Math.PI / 180));
		stage.addChild(Tankstickl);
			
		},4);
    TankShape.graphics.updateCache();
}
function go2(){
	moveright=true;
  TankShape.graphics.clear();
	TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX2+8,
       h-TerainPath[randX2+8],
       6,
       0,
       2*Math.PI,
       true
      );
    randX2=randX2+8;
	randY2=h-TerainPath[randX2];
		setInterval(function(){
			Tankstickr.graphics.clear();
			Tankstick.graphics.beginStroke("black");
		 //Tankstick.graphics.lineWidth(5);
			Tankstickr.graphics.moveTo(randX2,randY2);
			Tankstickr.graphics.lineTo(randX2-20*Math.cos(-launcht2.value * Math.PI / 180),randY2+20*Math.sin(-launcht2.value * Math.PI / 180));
		stage.addChild(Tankstickr);
			
		},4);
    TankShape.graphics.beginStroke("black");
    TankShape.graphics.beginFill("black"); 
    TankShape.graphics.arc(
      randX1,
       h-TerainPath[randX1],
       6,
       0,
       2*Math.PI,
       true
      );
    TankShape.graphics.updateCache();
}


// launch1Button.addEventListener('click', () => {
//   //descriptionP.innerHTML = launchv1.value;
//   	Plot(launchv1.value, launcht1.value, true);
  
// });






