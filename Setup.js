// Aliases
var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        Composite = Matter.Composite,
        Collision = Matter.Collision,
        Vertices = Matter.Vertices,
        Svg = Matter.Svg,
        Bodies = Matter.Bodies;

// Arrays

function setup() {
    MyWorld();
}

function MyWorld() {
    // Create engine
    var engine = Engine.create(),
        world = engine.world;
    // Change gravity
    engine.gravity.y = 0

    // Create a renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: innerWidth,
            height: innerHeight,
            wireframes: false,
            background: 'rgb(48, 48, 48)'
        }
    });
    // Create the canvas, this adds the renderer's canvas which uses the p5.js drawing tools to render over the physics world.
    background('rgb(43, 43, 43)')
    createCanvas(windowWidth, windowHeight, render.canvas)

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.05,
                render: {
                    visible: true
                }
            }
        });

    Composite.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;
    
    // Walls of the pool table
        // Left wall
        PTLeftWall = Bodies.rectangle(innerWidth / 4, innerHeight / 2, 20, innerHeight / 2, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Right wall 
        PTRightWall = Bodies.rectangle(innerWidth - innerWidth / 4, innerHeight / 2, 20, innerHeight / 2, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Top wall 
        PTTopWall = Bodies.rectangle(innerWidth / 2, innerHeight / 4, innerWidth / 2, 20, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Bottom wall 
        PTBottomWall = Bodies.rectangle(innerWidth / 2, innerHeight - innerHeight / 4, innerWidth / 2, 20, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });

    // All sprites and objects
    cueball = Bodies.circle(innerWidth / 2, innerHeight / 2, 10, {
        density: 0.01,
        friction: 0.035,
        frictionAir: 0.02,
        restitution: 0.85,
        render : {
            fillStyle: 'white'
        }
    });
    Eightball = Bodies.circle(innerWidth / 2, innerHeight / 2, 10, {
        density: 0.01,
        friction: 0.025,
        frictionAir: 0.02,
        restitution: 0.85,
        render : {
            fillStyle: 'black'
        }
    });


    staticBall = Bodies.circle(innerWidth / 4 + 10, (innerHeight / 2) + innerHeight/4, 25, {
        isStatic: true,
        density: 0.05
    });

    // Composite(s)
    var Balls = Composite.create();
    var Pockets = Composite.create();
    var tableWalls = Composite.create();
    Composite.add(tableWalls, [PTLeftWall, PTRightWall, PTBottomWall, PTTopWall])
    Composite.add(Pockets, [staticBall]);
    Composite.add(Balls, [cueball, Eightball]);

    Composite.add(engine.world, [Balls, tableWalls]);

    // Check if cueball collides with the pocket,
    var scratch = Collision.collides(cueball, staticBall)

    if (scratch) {
        Composite.clear(cueball)
    }
    
    // Create the runner
    var runner = Runner.create();
    
    // Run the renderer, this lets time pass to calculate the physics of the bodies inside the composite rather than letting them render in one frame forever.
    Render.run(render);
    
    // Run the engine
    Runner.run(runner, engine);
}