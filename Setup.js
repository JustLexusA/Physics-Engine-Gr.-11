// Aliases
var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies;


function setup() {
    MyWorld();
}

function MyWorld() {
    // Create engine
    var engine = Engine.create(),
        world = engine.world;
    // Change gravity
    engine.gravity.y = 1

    // Create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: innerWidth,
            height: innerHeight,
            wireframes: false,
            background: 'rgb(100, 100, 100)'
        }
    });
    // Create the canvas, this adds the renderer's canvas which uses the p5.js drawing tools to render over the physics world.
    createCanvas(windowWidth, windowHeight, render.canvas)

    // All sprites and objects
    cueball = Bodies.circle(innerWidth / 2, innerHeight / 2, 20, {
        density: 0.01,
        friction: 0.05,
        frictionAir: 0.01,
        restitution: 0.95
    });

    staticBall = Bodies.circle(innerWidth / 2 + 10, (innerHeight / 2) + 100, 30, {
        isStatic: true,
        density: 0.05
    });



    // Composite
    Composite.add(engine.world, [cueball, staticBall])

    // Run the renderer, this lets time pass to calculate the physics of the bodies inside the composite rather than letting them render in one frame forever.
    Render.run(render);

    // Create the runner
    var runner = Runner.create();
    
    // Run the engine
    Runner.run(runner, engine);
}