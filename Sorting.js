import CanvasGUI from './CanvasGUI.js'

class Sorting{

    constructor(){
        this.CanvasGUI = new CanvasGUI();


        this.xy = this.CanvasGUI.initializeXY(); // Main Board 2D
        this.canvas = this.CanvasGUI.canvas;
        this.accessible = []; // Accessible blocks
        this.foundXYs = []; // Found Points
        this.blocks = []; // Obstacles
        this.points = this.CanvasGUI.points;

        this.h = this.CanvasGUI.h;
        this.w = this.CanvasGUI.w;
        this.rect = this.CanvasGUI.rect;
        this.startx = this.CanvasGUI.startx;
        this.starty = this.CanvasGUI.starty;

        this.PrimaryButton = false;

        this.CanvasGUI.Draw(this.accessible, this.points, this.blocks);



    }

    addBlok(ev){
        var y = ev.clientY
        var x = ev.clientX
        var DrawOff = this.canvas.getBoundingClientRect();

        if(ev.target.id == "my_Canvas" && this.PrimaryButton == true) {

            var Blok = [Math.floor((x-DrawOff.left) / this.rect), Math.floor((y - DrawOff.top) / this.rect)]
            if (this.isIn(this.blocks, Blok) == false) {
                this.blocks.push(Blok);
                this.CanvasGUI.Draw(this.accessible, this.points, this.blocks);
            }

        }

    }

Main(){
    this.addBlok(event)


}



    isIn(array, variable)
    {

        for(var i=0; i< array.length; i++){

            if(array[i][0] == variable[0] && array[i][1] == variable[1]) {
                return true;

            }

        }

        return false;


    }

    arrayDelete(array, variable){
        for(var i = 0; i< array.length; i++){
            if(array[i][0] == variable[0] && array[i][1] == variable[1]){
                array.splice(i,1);
                return(array);
            }
        }
        return(array);

    }

    BFS_ADD(els,que){
        var checkAll = [[-1,0],[1,0],[0,1],[0,-1]]
        var temp;
        for(_move of checkAll) {
            temp = [(els[0]+_move[0]),(els[1]+_move[1])]
            if (isIn(this.accessible, temp) == false && isIn(que, temp) == false) {
                if(temp[0] > 0 && temp[0] < (this.w/this.rect)-1 &&
                    temp[1] < (this.h/this.rect)-1 && temp[1] > 0) {
                    que.push(temp);
                }
            }
        }

        return(que);
    }



    BFS(){
        this.accessible = [];
        this.foundXYs = [];
        var Queue = [];
        Queue.push([this.startx-1,this.starty]);
        Queue.push([this.startx,this.starty-1]);
        Queue.push([this.startx+1,this.starty]);
        Queue.push([this.startx,this.starty+1]);

        while(Queue.length > 0 && this.foundXYs.length < this.points.length)
        {
            var firstEl = Queue.shift();


            if(isIn(this.blocks, firstEl) == false) {
                Queue = BFS_ADD(firstEl,Queue);
                this.ccessible.push(firstEl);
            }
            if(isIn(this.points, firstEl) == true && isIn(this.foundXYs, firstEl) == false)
            {
                this.foundXYs.push(firstEl);
                continue;

            }
        }
        this.CanvasGUI.Draw(this.accessible, this.points, this.blocks);

    }

    A_sort(queue){
        for(var x = 0 ; x < queue.length-1; x++)
        {
            for(var j = x+1; j<queue.length; j++){
                if(queue[j][2] < queue[x][2]){
                    var temp3 = queue[x];
                    queue[x] = queue[j];
                    queue[j] = temp3;
                }
            }


        }
        return(queue);


    }

    A_add(x,y,queue,destine,History){
        var cost,rest,travel;


        var checkAll = [[-1,0],[1,0],[0,1],[0,-1]]
        var tempo2;
        for(_move of checkAll) {
            tempo2 = [(x+_move[0]),(y+_move[1])]
            cost = Math.abs(tempo2[0] - this.startx) + Math.abs(tempo2[1] - this.starty)
            rest = Math.abs(destine[0] - tempo2[0]) + Math.abs(tempo2[1] - destine[1])
            travel = cost + rest;

            tempo2 = [tempo2[0],tempo2[1],travel]
            if (isIn(this.accessible, tempo2) == false && isIn(queue, tempo2) == false && isIn(History, tempo2) == false) {
                if(tempo2[0] > 0 && tempo2[0] < (this.w/this.rect)-1 &&
                    tempo2[1] < (this.h/this.rect)-1 && tempo2[1] > 0) {
                    queue.push(tempo2);
                }
            }
        }

        return(queue)

    }



    SearchA_()
    {
        this.accessible = [];


        var Queue = [];
        var History = [];
        Queue = A_add(this.startx,this.starty,Queue,this.points[0],History);

        Queue = A_sort(Queue);

        while(Queue.length > 0 ){
            var firstel2 = Queue.shift();


            if(isIn(this.blocks, firstel2) == false) {
                Queue = A_add(firstel2[0],firstel2[1],Queue,this.points[0],History);
                Queue = A_sort(Queue);
                this.accessible.push(firstel2)
            }



            if(isIn(this.points,firstel2) == true){
                break;
            }


        }

        this.CanvasGUI.Draw(this.accessible, this.points, this.blocks);




    }



}

export default Sorting;