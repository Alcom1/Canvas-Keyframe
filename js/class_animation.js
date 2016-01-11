var Animation = function(fileName)
{
    this.active = false;
    
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.onload = this.meep(xhr);
    xhr.open('GET', fileName, true);
    xhr.send();    
}

Animation.prototype.meep = function(xhr)
{
    var anim = JSON.parse(xhr.responseText);
    this.image = document.getElementById(anim.image_id);
    this.length = anim.length;
    this.frames = anim.frames;
    this.time = 0;
    this.active = true;
}

Animation.prototype.update = function(dt)
{
    this.time += dt;
}

Animation.prototype.draw = function(ctx)
{

}