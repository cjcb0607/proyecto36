var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
//crea aquí las variables feed y lastFed 
var feed;
var timef,lastFed;
var ora



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database= firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  feed=createButton("Alimentar al Perro");
  feed.position(750,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  lastFed=database.ref('FeedTime');
  lastFed.on("value",readTime);
  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
  function readTime(data){
    timef=data.val();
    ora.getFedTime(timef);

  }
  //escribe el código para mostrar el texto lastFed time aquí
  if(lastFed>=12){
    text("ultima hora en la que se alimento:"+ ora +"PM",350,30);
  }else if(lastFed==0){
    text("ultima hora en la que se alimento:"+ ora +"AM",350,30);
  }

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}



function feedDog(){
  dog.addImage(happyDog);
  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  var food_stock_val=foodObj.getFoodStock();
 if(food_stock_val<=0){
   foodObj.updateFoodStock(food_stock_val *0);
   ora.getFedTime();
 } else{
   foodObj.updateFoodStock(food_stock_val-1);
   ora.getFedTime();
 }
 
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




