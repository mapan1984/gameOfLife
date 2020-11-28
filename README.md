## The Game Of Life

### Rules

* Any live cell with fewer than two live neighbours dies, as if by underpopulation.
* Any live cell with two or three live neighbours lives on to the next generation.
* Any live cell with more than three live neighbours dies, as if by overpopulation.
* Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.


* Any live cell with two or three live neighbours survives.
* Any dead cell with three live neighbours becomes a live cell.
* All other live cells die in the next generation. Similarly, all other dead cells stay dead.


        0 -> 3 live neighbours -> 1
        1 -> < 2 live neighbours -> 0
        1 -> > 3 live neighbours -> 0

https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
