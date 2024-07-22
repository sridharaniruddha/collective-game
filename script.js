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
        this.load.image('camera', 'https://play.rosebud.ai/assets/camcorder.png?8gqg');
        this.load.image('trophy', 'https://play.rosebud.ai/assets/trophy.png?3RrK');
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

        // Initialize trophy count
        this.trophyCount = 0;

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
                this.createScriptImage(x, y, cellSize);

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
                const canPlace = this.canPlaceObject(gameObject, targetCell);
                if (canPlace) {
                    gameObject.x = targetCell.x;
                    gameObject.y = targetCell.y;
                    this.checkMerge(gameObject, targetCell);
                } else {
                    gameObject.x = gameObject.originalX;
                    gameObject.y = gameObject.originalY;
                }
            } else {
                gameObject.x = gameObject.originalX;
                gameObject.y = gameObject.originalY;
            }
        });

        // Add timer
        this.timeLeft = 60; // 1 minute in seconds
        this.timerText = this.add.text(20, 550, 'Time: 1:00', { fontSize: '24px', fill: '#fff' });
        
        // Start the timer
        this.timer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });

        // Add trophy count text
        this.trophyText = this.add.text(700, 550, 'Trophies: 0/3', { fontSize: '24px', fill: '#fff' });
    }

    createScriptImage(x, y, cellSize) {
        const script = this.add.image(x, y, 'script');
        script.setDisplaySize(cellSize - 10, cellSize - 10);
        
        // Make script draggable
        script.setInteractive();
        this.input.setDraggable(script);
        script.originalX = x;
        script.originalY = y;

        return script;
    }

    updateTimer() {
        this.timeLeft--;
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerText.setText(`Time: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
        
        if (this.timeLeft <= 0) {
            this.timer.remove();
            this.timerText.setText('Time\'s up!');
            if (this.trophyCount < 3) {
                this.gameOver('You lose! Not enough trophies.');
            } else {
                this.gameOver('You win!');
            }
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

    canPlaceObject(gameObject, targetCell) {
        const objectsInCell = this.children.getChildren().filter(child => 
            child !== gameObject &&
            child.texture &&
            child.x === targetCell.x &&
            child.y === targetCell.y
        );

        if (objectsInCell.length === 0) {
            return true;
        }

        return objectsInCell[0].texture.key === gameObject.texture.key;
    }

    checkMerge(gameObject, targetCell) {
        const overlappingObjects = this.children.getChildren().filter(child => {
            return child !== gameObject && 
                   child.texture && child.texture.key === gameObject.texture.key &&
                   child.x === targetCell.x && child.y === targetCell.y;
        });

        if (overlappingObjects.length > 0 && gameObject.texture.key !== 'trophy') {
            // Merge the objects
            gameObject.destroy();
            overlappingObjects[0].destroy();

            let newObject;
            if (gameObject.texture.key === 'script') {
                newObject = this.add.image(targetCell.x, targetCell.y, 'clapper');
            } else if (gameObject.texture.key === 'clapper') {
                newObject = this.add.image(targetCell.x, targetCell.y, 'camera');
            } else if (gameObject.texture.key === 'camera') {
                newObject = this.add.image(targetCell.x, targetCell.y, 'trophy');
                this.trophyCount++;
                this.trophyText.setText(`Trophies: ${this.trophyCount}/3`);
                if (this.trophyCount >= 3) {
                    this.gameOver('You win!');
                }
            } else {
                // If it's not a script, clapper, or camera, just create a new script
                newObject = this.add.image(targetCell.x, targetCell.y, 'script');
            }

            newObject.setDisplaySize(targetCell.width - 10, targetCell.height - 10);
            
            // Make new object draggable
            newObject.setInteractive();
            this.input.setDraggable(newObject);
            newObject.originalX = targetCell.x;
            newObject.originalY = targetCell.y;

            // Check for empty cells and fill them
            this.fillEmptyCells();
        } else if (gameObject.texture.key === 'trophy') {
            // If it's a trophy, just place it in the target cell without merging
            gameObject.x = targetCell.x;
            gameObject.y = targetCell.y;
            gameObject.originalX = targetCell.x;
            gameObject.originalY = targetCell.y;
        }
    }

    fillEmptyCells() {
        this.gridCells.forEach(cell => {
            const objectsInCell = this.children.getChildren().filter(child => 
                child.texture && (child.texture.key === 'script' || child.texture.key === 'clapper' || child.texture.key === 'camera' || child.texture.key === 'trophy') &&
                child.x === cell.x && child.y === cell.y
            );

            if (objectsInCell.length === 0) {
                // Cell is empty, create a new script image
                this.createScriptImage(cell.x, cell.y, cell.width);
            }
        });
    }

    gameOver(message) {
        // Stop the timer
        this.timer.remove();

        // Disable dragging
        this.input.off('drag');
        this.input.off('dragend');

        // Display game over message
        const gameOverText = this.add.text(400, 300, message, {
            fontSize: '48px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        }).setOrigin(0.5);

        // Add a restart button
        const restartButton = this.add.text(400, 400, 'Restart', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { left: 15, right: 15, top: 10, bottom: 10 }
        }).setOrigin(0.5).setInteractive();

        restartButton.on('pointerdown', () => {
            this.scene.restart();
        });
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