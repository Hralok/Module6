




var canv = document.getElementById("canvas0");
var ctx = canv.getContext("2d");
var array;
var start = {x: null, y: null};
var finish = {x: null, y: null};


const side = 840;

canv.width = side;
canv.height = side;

var rect_count = document.getElementById("select");
var rect_size;

var generate_rand_button = document.getElementById("gen_rand_but");
var path_button = document.getElementById("path_finder");

function gen_rand_arr ()
{
    array = [];

    for (let i = 0; i < rect_count.value; i++)
    {
        array.push([]);
        for (let j = 0; j < rect_count.value; j++)
        {
            array[i].push(Math.round(Math.random()));
        }
    }

    array[0][0] = 2;
    start.x = 0;
    start.y = 0;
    array[rect_count.value - 1][rect_count.value - 1] = 3;
    finish.x = rect_count.value - 1;
    finish.y = rect_count.value - 1;
}

async function refill_rect ()
{
    let picture = new Promise(resolve => {
        
        ctx.fillStyle = "White";
        ctx.fillRect(0, 0, side, side)

        rect_size = side/rect_count.value;

        for (let i = 0; i < rect_count.value; i++)
        {
            for (let j = 0; j < rect_count.value; j++)
            {
                if (array[i][j] == 1)
                {
                    ctx.fillStyle = "Black"; //Стена
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
                else if (array[i][j] == 2)
                {
                    ctx.fillStyle = "Yellow"; //Начало
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
                else if (array[i][j] == 3)
                {
                    ctx.fillStyle = "Blue"; //Конец
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
                else if (array[i][j] == 4)
                {
                    ctx.fillStyle = "Red"; //Рассмотренно
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
                else if (array[i][j] == 5)
                {
                    ctx.fillStyle = "Green"; //В очереди
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
                else if (array[i][j] == 6)
                {
                    ctx.fillStyle = "Pink"; //Сейчас рассматривается
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
                else if (array[i][j] == 7)
                {
                    ctx.fillStyle = "Purple"; //Итоговый путь
                    ctx.fillRect(rect_size*i, rect_size*j, rect_size, rect_size);
                }
            }
        }
    });

    let timer = await picture;
}

function elem_change(e)
{
    rect_j = Math.floor(e.offsetY/rect_size);
    rect_i = Math.floor(e.offsetX/rect_size);

    if (document.getElementById("radio0").checked == true)
    {
        if (array[rect_i][rect_j] != 2 && array[rect_i][rect_j] != 3)
        {
            array[rect_i][rect_j] = 2;
            array[start.y][start.x] = 0;
            start.x = rect_j;
            start.y = rect_i;
        }
    }
    else if (document.getElementById("radio1").checked == true)
    {
        if (array[rect_i][rect_j] != 2 && array[rect_i][rect_j] != 3)
        {
            array[rect_i][rect_j] = 3;
            array[finish.y][finish.x] = 0;
            finish.x = rect_j;
            finish.y = rect_i;
        }
    }
    else if (document.getElementById("radio2").checked == true)
    {
        if (array[rect_i][rect_j] != 2 && array[rect_i][rect_j] != 3)
        {
            array[rect_i][rect_j] = 0;
        }
    }
    else if (document.getElementById("radio3").checked == true)
    {
        if (array[rect_i][rect_j] != 2 && array[rect_i][rect_j] != 3)
        {
            array[rect_i][rect_j] = 1;
        }
    }

    refill_rect();
}

function distance_finder (now, next)
{
    let len;
    len = now.moved + Math.abs(finish.x - next.x) + Math.abs(finish.y - next.y)
    return len;
}


async function path_finder ()
{
    for (let i = 0; i < rect_count.value; i++)
    {
        for (let j = 0; j < rect_count.value; j++)
        {
            if ((array[i][j] != 0) && (array[i][j] != 1) && (array[i][j] != 2) && (array[i][j] != 3))
            {
                array[i][j] = 0;
            };
        }
    }

    array[start.x][start.y] = 2;
    array[finish.x][finish.y] = 3;

    let current_item = {x: start.x, y: start.y, pr_index: -1, moved: 0};
    array[current_item.x][current_item.y] = 6;
    await refill_rect();


    let can = [];
    let cant = [];
    let cont = true;
    let next_item;
    let minimal;
    let minimal_ind;

    while (cont)
    {
        for (let i = -1; i < 2; i++)
        {
            for (let j = -1; j < 2; j++)
            {
                if (!(i == 0 && j == 0)&&(current_item.x + i >= 0)&&(current_item.x + i < rect_count.value)&&(current_item.y + j >= 0)&&(current_item.y + j < rect_count.value)&&(array[current_item.x + i][current_item.y + j]!=1))
                {
                    if (array[current_item.x + i][current_item.y + j] == 3)
                    {
                        array[current_item.x + i][current_item.y + j] = 7;
                        while (current_item.pr_index != -1)
                        {
                            array[current_item.x][current_item.y] = 7;
                            current_item = cant[current_item.pr_index];
                        }
                        array[current_item.x][current_item.y] = 7;
                        await refill_rect();
                        cont = false;
                        break;
                    }
                    else
                    {
                        next_item = {x: current_item.x + i, y: current_item.y + j, pr_index: cant.length, moved: null};
                        next_item.moved = distance_finder(current_item, next_item);

                        if (array[next_item.x][next_item.y] == 0)
                        {
                            can.push(next_item);
                            array[next_item.x][next_item.y] = 5;
                            await refill_rect();
                        }
                        else if (array[next_item.x][next_item.y] == 5)
                        {
                            for (let k = 0; k < can.length; k++)
                            {
                                if (can[k].x == next_item.x && can[k].y == next_item.y)
                                {
                                    if (can[k].moved > next_item.moved)
                                    {
                                        break;
                                    }
                                    else
                                    {
                                        can[k].moved = next_item.moved;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (cont)
        {
            if (can.length == 0)
            {
                cont = false;
                alert("Невозможно построить путь!");
            }
            else
            {
                array[current_item.x][current_item.y] = 4;
                cant.push(current_item);
                await refill_rect();

                minimal = can[0].moved;
                minimal_ind = 0;

                for (let i = 0; i < can.length; i++)
                {
                    if (can[i].moved <= minimal)
                    {
                        minimal = can[i].moved;
                        minimal_ind = i;
                    }
                }

                current_item = can[minimal_ind];
                array[current_item.x][current_item.y] = 6;
                await refill_rect();
                can.splice(minimal_ind,1);

            }


        }





    }
}

gen_rand_arr();
refill_rect();


generate_rand_button.addEventListener("click", function()
{
    gen_rand_arr();
    refill_rect();
});

canv.addEventListener("click", function(e){elem_change(e)});

rect_count.addEventListener("change", function() 
{
    gen_rand_arr();
    refill_rect();
});

path_button.addEventListener("click", path_finder);
