// se crean las variables 
var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var timef,lastFed;
var hora



function preload(){
  //se precargan las imagenes 
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  // llamamos a la base de datos de firebase
  database= firebase.database();
  //canvas 
  createCanvas(1000,400);
  // creamos un sprite de comida con los parametros de la clase Food 
  foodObj = new Food();

 //leemos food en la base de datos y nos referimos a el como "foodstock", ocupamos la funcion readstock
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  // creamos el sprite de dog, le agregamos la imagen y lo reducimos a escala 
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  // boton Alimentar al perro y si se preciona funcion "feedog"
  feed=createButton("Alimentar al Perro");
  feed.position(750,95);
  feed.mousePressed(feedDog);

  // boton agregar alimento y si se preciona funcion "addfoods"
  addFood=createButton("Agregar Alimento");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  //  fondo 
  background(46,139,87);
  // se muestra el sprite foodobj
  foodObj.display();
  

  //bri: aquí llamamos la base de datos en la variable de hora que creaste 
  // leemos feedtime en la base de datos y nos referimos a el como "hora", ocupamos la funcion readtime
  hora=database.ref('FeedTime');
  hora.on("value",readTime);
  
  //código para mostrar el texto lastFed 
  fill("white")
  if(lastFed>=12){
    text("ultima hora en la que se alimento:"+ lastFed%12 +"PM",300,30);
  }else if(lastFed==0){
    text("ultima hora en la que se alimento:"+ lastFed +"AM",300,30);
  }

 
  drawSprites();
}

//bri: esta funcion va afuera como función a parte o dentro mismo de la linea 48 en lugar de "readTime"
// se crea la funcion readtime, que lee el valor de lastfed
function readTime(data){
  lastFed=data.val();

}

//se crea la funcion readstock, lee el valor de foods y actualiza el valor 
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


// se crea la funcion feeddog, cambia la imagen del perro, baja la comida, se llama a la base de datos y actualiza foodstock y feedtime  
function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val<=0){
   foodObj.updateFoodStock(food_stock_val *0);
  } else{
   foodObj.updateFoodStock(food_stock_val-1);
    }
 // bri: aquí también se llama a la base de datos: :)
  database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime:hour()
  })
 }

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}




