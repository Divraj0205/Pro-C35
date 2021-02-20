class food{
    constructor(foodStock,lastFed){
        this.foodStock=foodStock;
        this.lastFed=lastFed;
        this.image=loadImage("Milk.png");
    }
    getFoodStock(){
        Foodref=databse.ref('Food');
        Foodref.on('value',function (x){
            Foood=x.val();
        });
    }
    updateFoodStock(x){

        if(x<=0){
          x=0;
        }else{
          x=x-1;
        }
        database.ref('/').update({Food:x})
      }
      display(){
          

          imageMode(CENTER);
          image(this.image,720,420,70,70);
          if(this.foodStock!=0){
            for(var i=60; i<=330;i=i+30){
              if(i%10==0){
                image(this.image,i,140,50,50);
              }
              for(var k=60; k<=330;k=k+30){
                if(i%10==0){
                  image(this.image,i,200,50,50);
                }
              
            }
            
          }

      }
    
    }
  }