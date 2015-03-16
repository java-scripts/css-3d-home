(function(){
	angular.module('myapp',[])
	.controller('MainController',['$scope',function(s){
		s.freeman=true;
		s.l = {r: {x: 0,y: 0,s:0.3},t: {x: -140,y: 0,z: -550,s:10}};
		var c = document.documentElement.style;
		s.prefix=void 0 !== c.WebkitTransform && "-webkit-" || void 0 !== c.MozTransform && "-moz-" || void 0 !== c.transform && "";
		var a;
		s.updateR=function(b){	
			 !b.altKey && a && (s.l.r.x -= (b.pageY - a.y)*s.l.r.s, s.l.r.y += (b.pageX - a.x)*s.l.r.s, s.l.r.x = Math.max(Math.min(s.l.r.x, 90), -90));
		  a = {
			x: b.pageX,
			y: b.pageY,
		  };	
			
		  updateFP(s.l.t.x,s.l.t.z,s.l.r.y);
		};	
		s.keyDown=function(c){		
			  var f = "keydown" == c.type;
			  switch (c.keyCode) {
				case 87: //up 
				  x=s.l.t.x-s.l.t.s * cos(s.l.r.y - 90);
				  z=s.l.t.z-s.l.t.s * sin(s.l.r.y - 90);
				  	  
				  break;
				case 83: //down              
				  x = s.l.t.x+s.l.t.s * cos(s.l.r.y - 90);
				  z = s.l.t.z+s.l.t.s * sin(s.l.r.y - 90);
				  break;
				case 65: //left              
				  x = s.l.t.x+s.l.t.s * cos(s.l.r.y);
				  z = s.l.t.z+s.l.t.s * sin(s.l.r.y);
				  break;
				case 68: //right               
				  x = s.l.t.x+s.l.t.s * cos(s.l.r.y - 180);
				  z = s.l.t.z+s.l.t.s * sin(s.l.r.y - 180);
				  break;
				case 32: //jumb
				  //			 		  
			  }
			  
			 y = getY(x,z);
			 if(s.freeman){
					s.l.t.x = x;
					s.l.t.z = z;
			 }else if(y<100){
					s.l.t.x = x;
					s.l.t.z = z;
					s.l.t.y = y;
			 }		
			 updateFP(s.l.t.x,s.l.t.z,s.l.r.y);
			  
		};
	}]);
	
	
	var map = function(o){
		return {x:parseInt(-o.x/10+canvas.width/2),z:parseInt(canvas.height/2-o.z/10)}
	};
	
	var cos = function(deg){
		return Math.cos(rad(deg));
	};
	var sin = function(deg){
		return Math.sin(rad(deg));
	};
	var rad=function(deg){
		return deg*Math.PI/180;
	};
	var getk=function(x,y,width){
		return 4*(y*width+x);
	};
	var copyImageData=function(settings){
			var dst = settings.ctx.createImageData(settings.src.width, settings.src.height);
			dst.data.set(settings.src.data);
			return dst;
	};
	
	window.onload = function(){
		var img = new Image();
		img.src= './img/surfacemap.png';
		canvas = document.getElementById('canvas');
		ctx = canvas.getContext('2d');
		ctx.globalAlpha=0.5;
		img.onload = function(){
			ctx.drawImage(img,0,0);		
			src = ctx.getImageData(0,0, canvas.width,canvas.height);		
		}
	};
	
	function getY(x,z){
		m=map({x:x,z:z});
		i=getk(m.x,m.z,canvas.width);	
		return (src.data[i]-200)*3;
	}
	
	function updateFP(x,z,th){	
		m=map({x:x,z:z});
		l=10;
		x2 = m.x+l*cos(th-90);
		z2 = m.z+l*sin(th-90);		
		i=getk(m.x,m.z,canvas.width);			
		ctx.putImageData(src,0,0);
		ctx.fillStyle='#afa';
		ctx.beginPath();
		ctx.arc(m.x,m.z,10,0,Math.PI*2,true);
		ctx.strokeStyle="#000";
		ctx.moveTo(m.x,m.z);
		ctx.lineTo(x2,z2);
		ctx.closePath();		
		ctx.fill();
		ctx.stroke();
	}
	
	
}());

