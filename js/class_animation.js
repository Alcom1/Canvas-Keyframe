var Animation = function(text)
{
    var anim = JSON.parse(text);
    this.active = true;
    this.image = document.getElementById(anim.image_id);
    this.length = anim.length;
    this.frames = anim.frames;
    this.time = 0;
}

Animation.prototype.update = function(dt)
{
    this.time += dt;
}

Animation.prototype.draw = function(ctx)
{
    ctx.save();
    var temp = (this.time * 1000) % this.length;
    for(var i = 0; i < this.frames.length - 1; i++)
    {
        if(temp > this.frames[i].time && temp < this.frames[i + 1].time)
        {
            ctx.translate(
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].globe_tran[0], 
                    this.frames[i + 1].globe_tran[0]),
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].globe_tran[1], 
                    this.frames[i + 1].globe_tran[1]));
            ctx.scale(
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].globe_scal[0], 
                    this.frames[i + 1].globe_scal[0]),
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].globe_scal[1], 
                    this.frames[i + 1].globe_scal[1]));
            ctx.rotate(
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].globe_rota * Math.PI / 180, 
                    this.frames[i + 1].globe_rota * Math.PI / 180));
            ctx.scale(
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].local_scal[0], 
                    this.frames[i + 1].local_scal[0]),
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].local_scal[1], 
                    this.frames[i + 1].local_scal[1]));
            ctx.translate(
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].local_tran[0], 
                    this.frames[i + 1].local_tran[0]),
                map(
                    temp, 
                    this.frames[i].time, 
                    this.frames[i + 1].time, 
                    this.frames[i].local_tran[1], 
                    this.frames[i + 1].local_tran[1]));
            break;           
        }
    }
    ctx.drawImage(
        this.image,
        0,
        0);
    ctx.restore();
}