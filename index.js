var canvas = document.getElementbyID('main');
if (canvas.getContext){
  var ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgb(0, 0, 200, 0.5)';
  ctx.fillRect(125, 125, 100, 100);
  ctx.clearRect(145, 145, 60, 60);
  ctx.strokeRect(150, 150, 50, 50);
  ctx.save();
}
