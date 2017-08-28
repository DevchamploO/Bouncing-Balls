window.onload = function(){
  
  // Global variables
  var ctx;
  var gravity = 4;
  var forceFactor = 0.3;
  var mouseDown = false;
  var balls = [];
  var mousePos = [];
  
  // Event handler
  function onMouseDown(event){
    mouseDown = true;
    mousePos['downX'] = event.pageX;
    mousePos['downY'] = event.pageY;
  }
  
  function onMouseUp(event){
    mouseDown = false;
    //create a ball
    balls.push(new ball(mousePos['downX'], 
                        mousePos['downY'], 
                        (event.pageX - mousePos['downX']) * forceFactor, 
                        (event.pageY - mousePos['downY']) * forceFactor, 
                        5+(Math.random()*10), 0.9, randomColor()));
    
  }
  
  function onMouseMove(event){
    mousePos['currentX'] = event.pageX;
    mousePos['currentY'] = event.pageY;
  }
  
  function resizeWindow(event){
    canvas.height = $(window).height();
    canvas.width = $(window).width();
  }
  
  $(document).mousedown(onMouseDown);
  $(document).mouseup(onMouseUp);
  $(document).mousemove(onMouseMove);
  $(window).bind('resize', resizeWindow);
  
  // Graphics
  function circle(x, y, r, c){
    // Draw a circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = c;
    ctx.fill();
    ctx.lineWidth = r * 0.1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
  }
  
  function randomColor(){
    var letter = '0123456789ABCDEF'.split('');
    var color = '#';
    for(var x=0; x<6; x++){
      color += letter[Math.round(Math.random()*15)];
    }
    return color;
  }
  
  function arrow(fromx, fromy, tox, toy, c){
    var headLen = 10;
    var angle = Math.atan2(toy - fromy, tox - fromx);
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headLen*Math.cos(angle-Math.PI/6),toy-headLen*Math.sin(angle-Math.PI/6));
    ctx.moveTo(tox,toy);
    ctx.lineTo(tox-headLen*Math.cos(angle+Math.PI/6),toy-headLen*Math.sin(angle+Math.PI/6));
    ctx.lineWidth = 1;
    ctx.strokeStyle = c;
    ctx.lineCap = 'butt';
    ctx.stroke();
  }
  
  function drawBall(){
    this.vy += gravity*0.1; // v = a * t
    this.x += this.vx * 0.1; // s = v * t
    this.y += this.vy * 0.1;
    if(this.x + this.r > canvas.width){
      this.x = canvas.width - this.r;
      this.vx *= -1 * this.b; 
    }
    
    if(this.x - this.r < 0){
      this.x = this.r;
      this.vx *= -1 * this.b;
    }
    
    if(this.y + this.r > canvas.height){
      this.y = canvas.height - this.r;
      this.vy *= -1 * this.b;
    }
    
    if(this.y - this.r < 0){
      this.y = this.r;
      this.vy *= -1 * this.b;
    }
    circle(this.x, this.y, this.r, this.c);
  }
  
  // Object
  function ball(positionX, positionY, velosityX, velosityY, radius, bounce, color){
    this.x = positionX;
    this.y = positionY;
    this.vx = velosityX;
    this.vy = velosityY;
    this.r = radius;
    this.b = bounce;
    this.c = color;
    this.draw = drawBall;
  }
  
  //Loop
  function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if(mouseDown === true){
      // Draw the arrow
      arrow(mousePos['downX'], mousePos['downY'], mousePos['currentX'], mousePos['currentY'], 'red');
    }
    for(var i=0; i<balls.length; i++){
      balls[i].draw();
    }
    ctx.fillStyle = '#000000';
    ctx.font = '15px Ariel';
    ctx.fillText('Balls: ' + balls.length, 10, canvas.height-10);
  }
  
  // Begin loop
  function init(){
    ctx = $('#canvas')[0].getContext('2d');
    canvas.height = $(window).height();
    canvas.width = $(window).width();
    return setInterval(loop, 10);
  }
  
  init();
}