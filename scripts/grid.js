class Grid {
    constructor(x, y, live) {
        this.x = x
        this.y = y
        this.live = live
    }

    equal(other) {
        return this.x === other.x && this.y === other.y
    }

}


export default Grid
