var canv = document.getElementById("canvas0");
var ctx = canv.getContext("2d");
var array;
var start = {x: null, y: null};
var finish = {x: null, y: null};
var stopp;


const side = 756;

canv.width = side;
canv.height = side;

var rect_count = document.getElementById("select");
var wall_chanse = document.getElementById("wall_chanse");
var rendering = document.getElementById("select1");
var need_refill_input = document.getElementById("select2");
var rect_size;

var generate_rand_button = document.getElementById("gen_rand_but");
var lab_gen_button = document.getElementById("lab_generate");
var path_button = document.getElementById("path_finder");
var its_time_to_stop_button = document.getElementById("find_stoper");


function gen_rand_arr ()
{
    array = [];
    let number;

    for (let i = 0; i < rect_count.value; i++)
    {
        array.push([]);
        for (let j = 0; j < rect_count.value; j++)
        {
            number = Math.random();
            if (number < wall_chanse.value)
            {
                array[i].push(1);
            }
            else
            {
                array[i].push(0);
            }
        }
    }

    array[0][0] = 2;
    start.x = 0;
    start.y = 0;
    array[rect_count.value - 1][rect_count.value - 1] = 3;
    finish.x = rect_count.value - 1;
    finish.y = rect_count.value - 1;
}

function refill_one_rect (x, y)
{
    rect_size = side/rect_count.value;
    
    if (array[x][y] == 0)
    {
        ctx.fillStyle = "White"; //Пустое место
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 1)
    {
        ctx.fillStyle = "Black"; //Стена
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 2)
    {
        ctx.fillStyle = "Yellow"; //Начало
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 3)
    {
        ctx.fillStyle = "Blue"; //Конец
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 4)
    {
        ctx.fillStyle = "Red"; //Рассмотренно
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 5)
    {
        ctx.fillStyle = "Green"; //В очереди
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 6)
    {
        ctx.fillStyle = "Pink"; //Сейчас рассматривается
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
    else if (array[x][y] == 7)
    {
        ctx.fillStyle = "Purple"; //Итоговый путь
        ctx.fillRect(rect_size*x, rect_size*y, rect_size, rect_size);
    }
}

function refill_rect ()
{
    ctx.fillStyle = "White";
    ctx.fillRect(0, 0, side, side);

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
}

function elem_change(e)
{
    rect_j = Math.floor(e.offsetY/rect_size);
    rect_i = Math.floor(e.offsetX/rect_size);

    if ((array[rect_i][rect_j] != 0) && (array[rect_i][rect_j] != 1) && (array[rect_i][rect_j] != 2) && (array[rect_i][rect_j] != 3))
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
        array[start.y][start.x] = 2;
        array[finish.y][finish.x] = 3;
        refill_rect();
    }
    if (document.getElementById("radio0").checked == true)
    {
        if (array[rect_i][rect_j] != 2 && array[rect_i][rect_j] != 3)
        {
            array[rect_i][rect_j] = 2;
            array[start.y][start.x] = 0;
            refill_one_rect(start.y, start.x);
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
            refill_one_rect(finish.y, finish.x);
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

    refill_one_rect(rect_i, rect_j);

}


function all_disable ()
{
    path_button.setAttribute("disabled", "");
    rect_count.setAttribute("disabled", "");
    wall_chanse.setAttribute("disabled", "");
    generate_rand_button.setAttribute("disabled", "");
    rendering.setAttribute("disabled", "");
    lab_gen_button.setAttribute("disabled", "");
    canv.removeEventListener("click", elem_change);
    its_time_to_stop_button.removeAttribute("disabled");
}

function all_enabled ()
{
    path_button.removeAttribute("disabled");
    rect_count.removeAttribute("disabled");
    wall_chanse.removeAttribute("disabled");
    generate_rand_button.removeAttribute("disabled");
    rendering.removeAttribute("disabled");
    lab_gen_button.removeAttribute("disabled");
    canv.addEventListener("click", elem_change);
    its_time_to_stop_button.setAttribute("disabled", "");
}

function path_finder ()
{
    all_disable();
    stopp = false;

    let now1 = new Date().getTime();


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

    array[start.y][start.x] = 2;
    array[finish.y][finish.x] = 3;

    let current_item = {x: start.x, y: start.y, pr_index: -1, moved: 0, move: null};
    array[current_item.y][current_item.x] = 6;
    refill_rect();


    let can = [];
    let cant = [];
    let cont = true;
    let next_item;
    let minimal;
    let minimal_ind;

    let cycle = setInterval(function () 
    {

        if (stopp)
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

            array[start.y][start.x] = 2;
            array[finish.y][finish.x] = 3;

            let now2 = new Date().getTime();
            console.log(now2 - now1);
            refill_rect();
            all_enabled();

            clearInterval(cycle);
        }
        else if (its_time_to_stop_button.textContent == "Остановить поиск")
        {
            for (let i = -1; i < 2; i++)
            {
                for (let j = -1; j < 2; j++)
                {
                    if (!(i == 0 && j == 0)&&(current_item.x + i >= 0)&&(current_item.x + i < rect_count.value)&&(current_item.y + j >= 0)&&(current_item.y + j < rect_count.value)&&(array[current_item.y + j][current_item.x + i]!=1))
                    {
                        if (array[current_item.y + j][current_item.x + i] == 3)
                        {
                            array[current_item.y + j][current_item.x + i] = 7;
                            while (current_item.pr_index != -1)
                            {
                                array[current_item.y][current_item.x] = 7;
                                current_item = cant[current_item.pr_index];
                            }
                            array[current_item.y][current_item.x] = 7;
                            refill_rect();
                            cont = false;
                            all_enabled();
                            let now2 = new Date().getTime();
                            console.log(now2 - now1);
                            clearInterval(cycle);
                            break;
                        }
                        else
                        {
                            next_item = {x: current_item.x + i, y: current_item.y + j, pr_index: cant.length, moved: null, move: null};
                            if ((Math.abs(next_item.x - current_item.x) == 0)||(Math.abs(next_item.y - current_item.y) == 0))
                            {
                                next_item.moved = current_item.moved + 1;
                            }
                            else
                            {
                                next_item.moved = current_item.moved + 1.4;
                            }
                            next_item.move = next_item.moved + (Math.abs(finish.x - next_item.x) + Math.abs(finish.y - next_item.y)); //Math.max(Math.abs(finish.x - next_item.x) , Math.abs(finish.y - next_item.y))

                            if (array[next_item.y][next_item.x] == 0)
                            {
                                can.push(next_item);
                                array[next_item.y][next_item.x] = 5;
                                if (need_refill_input.value == 1)
                                {
                                    refill_one_rect(next_item.y, next_item.x);
                                }   
                            }
                            else if (array[next_item.y][next_item.x] == 5)
                            {
                                for (let k = 0; k < can.length; k++)
                                {
                                    if (can[k].x == next_item.x && can[k].y == next_item.y)
                                    {
                                        if (can[k].moved <= next_item.moved)
                                        {
                                            break;
                                        }
                                        else
                                        {
                                            can[k] = next_item;
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
                    array[current_item.y][current_item.x] = 4;
                    alert("Невозможно построить путь!");
                    all_enabled();
                    let now2 = new Date().getTime();
                    console.log(now2 - now1);
                    refill_rect();
                    clearInterval(cycle);
                }
                else
                {
                    array[current_item.y][current_item.x] = 4;
                    if (need_refill_input.value == 1)
                    {
                        refill_one_rect(current_item.y, current_item.x);
                    }
                    cant.push(current_item);

                    minimal = can[can.length - 1].move;
                    minimal_ind = can.length - 1;

                    for (let i = 0; i < can.length; i++)
                    {
                        if (can[i].move <= minimal)
                        {
                            minimal = can[i].move;
                            minimal_ind = i;
                        }
                    }

                    current_item = can[minimal_ind];
                    array[current_item.y][current_item.x] = 6;
                    if (need_refill_input.value == 1)
                    {
                        refill_one_rect(current_item.y, current_item.x);
                    }
                    can.splice(minimal_ind,1);

                }
            }
        }
    }, rendering.value);
}

function lab_generation ()
{
    let counter = 1;
    let tractors = [];

    for (let i = 0; i < 100; i++)
    {
        tractors.push({x:0, y:0});
    }

    array = [];

    rect_side = parseInt(rect_count.value) + (1 - rect_count.value % 2);

    for (let i = 0; i < rect_side; i++)
    {
        array.push([]);
        for (let j = 0; j < rect_side; j++)
        {
            if ((array[i][j] != 0) && (array[i][j] != 1) && (array[i][j] != 2) && (array[i][j] != 3))
            {
                array[i][j] = 1;
            };
        }
    }

    array[0][0] = 0;
    let path;

    while (counter < Math.round(rect_side / 2)**2)
    {
        for (let i = 0; i < tractors.length; i++)
        {
            path = Math.floor(Math.random()*4);
            if (path == 0)
            {
                if (tractors[i].y - 2 < 0)
                {
                    tractors[i].y += 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y - 1][tractors[i].x] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
                else
                {
                    tractors[i].y -= 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y + 1][tractors[i].x] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
            }
            else if (path == 1)
            {
                if (tractors[i].x + 2 >= (rect_side))
                {
                    tractors[i].x -= 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y][tractors[i].x + 1] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
                else
                {
                    tractors[i].x += 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y][tractors[i].x - 1] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
            }
            else if (path == 2)
            {
                if (tractors[i].y + 2 >= (rect_side))
                {
                    tractors[i].y -= 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y + 1][tractors[i].x] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
                else
                {
                    tractors[i].y += 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y - 1][tractors[i].x] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
            }
            else if (path == 3)
            {
                if (tractors[i].x - 2 < 0)
                {
                    tractors[i].x += 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y][tractors[i].x - 1] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
                else
                {
                    tractors[i].x -= 2;
                    if (array[tractors[i].y][tractors[i].x] == 1)
                    {
                        counter += 1;
                        array[tractors[i].y][tractors[i].x + 1] = 0;
                        array[tractors[i].y][tractors[i].x] = 0;
                    }
                }
            }


        }
    }

    array[start.y][start.x] = 2;
    array[finish.y][finish.x] = 3;

    if (array[finish.y - 1][finish.x] == 1 && array[finish.y][finish.x - 1] == 1)
    {
        let rand = Math.round(Math.random());

        array[finish.y - (1 - rand)][finish.x - rand] == 0;
    }




    refill_rect();
}

function continue_finding()
{
    its_time_to_stop_button.textContent = "Остановить поиск";
    path_button.textContent = "Поиск пути";
    path_button.removeEventListener("click", continue_finding);
    path_button.addEventListener("click", path_finder);
    path_button.setAttribute("disabled", "");
}

its_time_to_stop_button.setAttribute("disabled", "");
gen_rand_arr();
refill_rect();

generate_rand_button.addEventListener("click", function()
{
    gen_rand_arr();
    refill_rect();
});

canv.addEventListener("click", elem_change);

need_refill_input.addEventListener("change", refill_rect);

rect_count.addEventListener("change", function() 
{
    gen_rand_arr();
    refill_rect();
});

its_time_to_stop_button.addEventListener("click", function() 
{
    if (its_time_to_stop_button.textContent == "Остановить поиск")
    {
        path_button.removeAttribute("disabled", "");
        path_button.textContent = "Продолжить поиск"
        path_button.removeEventListener("click", path_finder);
        path_button.addEventListener("click", continue_finding);
        its_time_to_stop_button.textContent = "Прервать поиск";
    }
    else
    {
        stopp = true;
        its_time_to_stop_button.textContent = "Остановить поиск";
        path_button.textContent = "Поиск пути";
        path_button.removeEventListener("click", continue_finding);
        path_button.addEventListener("click", path_finder);
    }
});

path_button.addEventListener("click", path_finder);

lab_gen_button.addEventListener("click", lab_generation);


console.log(its_time_to_stop_button.textContent);