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

// Arrays/Composites
    // Composite(s)
    var Balls = Composite.create();
    var Pockets = Composite.create();
    var tableWalls = Composite.create();

    // Array(s)
    var PoolBalls = []

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

    // Create bodies of the walls
    createWalls();

    // Create balls on the pool table area
    createBalls();

    // keep the mouse in sync with rendering
    render.mouse = mouse;
<<<<<<< HEAD
    
    // Walls of the pool table
    // Scale the length of the bottom and top borders to be a 2:1 ratio with the left and right borders
    var TopBottomBorderLength = innerWidth / 2
    var SideBorderLength = TopBottomBorderLength / 2 - 20
        // Left wall
        PTLeftWall = Bodies.rectangle(innerWidth / 4, innerHeight / 2, 20, SideBorderLength, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Right wall 
        PTRightWall = Bodies.rectangle(innerWidth - innerWidth / 4, innerHeight / 2, 20, SideBorderLength, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Top wall 
        PTTopWall = Bodies.rectangle(innerWidth / 2, innerHeight / 2 - SideBorderLength / 2, TopBottomBorderLength, 20, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Bottom wall 
        PTBottomWall = Bodies.rectangle(innerWidth / 2, innerHeight / 2 + SideBorderLength / 2, TopBottomBorderLength, 20, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
=======
>>>>>>> ccc1b8c6a044c42bd10d03c278acf224b4d7d245

    // Add all bodies into proper composites
    Composite.add(tableWalls, [PTLeftWall, PTRightWall, PTBottomWall, PTTopWall])
    Composite.add(Pockets, []);
    Composite.add(Balls, PoolBalls);

    Composite.add(engine.world, [Balls, tableWalls]);
    
    // Create the runner
    var runner = Runner.create();
    
    // Run the renderer, this lets time pass to calculate the physics of the bodies inside the composite rather than letting them render in one frame forever.
    Render.run(render);
    
    // Run the engine
    Runner.run(runner, engine);
}