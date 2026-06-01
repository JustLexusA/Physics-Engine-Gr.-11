function createWalls() {
        // Walls of the pool table
        // Left wall
        PTLeftWall = Bodies.rectangle(innerWidth / 4, innerHeight / 2, 100, innerHeight / 2, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Right wall 
        PTRightWall = Bodies.rectangle(innerWidth - innerWidth / 4, innerHeight / 2, 100, innerHeight / 2, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Top wall 
        PTTopWall = Bodies.rectangle(innerWidth / 2, innerHeight / 4, innerWidth / 2, 100, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
        // Bottom wall 
        PTBottomWall = Bodies.rectangle(innerWidth / 2, innerHeight - innerHeight / 4, innerWidth / 2, 100, {
            isStatic: true,
            render: {
                fillStyle: 'rgb(100, 75, 25)',
                strokeStyle: 'transparent'
            }
        });
}