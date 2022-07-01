import Sorting from './Sorting.js';



var Sorting2 = new Sorting();

document.getElementById("BFS").addEventListener("click",Sorting2.BFS())
document.getElementById("A").addEventListener("click",Sorting2.SearchA_())


document.addEventListener("mousedown",function(){Sorting2.PrimaryButton = true;Sorting2.addBlok(event);})
document.addEventListener("mouseup",function(){Sorting2.PrimaryButton = false})
document.addEventListener("mousemove",function(){Sorting2.addBlok(event)})
