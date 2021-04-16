var canv = document.getElementById("canvas0");
var ctx = canv.getContext("2d");
var objects = [];
var colors = [];
var metrix_count = [1, 1, 1, 1, 1];
var metr_circl_width = 5;
var border_width = 1;


canv.width = 1000;
canv.height = 700;

ctx.fillStyle = "#FFAFFF";
ctx.fillRect(0, 0, canv.width, canv.height);

function object_add (e)
{
    let already_included = false;

    for (let i = 0; i < objects.length; i++)
    {
        if (objects[i].x == e.offsetX && objects[i].y == e.offsetY)
        {
            already_included = true;
        }
    }

    if (!already_included)
    {
        objects.push({x:e.offsetX, y:e.offsetY, metrix: [1, 1, 1, 1, 1]});
        refill_object (objects.length-1);
    }

    
}

function color_regenerate ()
{
    colors = [];
    for (let i = 0; i < metrix_count.length; i++)
    {
        colors.push([]);

        for (let j = 0; j <  metrix_count[i]; j++)
        {
            colors[i].push(randColor());
        }
    }
}

function randColor() 
{
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}

function refill_objects ()
{
    for (let i = 0; i < objects.length; i++)
    {
        if (objects[i].metrix[0] == 0)
        {
            ctx.beginPath();
            ctx.fillStyle = "Black";
            ctx.arc(objects[i].x, objects[i].y, metr_circl_width*2 + border_width, 0, 2*Math.PI, false);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = "Red";
            ctx.arc(objects[i].x, objects[i].y, metr_circl_width*2, 0, 2*Math.PI, false);
            ctx.fill();
        }
        else
        {
            for (let j = objects[i].metrix.length - 1; j >= 0; j--)
            {
                ctx.beginPath();
                ctx.fillStyle = "Black";
                ctx.arc(objects[i].x, objects[i].y, metr_circl_width*(3 + j) + border_width, 0, 2*Math.PI, false);
                ctx.fill();

                ctx.beginPath();
                ctx.fillStyle = colors[j][objects[i].metrix[j] - 1];
                ctx.arc(objects[i].x, objects[i].y, metr_circl_width*(3 + j) + border_width, 0, 2*Math.PI, false);
                ctx.fill();
            }
        }
    }
    
    
}

function refill_object (i)
{
    if (objects[0].metrix[0] == 0)
    {
        
        ctx.beginPath();
        ctx.fillStyle = "Black";
        ctx.arc(objects[i].x, objects[i].y, metr_circl_width*2 + border_width, 0, 2*Math.PI, false);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = "Red";
        ctx.arc(objects[i].x, objects[i].y, metr_circl_width*2, 0, 2*Math.PI, false);
        ctx.fill();
        
    }
    else
    {
        for (let j = objects[i].metrix.length - 1; j >= 0; j--)
        {
            ctx.beginPath();
            ctx.fillStyle = "Black";
            ctx.arc(objects[i].x, objects[i].y, metr_circl_width*(3 + j) + border_width, 0, 2*Math.PI, false);
            ctx.fill();

            ctx.beginPath();
            ctx.fillStyle = colors[j][objects[i].metrix[j] - 1];
            ctx.arc(objects[i].x, objects[i].y, metr_circl_width*(3 + j) + border_width, 0, 2*Math.PI, false);
            ctx.fill();
        }

        ctx.beginPath();
        ctx.fillStyle = "Black";
        ctx.arc(objects[i].x, objects[i].y, metr_circl_width*2 + border_width, 0, 2*Math.PI, false);
        ctx.fill();
        
        ctx.beginPath();
        ctx.fillStyle = "Red";
        ctx.arc(objects[i].x, objects[i].y, metr_circl_width*2, 0, 2*Math.PI, false);
        ctx.fill();
    }
}

color_regenerate();

canv.addEventListener("click", object_add);
