function createBalls() {
        // All sprites and objects
    cueball = Bodies.circle(innerWidth / 2 + 100, innerHeight / 2, 10, {
        density: 0.01,
        friction: 0.1,
        frictionAir: 0.02,
        restitution: 0.9,
        render : {
            fillStyle: 'white'
        }
    });
    Eightball = Bodies.circle(innerWidth / 2 - 100, innerHeight / 2, 10, {
        density: 0.01,
        friction: 0.1,
        frictionAir: 0.02,
        restitution: 0.9,
        render : {
            fillStyle: 'black'
        }
    });

    // Identify a new ball using the parameters in the constructor
    var ball1 = new ball('solid', colour = null, number = 8, velocity = { x : 0, y : 0}, position = { x : innerWidth / 2, y : innerHeight / 2})

    // Create the body of the ball using the createBody function. It uses the parameters given above.
    var body1 = ball1.createBody();

    // Run the draw function for each body in the PoolBalls array
    PoolBalls.forEach(ball => {
        PoolBalls.draw();
    });


    // Add the balls into the array then it'll later be added inside the Balls composite
    PoolBalls.push(cueball, Eightball, body1)
}