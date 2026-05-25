class ball {
    constructor(ballType = '', colour = 'black', number = 8) { // ballType will be stripes or solids, there will be 7 for each player, solids are numbered 1-7 while stripes are numbered 9-15
        this.type = ballType;
        this.colour = colour;
        this.number = number
        this.position = null
    }
    giveColour() {
        if (this.number == 1 || this.number == 9) {
            this.colour = 'yellow'
        }
    }
}