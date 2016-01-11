var Animator = (function()
{
    var animations;
    
    function init()
    {
        animations = [];
    }
    
    function addAnimation(fileName)
    {
        animations.push(new Animation(fileName));
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
        addAnimation : addAnimation,
        update : update,
        draw : draw,
    }
}());