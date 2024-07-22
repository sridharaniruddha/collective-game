class Example extends Phaser.Scene
{
    constructor ()
    {
        super('Example');
    }

    preload ()
    {
        this.load.image('sky', `https://play.rosebud.ai/assets/sky.png?yn5M`);
        this.load.image('logo', `https://play.rosebud.ai/assets/logo.png?nJ4N`);
        this.load.image('red', `https://play.rosebud.ai/assets/red.png?c6Gg`);
    }

    create ()
    {
        this.add.image(400, 300, 'sky');

        const particles = this.add.particles('red');
        const emitter = particles.createEmitter({
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        });

        const logo = this.physics.add.image(400, 100, 'logo');

        logo.setVelocity(100, 200);
        logo.setBounce(0.8, 0.8);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);

        // Make the logo interactive and add a click event
        logo.setInteractive();
        logo.on('pointerdown', () => {
            console.log('Logo clicked!');
            this.scene.start('NewScene');
        });

        this.time.addEvent({
            delay: 3000,
            loop: false,
            callback: () => {
                // this.scene.start('new-scene');
                // this.switchScene();
            },
        });
    }
}

class NewScene extends Phaser.Scene
{
    constructor ()
    {
        super('NewScene');
    }

    preload ()
    {
        // Load any assets needed for the new scene
        this.load.image('script', `https://play.rosebud.ai/assets/script.png?NxGi`);
        this.load.image('clapper', 'https://play.rosebud.ai/assets/clapper-board.png?DdiR');
    }

    create ()
    {
        // Add background
        this.add.rectangle(400, 300, 800, 600, 0x000000);

        // Create 4x4 grid
        const gridSize = 4;
        const cellSize = 100;
        const startX = 400 - (cellSize * gridSize) / 2 + cellSize / 2;
        const startY = 300 - (cellSize * gridSize) / 2 + cellSize / 2;

        // Store grid cells for later use
        this.gridCells = [];

        let cellIndex = 0;
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const x = startX + col * cellSize;
                const y = startY + row * cellSize;
                
                // Create cell background
                const cell = this.add.rectangle(x, y, cellSize - 2, cellSize - 2, 0xffffff);
                
                // Make cell interactive
                cell.setInteractive();
                cell.on('pointerover', () => {
                    cell.setFillStyle(0xcccccc);
                });
                cell.on('pointerout', () => {
                    cell.setFillStyle(0xffffff);
                });
                cell.on('pointerdown', () => {
                    console.log(`Clicked cell at row ${row}, column ${col}`);
                });

                // Store cell information
                this.gridCells.push({
                    x: x,
                    y: y,
                    width: cellSize - 2,
                    height: cellSize - 2
                });

                // Create script image for each cell
                const script = this.add.image(x, y, 'script');
                script.setDisplaySize(cellSize - 10, cellSize - 10);
                
                // Make script draggable
                script.setInteractive();
                this.input.setDraggable(script);
                script.originalX = x;
                script.originalY = y;

                cellIndex++;
            }
        }

        // Add title
        this.add.text(400, 50, 'Merge identical items to produce a new item', { fontSize: '24px', fill: '#fff' }).setOrigin(0.5);

        // Add a button to go back to the main scene
        const backButton = this.add.text(400, 550, 'Back to main', { fontSize: '24px', fill: '#fff' })
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Example');
            });

        // Set up drag events
        this.input.on('dragstart', (pointer, gameObject) => {
            gameObject.setTint(0xff0000);
        });

        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.input.on('dragend', (pointer, gameObject) => {
            gameObject.clearTint();
            const targetCell = this.findNearestCell(gameObject.x, gameObject.y);
            if (targetCell) {
                gameObject.x = targetCell.x;
                gameObject.y = targetCell.y;
                this.checkMerge(gameObject, targetCell);
            } else {
                gameObject.x = gameObject.originalX;
                gameObject.y = gameObject.originalY;
            }
        });

        // Add timer
        this.timeLeft = 120; // 2 minutes in seconds
        this.timerText = this.add.text(20, 550, 'Time: 2:00', { fontSize: '24px', fill: '#fff' });
        
        // Start the timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    updateTimer() {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerText.setText(`Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        
        if (this.timeLeft <= 0) {
            this.timer.remove();
            this.timerText.setText('Time\'s up!');
            // Add any game over logic here
        }
    }

    getRandomPositions(count, max) {
        const positions = [];
        while (positions.length < count) {
            const position = Math.floor(Math.random() * max);
            if (!positions.includes(position)) {
                positions.push(position);
            }
        }
        return positions;
    }

    findNearestCell(x, y) {
        for (let cell of this.gridCells) {
            if (x > cell.x - cell.width / 2 && x < cell.x + cell.width / 2 &&
                y > cell.y - cell.height / 2 && y < cell.y + cell.height / 2) {
                return cell;
            }
        }
        return null;
    }

    checkMerge(gameObject, targetCell) {
        const overlappingObjects = this.children.getChildren().filter(child => {
            return child !== gameObject && 
                   child.texture && child.texture.key === 'script' &&
                   child.x === targetCell.x && child.y === targetCell.y;
        });

        if (overlappingObjects.length > 0) {
            // Merge the scripts
            gameObject.destroy();
            overlappingObjects[0].destroy();

            // Create a clapper board
            const clapper = this.add.image(targetCell.x, targetCell.y, 'clapper');
            clapper.setDisplaySize(targetCell.width - 10, targetCell.height - 10);
            
            // Make clapper draggable
            clapper.setInteractive();
            this.input.setDraggable(clapper);
            clapper.originalX = targetCell.x;
            clapper.originalY = targetCell.y;
        }
    }
}

const container = document.getElementById('renderDiv');
const config = {
    type: Phaser.AUTO,
    parent: 'renderDiv',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: [Example, NewScene]
};

window.phaserGame = new Phaser.Game(config);