var Animator = (function()
{
    var animations;
    
    function init()
    {
        animations = [];
    }
    
    function loadAnimation(fileName)
    {
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("application/json");
        xhr.onload = function()
        {
            Animator.addAnimation(xhr.responseText);
        }
        xhr.open('GET', fileName, true);
        xhr.send();
    }
    
    function addAnimation(text)
    {
        animations.push(new Animation(text));
    }
    
    function update(dt)
    {
        for(var i = 0; i < animations.length; i++)
        {
            if(animations[i].active)
            {
                animations[i].update(dt);
            }
        }
    }
    
    function draw(ctx)
    {
        for(var i = 0; i < animations.length; i++)
        {
            if(animations[i].active)
            {
                animations[i].draw(ctx);
            }
        }       
    }
    
    return {
        init : init,
        loadAnimation : loadAnimation,
        addAnimation : addAnimation,
        update : update,
        draw : draw,
    }
}());