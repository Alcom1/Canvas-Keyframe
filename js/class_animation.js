var Animation = function(text)
{
    var anim = JSON.parse(text);
    this.active = true;
    this.image = document.getElementById(anim.image_id);
    this.length = anim.length;
    this.globeTran = anim.globe_tran;
    this.localRota = anim.local_rota;
    this.localScal = anim.local_scal;
    this.localTran = anim.local_tran;
    this.time = 0;
}

Animation.prototype.update = function(dt)
{
    this.time += dt;
}

Animation.prototype.draw = function(ctx)
{
    ctx.save();
    var step = (this.time * 1000) % this.length;
    
    this.transform(ctx, step, this.globeTran, 0);
    this.transform(ctx, step, this.localRota, 2);
    this.transform(ctx, step, this.localScal, 1);
    this.transform(ctx, step, this.localTran, 0);
    
    ctx.drawImage(
        this.image,
        0,
        0);
    ctx.restore();
}

Animation.prototype.transform = function(ctx, step, form, type)
{
    for(var i = 0; i < form.length - 1; i++)
    {
        if(step > form[i].time && step < form[i + 1].time)
        {
            switch(type)
            {
                case 0:
                    ctx.translate(
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[0], 
                            form[i + 1].move[0]),
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[1], 
                            form[i + 1].move[1]));
                    break;
                case 1:
                    ctx.scale(
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[0], 
                            form[i + 1].move[0]),
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move[1], 
                            form[i + 1].move[1]));
                    break;
                case 2:
                    ctx.rotate(
                        map(
                            step, 
                            form[i].time, 
                            form[i + 1].time, 
                            form[i].move * Math.PI / 180, 
                            form[i + 1].move * Math.PI / 180));
                    break;
            }
        }
    }    
}