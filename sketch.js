var feed , addFood;
var fedTime , lastFed , foodObj;
var dog, happyDog, sadDog , sad_dogAnime, dog_anime,happydog_anime;
var  database;
var foodS, foodStock;
function preload(){
  
  dog_anime = loadImage("images/dogImg.png");
  happydog_anime = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database()
	
  createCanvas(500,500);
   
  dog = createSprite(250,300,30,40);
  dog.addImage(dog_anime);
  dog.scale = 0.2;
  
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();
  feed = createButton("Feed The Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  
background(46,139,87)

foodObj.display();

fedTime = database.ref('feedTime');
fedTime.on("value", function(data){
  lastFed = data.val();
})


  drawSprites();
  
  fill("red");
  textSize(20);
if(lastFed >= 12){
  text("Last feed : "+ lastFed % 12 + " pm", 350,30);
}
else if(lastFeed === 0){
  text("Last feed : 12 am", 350,30);
}
else{
  text("Last feed : "+ lastFed + " am", 350,30);
}
}

function readStock(data){
  foodS = data.val();
}

function feedDog(){
  //dog.addImage(happyDog);
  if(foodObj.getFoodStock()<=0){
    foodObj.updateStock(foodObj.getFoodStock() * 0);
  }
  else{
    foodObj.updateStock(foodObj.getFoodStock() - 1);
  }
  database.ref('/').update({
    food: foodObj.getFoodStock(),
    feedTime : hour()
  })
}

function addFoods(){
  foodS++ ;
  database.ref('/').update({
    food : foodS
  })
}
