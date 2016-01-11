// main.js
"use strict";

// .main is an object literal that is a property of the app global
// This object literal has its own properties and methods (functions)
var main =
{
    WIDTH : 640, 				// Canvas width
    HEIGHT : 480,				// Canvas height
    canvas : undefined,			// Canvas
    ctx : undefined,			// Canvas context
   	lastTime : 0, 				// used by calculateDeltaTime() 
	animationID : 0,			// ID index of the current frame.
	
    //Initialization
	init : function()
	{
		//Init log
		console.log("app.main.init() called");
		
		// init canvas
		this.canvas = document.querySelector('canvas');
		this.canvas.width = this.WIDTH;
		this.canvas.height = this.HEIGHT;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.mozImageSmoothingEnabled = false;
		this.ctx.msImageSmoothingEnabled = false;
		this.ctx.imageSmoothingEnabled = false;
        
        Animator.loadAnimation("js/animation_2.json");
        
        this.frame();
	},
	
	//Core update
	frame : function()
	{
		//LOOP
	 	this.animationID = requestAnimationFrame(this.frame.bind(this));
	 	
	 	//Calculate Delta Time of frame
	 	var dt = this.calculateDeltaTime();
		
		//Clear
		this.ctx.save();
		this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		this.ctx.restore();
        
        //Update
        Animator.update(dt);
        
        //Draw
        Animator.draw(this.ctx);
		
		//Draw debug info
        this.fillText(
            "dt: " + (1 / dt).toFixed(1),
            this.WIDTH - 120,
            40,
            "20pt Verdana",
            "white",
            false);
	},
	
	//Draw filled text
	fillText : function(string, x, y, css, color, centered)
	{
		this.ctx.save();
		if(centered)
		{
			this.ctx.textAlign = "center";
			this.ctx.textBaseline="middle"; 
		}
		this.ctx.font = css;
		this.ctx.fillStyle = color; 
		this.ctx.fillText(string, x, y);
		this.ctx.restore();
	},
	
	//Calculate delta-time
	calculateDeltaTime : function()
	{
		var now, fps;
		now = (+new Date); 
		fps = 1000 / (now - this.lastTime);
		fps = clamp(fps, 12, 60);
		this.lastTime = now; 
		return 1/fps;
	},
};