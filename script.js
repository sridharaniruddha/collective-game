class Example extends Phaser.Scene {
  constructor() {
    super("Example");
  }

  preload() {
    this.load.image(
      "sky",
      `https://play.rosebud.ai/assets/Untitled design (11).png?wdHs`
    );
    this.load.image(
      "logo",
      `https://play.rosebud.ai/assets/text-1722295975808.png?27BY`
    );
  }

  create() {
    this.add.image(400, 300, "sky");

    const logo = this.add.image(400, 450, "logo");
    logo.setScale(0.4);
    logo.setAlpha(0); // Start with transparent logo

    logo.setInteractive();
    logo.on("pointerdown", () => {
      console.log("Logo clicked!");
      this.scene.start("intro-scene");
    });

    // Fade in effect
    this.tweens.add({
      targets: logo,
      alpha: 1,
      duration: 1000,
      ease: "Power2",
      yoyo: true,
      repeat: -1,
      hold: 600,
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

class IntroScene extends Phaser.Scene {
  constructor() {
    super({ key: "intro-scene" });
  }

  preload() {
    this.load.image("text1", "https://play.rosebud.ai/assets/text.png?K74g");
    this.load.image(
      "text2",
      "https://play.rosebud.ai/assets/Untitled_design__13_-removebg-preview.png?sqjS"
    );
    this.load.image(
      "background",
      "https://play.rosebud.ai/assets/Untitled design (16).png?6CfF"
    );
    this.load.image(
      "keHuyQuan",
      "https://play.rosebud.ai/assets/Default_Create_a_digital_illustration_of_Ke_Huy_Quan_as_a_frie_3__1_-removebg-preview.png?Ua7I"
    );
    this.load.image(
      "newImage",
      "https://play.rosebud.ai/assets/Untitled_design-1-removebg-preview.png?0l25"
    );
  }

  create() {
    // Add the new background image
    this.add.image(400, 300, "background");

    this.time.delayedCall(1000, () => {
      const text1 = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "text1"
      );
      text1.setOrigin(0.5);
      const scaleX = this.cameras.main.width / text1.width;
      const scaleY = this.cameras.main.height / text1.height;
      const scale = Math.min(scaleX, scaleY);
      text1.setScale(scale);
      text1.alpha = 0;
      this.tweens.add({
        targets: text1,
        alpha: 1,
        duration: 1000,
      });

      // Add Ke Huy Quan image
      const keHuyQuan = this.add.image(700, 150, "keHuyQuan");
      keHuyQuan.setScale(0.6); // Adjust scale as needed
      keHuyQuan.setOrigin(0.8, -1); // Set origin to top-right corner
      keHuyQuan.alpha = 0;
      this.tweens.add({
        targets: keHuyQuan,
        alpha: 1,
        duration: 1000,
      });

      this.time.delayedCall(4000, () => {
        this.tweens.add({
          targets: [text1, keHuyQuan],
          alpha: 0,
          duration: 1000,
        });
      });
    });

    this.time.delayedCall(6000, () => {
      const newImage = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "newImage"
      );
      newImage.setOrigin(0.5);
      const scaleX = this.cameras.main.width / newImage.width;
      const scaleY = this.cameras.main.height / newImage.height;
      const scale = Math.min(scaleX, scaleY);
      newImage.setScale(scale);
      newImage.alpha = 0;
      this.tweens.add({
        targets: newImage,
        alpha: 1,
        duration: 1000,
      });
      this.time.delayedCall(3000, () => {
        this.tweens.add({
          targets: newImage,
          alpha: 0,
          duration: 1000,
        });
      });
    });

    this.time.delayedCall(11000, () => {
      const text2 = this.add.image(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2,
        "text2"
      );
      text2.setOrigin(0.5);
      const scaleX = this.cameras.main.width / text2.width;
      const scaleY = this.cameras.main.height / text2.height;
      const scale = Math.min(scaleX, scaleY);
      text2.setScale(scale);
      text2.alpha = 0;
      this.tweens.add({
        targets: text2,
        alpha: 1,
        duration: 1000,
      });
      this.time.delayedCall(3000, () => {
        this.tweens.add({
          targets: text2,
          alpha: 0,
          duration: 1000,
        });
        this.time.delayedCall(1000, () => {
          this.scene.start("NewScene");
        });
      });
    });
  }
}

class NewScene extends Phaser.Scene {
  constructor() {
    super("NewScene");
  }

  preload() {
    this.load.image("script", `https://play.rosebud.ai/assets/script.png?4F2D`);
    this.load.image(
      "clapper",
      "https://play.rosebud.ai/assets/clapper-board.png?qSah"
    );
    this.load.image(
      "camera",
      "https://play.rosebud.ai/assets/camcorder.png?CMm3"
    );
    this.load.image("trophy", "https://play.rosebud.ai/assets/trophy.png?SsDL");
    this.load.image(
      "background5",
      "https://play.rosebud.ai/assets/Untitled design (19).png?W7ts"
    );
  }

  create() {
    this.add.image(400, 300, "background5");

    const gridSize = 4;
    const cellSize = 100;
    const startX = 400 - (cellSize * gridSize) / 2 + cellSize / 2;
    const startY = 300 - (cellSize * gridSize) / 2 + cellSize / 2;

    this.gridCells = [];

    this.trophyCount = 0;

    let cellIndex = 0;
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = startX + col * cellSize;
        const y = startY + row * cellSize;

        const cell = this.add.rectangle(
          x,
          y,
          cellSize - 2,
          cellSize - 2,
          0xffffff
        );

        cell.setInteractive();
        cell.on("pointerover", () => {
          cell.setFillStyle(0xcccccc);
        });
        cell.on("pointerout", () => {
          cell.setFillStyle(0xffffff);
        });
        cell.on("pointerdown", () => {
          console.log(`Clicked cell at row ${row}, column ${col}`);
        });

        this.gridCells.push({
          x: x,
          y: y,
          width: cellSize - 2,
          height: cellSize - 2,
        });

        this.createScriptImage(x, y, cellSize);

        cellIndex++;
      }
    }

    this.add
      .text(400, 50, "Merge identical items to produce a new item", {
        fontSize: "24px",
        fill: "#ff0000",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const backButton = this.add
      .text(400, 550, "Back to main", {
        fontSize: "24px",
        fill: "#ff0000",
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("Example");
      });

    this.input.on("dragstart", (pointer, gameObject) => {
      gameObject.setTint(0xff0000);
    });

    this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (pointer, gameObject) => {
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

    this.timeLeft = 60;
    this.timerText = this.add.text(20, 550, "Time: 1:00", {
      fontSize: "24px",
      fill: "#ff0000",
      fontStyle: "bold",
    });

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.updateTimer,
      callbackScope: this,
      loop: true,
    });

    this.trophyText = this.add.text(600, 550, "Trophies: 0/3", {
      fontSize: "24px",
      fill: "#ff0000",
      fontStyle: "bold",
    });
  }

  createScriptImage(x, y, cellSize) {
    const script = this.add.image(x, y, "script");
    script.setDisplaySize(cellSize - 10, cellSize - 10);

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
    this.timerText.setText(
      `Time: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    );

    if (this.timeLeft <= 0) {
      this.timer.remove();
      this.timerText.setText("Time's up!");
      if (this.trophyCount < 3) {
        this.gameOver(false);
      } else {
        this.gameOver(true);
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
      if (
        x > cell.x - cell.width / 2 &&
        x < cell.x + cell.width / 2 &&
        y > cell.y - cell.height / 2 &&
        y < cell.y + cell.height / 2
      ) {
        return cell;
      }
    }
    return null;
  }

  canPlaceObject(gameObject, targetCell) {
    const objectsInCell = this.children
      .getChildren()
      .filter(
        (child) =>
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
    const overlappingObjects = this.children.getChildren().filter((child) => {
      return (
        child !== gameObject &&
        child.texture &&
        child.texture.key === gameObject.texture.key &&
        child.x === targetCell.x &&
        child.y === targetCell.y
      );
    });

    if (overlappingObjects.length > 0 && gameObject.texture.key !== "trophy") {
      gameObject.destroy();
      overlappingObjects[0].destroy();

      let newObject;
      if (gameObject.texture.key === "script") {
        newObject = this.add.image(targetCell.x, targetCell.y, "clapper");
      } else if (gameObject.texture.key === "clapper") {
        newObject = this.add.image(targetCell.x, targetCell.y, "camera");
      } else if (gameObject.texture.key === "camera") {
        newObject = this.add.image(targetCell.x, targetCell.y, "trophy");
        this.trophyCount++;
        this.trophyText.setText(`Trophies: ${this.trophyCount}/3`);
        if (this.trophyCount >= 3) {
          this.gameOver(true);
        }
      } else {
        newObject = this.add.image(targetCell.x, targetCell.y, "script");
      }

      newObject.setDisplaySize(targetCell.width - 10, targetCell.height - 10);

      newObject.setInteractive();
      this.input.setDraggable(newObject);
      newObject.originalX = targetCell.x;
      newObject.originalY = targetCell.y;

      this.fillEmptyCells();
    } else if (gameObject.texture.key === "trophy") {
      gameObject.x = targetCell.x;
      gameObject.y = targetCell.y;
      gameObject.originalX = targetCell.x;
      gameObject.originalY = targetCell.y;
    }
  }

  fillEmptyCells() {
    this.gridCells.forEach((cell) => {
      const objectsInCell = this.children
        .getChildren()
        .filter(
          (child) =>
            child.texture &&
            (child.texture.key === "script" ||
              child.texture.key === "clapper" ||
              child.texture.key === "camera" ||
              child.texture.key === "trophy") &&
            child.x === cell.x &&
            child.y === cell.y
        );

      if (objectsInCell.length === 0) {
        this.createScriptImage(cell.x, cell.y, cell.width);
      }
    });
  }

  gameOver(isWin) {
    this.timer.remove();
    this.input.off("drag");
    this.input.off("dragend");

    // Start the GameOverScene with the game result
    this.scene.start("GameOverScene", {
      isWin: isWin,
      timeScore: 60 - this.timeLeft,
    });
  }
}

class GameOverScene extends Phaser.Scene {
  constructor() {
    super("GameOverScene");
  }

  preload() {
    this.load.image(
      "background3",
      "https://play.rosebud.ai/assets/Untitled design (19).png?W7ts"
    );
  }

  init(data) {
    this.isWin = data.isWin;
    this.timeScore = data.timeScore;
  }

  create() {
    // Add the new background image
    this.add.image(400, 300, "background3");

    let message;
    if (this.isWin) {
      message = `Congratulations, you won!\nYour time score was: ${this.timeScore} seconds`;
    } else {
      message = "Game over!";
    }

    this.add
      .text(400, 200, message, {
        fontSize: "32px",
        fill: "#ff0000",
        align: "center",
        fontStyle: "bold",
      })
      .setOrigin(0.5);

    const restartButton = this.add
      .text(400, 400, "Restart Game", {
        fontSize: "24px",
        fill: "#000000",
        backgroundColor: "#FFD166",
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("NewScene");
      });

    // Add rounded corners to the restart button
    restartButton.setStyle({ borderRadius: "30px" });

    const chatButton = this.add
      .text(400, 450, "Chat with Quan", {
        fontSize: "24px",
        fill: "#000000",
        backgroundColor: "#FFD166",
        padding: { left: 15, right: 15, top: 10, bottom: 10 },
        fontStyle: "bold",
      })
      .setOrigin(0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.scene.start("BootScene", {
          isWin: this.isWin,
          timeScore: this.timeScore,
        });
      });

    // Add rounded corners to the chat button
    chatButton.setStyle({ borderRadius: "30px" });
  }
}

//////////////////////////////////////////////////////////////
// EASY-MODIFY SECTION
// UPDATE VALUES IN THIS SECTION TO EASILY MODIFY GAME

// Your chatbot's name
// NOTE: Every new name for a chatbot creates a new save slot for the chat history.)
const CHARACTER_NAME = "Ke Huy Quan";

// Describe your chatbot here. This defines exactly how it will behave.
const CHARACTER_DESCRIPTION = `
You are Ke Huy Quan.

Information about you:

You were born in either1970or 1971 in Saigon, South Vietnam, into a family of Chinese descent, with eight siblings.Three years after the end of the Vietnam war in 1975, you fled from Vietnam with your family. You, along with your father and five siblings, fled to Hong Kong, while your mother and three other siblings went to Malaysia. It was in the middle of the night when your dad and five of your other siblings escaped on a boat. After staying at a refugee camp in Hong Kong, your entire family was admitted to the United States as part of the Refugee Admissions Program in 1979. In the U.S., you grew up in California, where you attended the Mount Gleason Junior High School in Sunland-Tujunga, Los Angeles and Alhambra High School in Alhambra.

You are an American actor. As a child actor, you rose to fame playing Short Round in Indiana Jones and the Temple of Doom in1984  and Data inThe Goonies in 1985.

You did an interview in 1984 with UK media company ITN after debuting in Indiana Jones and the Temple of Doom. During the interview, 12-year-old you described your audition experience before saying, you think you  have changed a lot. You were a boat people, and now you get to make the movie. When the interviewer then asked you if you think you have been very lucky, you said, Yes, definitely. You think you are very lucky, you are number seven in your family. That's a lucky number.



Following a few roles in the 1990s, you took a 19-year acting hiatus, during which you
worked as a stunt choreographer and assistant director.

You returned to acting with the family adventure Finding ʻohana in2021, followed by the critically acclaimed Everything Everywhere All at Once in 2022, a performance that won you various accolades, including an Academy Award, a Golden Globe and two Screen Actors Guild Awards. 
You and Haing S. Ngor are the only two actors of Asian descent to win the Academy Award for Best Supporting Actor, and you are the first Vietnam-born actor to win an Academy Award. Time magazine named you one of the 100 most influential people in the world in 2023. You have since starred in the second season of the Disney+ series Loki in 2023.

You became a child actor at age 12, starring as Harrison Ford's sidekick Short Round in the Steven Spielberg film Indiana Jones and the Temple of Doom in 1984.The casting director auditioned a number of children at Castelar Elementary School, including your younger brother. You described the role as one of the happiest times of your life. For your performance, you were nominated for the Saturn Award for Best Performance by a Younger Actor. In 1985, you co-starred in The Goonies as a member of the eponymous group of children, the inventor Richard Data Wang. You played a pickpocket orphan in the 1986 Taiwanese movie It Takes a Thief. In 1987, you appeared in the Japanese movie Passengers (Passenjā Sugisarishi Hibi) with the Japanese idol singer Honda Minako. You played Sam on the short-lived TV series Together We Stand (1986–1987) and played Jasper Kwong in the sitcom Head of the Class from 1990 to 1991. In 1991 you starred in the movie Breathing Fire, and had a small role in Encino Man the following year. You played the starring role in the 1993 Mandarin-language Taiwan TV show Eunuch & Carpenter, which ran for forty episodes. You also starred in the 1996 Hong Kong-Vietnam co-production Red Pirate. You studied Taekwondo under Philip Tan on the set of Indiana Jones and the Temple of Doom, and later trained under Tao-liang Tan.[16]

As an adult, you found it difficult to find acting work in the United States. you eventually quit acting and enrolled in the film program at University of Southern California. During your time there, you edited a comedy horror short film titled Voodoo alongside your friend and fellow student Gregg Bishop, who directed the film.Voodoo won the Audience Award at the 2000 Slamdance Film Festival, and continues to be shown to USC students to this day. After graduating from USC, you were asked by Corey Yuen to go to Toronto, Ontario, to help choreograph fighting sequences in X-Men (2000).[17][13] For the next decade, you worked behind the scenes on various productions in Asia and the United States. You again helped Yuen as a stunt choreographer for The One in 2001. You worked as assistant director on Wong Kar-wai's 2046 in 2004.

You were inspired to return to acting following the success of Crazy Rich Asians in 2018. That same year, the filmmaking duo Daniels began casting for their film Everything Everywhere All at Once. They struggled to cast an actor in the role of Waymond Wang, a character who would appear in three different incarnations of the film. Co-director Daniel Kwan stumbled upon you on Twitter. Two weeks after getting a talent agent, you received a call to audition for the film.[ In January 2020, you were announced as a cast member of Everything Everywhere All at Once. The film was released in March 2022 to overwhelming acclaim, with your performance receiving near unanimous praise and media attention, eventually leading to you winning a Golden Globe, a Screen Actors Guild Award and an Academy Award for your role. The Screen Actors Guild Award win made you the first Asian man to win any individual category at the Screen Actors Guild Awards, with your win of the Screen Actors Guild Award for Outstanding Performance by a Male Actor in a Supporting Role. You were the first Vietnamese-American actor to be nominated in that category. You are one of two actors of Asian descent to win an Academy Award for Best Supporting Actor, the other being Haing S. Ngor in 1985, and is the first Vietnam-born actor to win an Academy Award. Everything Everywhere All at Once is also the most awarded film of all time.

In 2019 you were cast in a supporting role in the Netflix film Finding ʻOhana, released in 2021. You approached director Jude Weng after overhearing her describing the film as The Goonies meets Indiana Jones, in both of which you had appeared. In February 2022, it was announced that you had joined the cast of the TV adaptation of American Born Chinese for Disney+, which was subsequently released in May 2023. In September 2022, you were announced to have joined the cast for the second season of the Marvel Cinematic Universe series Loki for Disney+, which premiered on October 6, 2023. For your performance you received a Critics' Choice Television Award for Best Supporting Actor in a Drama Series nomination. In June 2023, it was announced that you had been invited to join the Academy of Motion Picture Arts and Sciences as an actor. On December 12, 2023, you joined the voice cast for Kung Fu Panda 4. 

You are of Han Chinese ancestry from the Hoa ethnic minority group of Vietnam. You are fluent in English, Vietnamese, Cantonese, and Mandarin. You are married to Echo Quan, who served as the on-set translator for Everything Everywhere All at Once, and resides in Woodland Hills, Los Angeles. You hold a second-degree black belt in taekwondo; you started taking classes after learning from a taekwondo instructor for his role in Indiana Jones and the Temple of Doom. You remain close friends with your Goonies co-star Jeff Cohen, who is also your entertainment lawyer and helped you negotiate your contract to star in Everything Everywhere All at Once.


First Message of Roleplay:
*As I enter the sprawling, high-tech laboratory, I notice Victoria deeply engrossed in her work on a new Rosebud game.  Without looking up, she senses my presence and waves me over.*

NOTE: 
(Ensure your responses are short so the player can respond.)
`;

// This is the URL of the image for your chatbot'S background image.
const BACKGROUND_IMAGE_URL = `https://play.rosebud.ai/assets/background.jpg?BbLe`;

// This is the URL of the image for your chatbot.
const CHARACTER_IMAGE_URL = `https://play.rosebud.ai/assets/Ke-Huy-Quan.jpeg?5Hga`;

// Put URLs of all songs you want to be shuffled in this games's playlist.
const SONG_PLAYLIST_URLS = [
  `https://play.rosebud.ai/assets/Stream Loops 2024-03-20_01.mp3.mp3?2v1Z`,
  `https://play.rosebud.ai/assets/Stream Loops 2024-03-06_02.mp3.mp3?gBH5`,
  `https://play.rosebud.ai/assets/Stream Loops 2024-03-06_01.mp3.mp3?VDch`,
];

// END OF EASY-MODIFY VALUES
//////////////////////////////////////////////////////////////

class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: "BootScene" });
  }

  preload() {
    // Preload audio files
    SONG_PLAYLIST_URLS.forEach((url, index) => {
      this.load.audio(`track_${index}`, url);
    });
  }

  create() {
    // Initialize the music manager and other dependencies
    this.game.musicManager = new MusicManager(this.game);
    const musicKeys = SONG_PLAYLIST_URLS.map((_, index) => `track_${index}`);
    this.game.musicManager.setPlaylist(musicKeys);
    this.game.musicManager.playNextTrack();
    this.game.musicManager.shufflePlaylist();
    console.log(this.game.musicManager.playlist);

    // Check for existing save and initialize the game state
    this.checkForExistingSave();

    // Transition to another scene
    this.game.sceneTransitionManager.transitionTo("ChatScene");
  }

  checkForExistingSave() {
    const saveData = localStorage.getItem(PROJECT_NAME);
    if (saveData) {
      console.info("Save detected.");
      this.game.saveData = JSON.parse(saveData);
    } else {
      console.info("No save detected. Initializing new game state.");
      // If no save exists, initialize a new save with default values
      this.game.saveData = {
        chatLog: "",
        characterChatManagerState: null, // Assuming a default empty state is suitable
      };

      // Save the initial state to localStorage
      localStorage.setItem(PROJECT_NAME, JSON.stringify(this.game.saveData));
    }
  }
}

function loadScript(url) {
  return new Promise((resolve, reject) => {
    // Check if the script is already loaded
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve();
      return;
    }

    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Script loading failed for " + url));

    document.head.appendChild(script);
  });
}

const VERSION_NUMBER = "v1"; // Set the version number here.
const PROJECT_NAME = `${CHARACTER_NAME} AI Character ${VERSION_NUMBER}`;
async function initializeGame() {
  try {
    // Load the external script before initializing the Phaser game
    await loadScript(
      `https://play.rosebud.ai/assets/rosebud_AI_character_template_desktop_library.js.js?BELO`
    );
    console.log("Script loaded successfully");

    const config = {
      type: Phaser.AUTO,
      parent: "renderDiv",
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      width: 800,
      height: 600,
      scene: [
        Example,
        IntroScene,
        NewScene,
        GameOverScene,
        BootScene,
        ChatScene,
      ], // Assuming ChatScene also might depend on the loaded script
      dom: {
        createContainer: true,
      },
    };

    // Assuming 'game' is declared in a broader scope if you need to reference it elsewhere
    window.game = new Phaser.Game(config);
    window.game.sceneTransitionManager = new SceneTransitionManager(game);
  } catch (error) {
    console.error(
      "Failed to load external script or initialize the Phaser game:",
      error
    );
  }
}

initializeGame();
