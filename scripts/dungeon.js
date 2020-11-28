import Grid from './grid.js'


class Dungeon {
    constructor(width, height, gridSize, mapId) {
        this.width = width
        this.height = height
        this.gridSize = gridSize
        this.xMax = Math.floor(this.width / this.gridSize)  // cols
        this.yMax = Math.floor(this.height / this.gridSize)  // rows
        this._canvas = document.querySelector(mapId)
        this._canvas.width = width
        this._canvas.height = height

        this.context = this._canvas.getContext('2d')

        this.init()
    }

    init() {
        this.grids = []
        for (let y = 0; y < this.yMax; y++) {
            let row = []
            for (let x = 0; x < this.xMax; x++) {
                row.push(new Grid(x, y, Math.random() > 0.7))
            }
            this.grids.push(row)
        }
    }

    clean() {
        this.context.clearRect(0, 0, this.width, this.height)
    }

    neighbors(grid) {
        let x = grid.x
        let y = grid.y

        let xs = [x]
        let ys = [y]

        if (x - 1 >= 0) {
            xs.push(x - 1)
        }
        if (y - 1 >= 0) {
            ys.push(y - 1)
        }
        if (x + 1 < this.xMax) {
            xs.push(x + 1)
        }
        if (y + 1 < this.yMax) {
            ys.push(y + 1)
        }

        let res = []
        for (let x of xs) {
            for (let y of ys) {
                if (!(x == grid.x && y == grid.y)) {
                    res.push(this.grids[y][x])
                }
            }
        }
        return res
    }

    show() {
        for (let rows of this.grids) {
            for (let grid of rows) {
                if (grid.live) {
                    this.context.fillStyle = '#1d1f21'
                    this.context.fillRect(
                        grid.x * this.gridSize + 1,
                        grid.y * this.gridSize + 1,
                        this.gridSize - 2,
                        this.gridSize - 2,
                    )
                } else {
                    this.context.fillStyle = '#c5c8c6'
                    this.context.fillRect(
                        grid.x * this.gridSize + 1,
                        grid.y * this.gridSize + 1,
                        this.gridSize - 2,
                        this.gridSize - 2,
                    )
                }
            }
        }
    }

    update() {
        let nextGrids = []
        for (let y = 0; y < this.yMax; y++) {
            let row = []
            for (let x = 0; x < this.xMax; x++) {
                let currentGrid = this.grids[y][x]
                let liveNeighborsCount = this.neighbors(currentGrid).filter(grid => grid.live).length
                if (
                    currentGrid.live
                    && (
                        liveNeighborsCount < 2
                        || liveNeighborsCount > 3
                    )
                ) {
                    row.push(new Grid(x, y, false))
                } else if (
                    !currentGrid.live
                    && liveNeighborsCount === 3
                ) {
                    row.push(new Grid(x, y, true))
                } else {
                    row.push(currentGrid)
                }

            }
            nextGrids.push(row)
        }
        this.grids = nextGrids
    }
}

export default Dungeon
