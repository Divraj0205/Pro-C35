//Create variables here
var dog, normDog,happyDog, database,foodS, foodStock;
var foodObj;
var fooda;
var fedTime,lastFed

function preload()
{
  //load images here
  normDog=loadImage("dogImg.png");
  happyDog=loadImage("dogImg1.png")
}

function setup() {
  createCanvas(1000, 600);
  database=firebase.database();
  dog=createSprite(870,400,30,30);
  dog.addImage(normDog);
  dog.scale=0.3;
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('LastFed');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  //foodObj=food;
  fooda=new food(12,34);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add the food");
  addFood.position(800,95);
  addFood.mousePressed(addthefood)
}


function draw() {  
  background(49,139,87);
  drawSprites();
  //add styles here
  fill("white");
  textSize(20);
  stroke("black");
  strokeWeight(4);
  text("Food Stock: "+foodS, 170,100);

  fooda.display();

  
  sendTime();

}
function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({Food:x})
}

function feedDog(){
  dog.addImage(happyDog);

  foodS=foodS-1;
  foodStock.updateFoodStock(getFoodStock(foodStock)-1);
  database.ref('/').update({
    Food:foodStock.getFoodStock(),
    FeedTime:hour()
  })
}

function addthefood(){
  if(foodS<20){
  foodS++;
  }
  database.ref('/').update({Food:foodS})
}

function makingTime(){
  var x=random(1,24);
  Math.round(x);
  database.ref('/').update({lastFed:x})
}

function sendTime(){
  fill(255,255,254);
  textSize(15);
  makingTime();
  if(lastFed>=12){
    text("Last Fed :"+ lastFed%12+" PM",350,30);
  }else if(lastFed==0){
    text("Last Fed : 12 AM",350,30);
  }else{
    text("Last Fed :"+ lastFed+" AM",350,30);
  }
}

