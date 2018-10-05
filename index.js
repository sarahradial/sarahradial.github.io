var canvas = document.getElementbyID('main');
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(0, 0, 200, 0.5)';
  ctx.fillRect(125, 125, 100, 100);
  ctx.clearRect(145, 145, 60, 60);
  ctx.strokeRect(150, 150, 50, 50);
  ctx.save();
}
(function(){
    var htmlCanvas = document.getElementbyID('c'),
        context = htmlCanvas.getContext('2d');
    initalize();

    function initialize(){
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    }
    function redraw(){
      cotext.strokeStyle = 'grey';
      context.lineWidth = '2';
      context.strokeRect(0,0,window.innerWidth, window.innerHeight);
    }
    function resizeCanvas(){
      htmlCanvas.width = window.innerWidth;
      htmlCanvas.height =window.innerHeight;
      redraw();
    }
})();
