class ball {
    constructor(
        ballType = '',
        colour = null,
        number = 8,
        velocity = { x: 0, y: 0 },
        position = { x: 0, y: 0 },
        radius = 20
    ) { // ballType will be stripes or solids, there will be 7 for each player, solids are numbered 1-7 while stripes are numbered 9-15
        this.type = ballType;
        this.number = number;
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.colour = colour !== null ? colour : this.getPoolColour(number);
        this.body = null;
    }

    getPoolColour(number) {
        // These are the colours of the pool balls based on their number.
        const poolColours = {
            1: 'yellow',
            2: 'blue',
            3: 'red',
            4: 'purple',
            5: 'orange',
            6: 'green',
            7: 'brown',
            8: 'black',
            9: 'yellow',
            10: 'blue',
            11: 'red',
            12: 'purple',
            13: 'orange',
            14: 'green',
            15: 'brown'
        };

        // This is for the cue ball
        if (number === 0) {
            return 'white';
        }

        return poolColours[number] || 'black';
    }

    giveColour() {
        this.colour = this.getPoolColour(this.number);
        return this.colour;
    }

    getSpeed() {
        return Math.hypot(this.velocity.x, this.velocity.y);
    }

    isMoving(threshold = 0.01) {
        return this.getSpeed() > threshold;
    }

    canTakeTurn(threshold = 0.01) {
        return !this.isMoving(threshold);
    }

    createBody() {
        if (typeof Bodies === 'undefined') {
            throw new Error('Matter.Bodies is not available. Make sure matter.js is loaded before creating a ball body.');
        }

        const body = Bodies.circle(this.position.x, this.position.y, this.radius, {
            density: 0.01,
            friction: 0.05,
            frictionAir: 0.01,
            restitution: 1,
            render: {
                fillStyle: this.colour
            }
        });

        if (typeof Matter !== 'undefined' && Matter.Body && typeof Matter.Body.setVelocity === 'function') {
            Matter.Body.setVelocity(body, this.velocity);
        }

        this.body = body;
        return body;
    }

    draw() {
        if (typeof fill !== 'function' || typeof ellipse !== 'function') {
            return;
        }

        const x = this.position?.x ?? 0;
        const y = this.position?.y ?? 0;

        noStroke();
        fill(this.colour);
        ellipse(x, y, this.radius * 2, this.radius * 2);
    }
}