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
    anim : undefined,           // Animation JSON object
    counter : 0,                // Time counter.
	
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
        
        //Style
        this.ctx.strokeStyle = "#FFF";
        this.ctx.lineWidth = 4;
        
        //JASON!
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
		xhr.onload = function()
	    {
            main.anim = JSON.parse(xhr.responseText);
            console.log(main.anim);
            
            // start the game loop
            main.frame();
        }
		xhr.open('GET', "js/animation_2.json", true);
		xhr.send();
	},
	
	//Core update
	frame : function()
	{
		//LOOP
	 	this.animationID = requestAnimationFrame(this.frame.bind(this));
	 	
	 	//Calculate Delta Time of frame
	 	var dt = this.calculateDeltaTime();
        this.counter += dt;
		
		//Clear
		this.ctx.save();
		this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
		this.ctx.restore();
        
        //Draw
        this.ctx.save();
        /*
        this.ctx.translate(320, 240);
        this.ctx.scale(2, 2);
        this.ctx.rotate(45 * Math.PI / 180);
        this.ctx.scale(2, 1);
        this.ctx.translate(-75, - 50);
        */
        var temp = (this.counter * 1000) % this.anim.length;
        for(var i = 0; i < this.anim.frames.length - 1; i++)
        {
            if(temp > this.anim.frames[i].time && temp < this.anim.frames[i + 1].time)
            {
                this.ctx.translate(
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].globe_tran[0], 
                        this.anim.frames[i + 1].globe_tran[0]),
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].globe_tran[1], 
                        this.anim.frames[i + 1].globe_tran[1]));
                this.ctx.scale(
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].globe_scal[0], 
                        this.anim.frames[i + 1].globe_scal[0]),
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].globe_scal[1], 
                        this.anim.frames[i + 1].globe_scal[1]));
                this.ctx.rotate(
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].globe_rota * Math.PI / 180, 
                        this.anim.frames[i + 1].globe_rota * Math.PI / 180));
                this.ctx.scale(
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].local_scal[0], 
                        this.anim.frames[i + 1].local_scal[0]),
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].local_scal[1], 
                        this.anim.frames[i + 1].local_scal[1]));
                this.ctx.translate(
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].local_tran[0], 
                        this.anim.frames[i + 1].local_tran[0]),
                    map(
                        temp, 
                        this.anim.frames[i].time, 
                        this.anim.frames[i + 1].time, 
                        this.anim.frames[i].local_tran[1], 
                        this.anim.frames[i + 1].local_tran[1]));
                break;           
            }
        }
        this.ctx.strokeRect(0, 0, 150, 100);
        this.ctx.strokeRect(75, 50, 1, 1);
        this.ctx.restore();
		
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