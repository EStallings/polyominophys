var canvas = document.getElementById("canvas");
var gfx = canvas.getContext("2d");
var ww = canvas.width;
var wh = canvas.height;
var tick,elapsed;

var SIZE = 20;
var SCALE = 3;
var BOX_SIZE = 16;
var ANGLE_TOLERANCE = Math.PI * 0.06;
var LOCATION_TOLERANCE = 0.15;
var PIXEL = 1.0 / (BOX_SIZE * SCALE);

function Box(order){
  this.body = null;
  this.color = null;
  this.gridAligned = false; //boolean
  this.order = order;
  this.id = Box.id++;
  this.emptyNeighborCount = 4;
  
  this.neighbors = [null,null,null,null];
  
  this.killBody = function(){
    myWorld.DestroyBody(this.body);
  }
  
  this.render = function(){
    var x = body.GetPosition.x;
    var y = body.GetPosition.y;
    var a = body.GetAngle;
    fillrgb(.8,0,0);
    fillSquare(x, y, a);
  }
  
  this.mergeBlock = function(block, dir) { //dir is 0,1,2,3 for n,s,w,e
  
  
  }
}
Box.id = 0;

var blockBodyDef = new b2BodyDef();
var blockShape   = new b2PolygonShape();
var blockFixtureDef = new b2FixtureDef();
blockShape.setAsBox(0.5, 0.5);
blockBodyDef.type = b2_dynamicBody;
blockBodyDef.linearDamping = 3.5;
blockBodyDef.angularDamping = 5;

blockFixtureDef.shape = blockShape;
blockFixtureDef.friction = 0.3;
blockFixtureDef.density = 1;

var object_list = [];

var playerBody = new Box(0);
playerBody.body.SetTransform(new b2Vec2(SIZE/2, SIZE/2), 0);
object_list.push(playerBody);


var worldAABB = new b2AABB();
worldAABB.minVertex.Set(-PIXEL, -PIXEL);
worldAABB.maxVertex.Set(SIZE+PIXEL, SIZE+PIXEL);
var gravity = new b2Vec2(0, 0);
var doSleep = true;
var myWorld = new b2World(worldAABB, gravity, doSleep); 

var grid = []
for(var i=0; i<SIZE; i++) {
  grid[i] = [];
  for(var j=0; j<SIZE; j++){
    grid[i][j] = null;
  }
}




function rfloat(x){return Math.random()*x;}
function rInt(x){return Math.floor(Math.random()*x);}

//==  MISC RENDERING  ========================================================//

function fillrgb(r,g,b){gfx.fillStyle="rgb("+Math.floor(255*r)+","+Math.floor(255*g)+","+Math.floor(255*b)+")";}

function linergb(r,g,b){gfx.strokeStyle="rgb("+Math.floor(255*r)+","+Math.floor(255*g)+","+Math.floor(255*b)+")";}


function hsv(h,s,v){
  var r,g,b,i,f,p,q,t;
  if (h&&s===undefined&&v===undefined)s=h.s,v=h.v,h=h.h;
  i = Math.floor(h*6);
  f = h*6-i;
  p = v*(1-s);
  q = v*(1-f*s);
  t = v*(1-(1-f)*s);
  switch(i%6){
  case 0:r=v,g=t,b=p;break;
  case 1:r=q,g=v,b=p;break;
  case 2:r=p,g=v,b=t;break;
  case 3:r=p,g=q,b=v;break;
  case 4:r=t,g=p,b=v;break;
  case 5:r=v,g=p,b=q;break;
  } gfx.fillStyle="rgb("+Math.floor(255*r)+","+Math.floor(255*g)+","+Math.floor(255*b)+")";
}

function fillSquare(x,y,r){
  gfx.save();
  gfx.beginPath();
  gfx.translate(x,y);
  gfx.rotate(r);
  gfx.moveTo(-0.5,-0.5);
  gfx.lineTo(-0.5, 0.5);
  gfx.lineTo( 0.5, 0.5);
  gfx.lineTo( 0.5,-0.5);
  gfx.fill();
  gfx.restore();
}

function strokeSquare(x, y, r){
  gfx.save();
  gfx.beginPath();
  gfx.translate(x,y);
  gfx.rotate(r);
  gfx.moveTo(-0.5,-0.5);
  gfx.lineTo(-0.5, 0.5);
  gfx.lineTo( 0.5, 0.5);
  gfx.lineTo( 0.5,-0.5);
  gfx.stroke();
  gfx.restore();
}

//==  MAIN LOOP  =============================================================//

function update(){
  var currentTick = new Date().getTime();
  elapsed = currentTick-tick;
  tick = currentTick;
  gfx.clearRect(0,0,ww,wh);
  gfx.save();
  gfx.scale(BOX_SIZE*SCALE,BOX_SIZE*SCALE);

  hsv(0,1,1);
  renderGrid();
  fillSquare(5,5,(tick*0.001)%(2*Math.PI));

  gfx.restore();
  requestAnimationFrame(update);
}


function renderGrid(){
  var i = 0 ; var j = 0;
  linergb(0,0,0);
  gfx.lineWidth = PIXEL;
  for(var i = 0; i < SIZE; i++){
    for(var j = 0; j < SIZE; j++){

      strokeSquare(i, j, 0);
    }
  }
}

//==  CONTROLS HANDLING  =====================================================//

function getMousePos(evt){
  var rect = canvas.getBoundingClientRect();
  return{x:evt.clientX-rect.left,y:evt.clientY-rect.top};
}

canvas.addEventListener("mousedown",function(e){
  mouse = getMousePos(e);
});

canvas.addEventListener("mousemove",function(e){
  mouse = getMousePos(e);
});

canvas.addEventListener("mouseup",function(e){
  mouse = getMousePos(e);
});

canvas.onselectstart = function(){return false;};

//==  PROGRAM ENTRY  =========================================================//

(function main(){
  
  
  
  
  tick=new Date().getTime();update();
})();
