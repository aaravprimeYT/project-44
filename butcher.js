class Butcher{
    constructor(){
        this.butcher = createSprite(1215,190,10,10);
        this.image = loadImage("images/lumb.png");
    }
    display (){
        this.butcher.addImage(this.image);
        this.butcher.debug = true
    if (this.butcher.isTouching(player)) {
            gameState = "dead";
        }
        this.butcher.scale = 0.1;
        if (this.butcher.x >= player.x) {
            this.butcher.mirrorX(-1);
        }
        else{
            this.butcher.mirrorX(1);
        }
        drawSprites();
    }
    
}