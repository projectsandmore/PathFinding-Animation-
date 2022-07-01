class CanvasGUI {

    constructor(){
        this.w = window.screen.width;
        this.h=window.screen.height;
        this.canvas = document.getElementById('my_Canvas');
        this.menu = document.getElementById("menu");

        this.PrimaryButton = false;

        this.canvas.width = this.w;
        this.canvas.height = this.h;
        this.realPos = this.canvas.getBoundingClientRect();

        this.context = this.canvas.getContext('2d');


        this.rect = 35;
        this.startx = 10;
        this.starty = 7;
        this.points = [[25,12]];


        this.buttons = [["BFS",20,this.h+this.realPos.top+30,100,30]]
    }


    setPosition(x,y){
        this.startx = x;
        this.starty = y;
    }


    Draw(accessible, points, blocks){
        for(var i=0; i< this.h/this.rect; i++){

            for(var j=0; j< (this.w/this.rect)-1; j++){
                this.context.fillStyle = "rgb(255,0,0)";
                this.context.fillRect(j*this.rect, i*this.rect, this.rect, this.rect);
                this.context.fillStyle = "rgb(0,0,0)";
                this.context.fillRect(j*this.rect+1, i*this.rect+1,this.rect-2,this.rect-2);

                for(var x=0; x<accessible.length; x++){

                    if(j == accessible[x][0] && i == accessible[x][1]){
                        this.context.fillStyle = "rgb(255,0,0)";
                        this.context.fillRect(j*this.rect, i*this.rect, this.rect, this.rect);
                        this.context.fillStyle = "rgb(150,200,0)";
                        this.context.fillRect(j*this.rect+1, i*this.rect+1,this.rect-2,this.rect-2);
                    }
                }
                for(var x=0; x<points.length; x++){

                    if(j == points[x][0] && i == points[x][1]){
                        this.context.fillStyle = "rgb(255,0,0)";
                        this.context.fillRect(j*this.rect, i*this.rect, this.rect, this.rect);
                        this.context.fillStyle = "rgb(150,0,0)";
                        this.context.fillRect(j*this.rect+1, i*this.rect+1,this.rect-2,this.rect-2);
                    }
                }

                for(var x=0; x<blocks.length; x++){

                    if(j == blocks[x][0] && i == blocks[x][1]){
                        this.context.fillStyle = "rgb(255,0,0)";
                        this.context.fillRect(j*this.rect, i*this.rect, this.rect, this.rect);
                        this.context.fillStyle = "rgb(40,30,0)";
                        this.context.fillRect(j*this.rect+1, i*this.rect+1,this.rect-2,this.rect-2);
                    }
                }



                if(j == this.startx && i == this.starty)
                {
                    this.context.fillStyle = "rgb(255,0,0)";
                    this.context.fillRect(j*this.rect, i*this.rect, this.rect, this.rect);
                    this.context.fillStyle = "rgb(150,100,0)";
                    this.context.fillRect(j*this.rect+1, i*this.rect+1,this.rect-2,this.rect-2);

                }
            }
        }



    }

    initializeXY(){
        var xy = [];
        for(var i=0; i< this.h/this.rect; i++){
            let width = [];
            for(var j=0; j< this.w/this.rect; j++){
                width[j] = 1;
            }
            xy[i] = width;
        }
        return(xy);
    }




}
export default CanvasGUI;