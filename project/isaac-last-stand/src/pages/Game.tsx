import React, { useEffect, useRef, useState } from "react";
import * as Phaser from "phaser";
import { useNavigate } from "react-router-dom";
import PauseMenu from "../components/game/Menu";

interface GameComponentProps {
    customWidth?: number;
    customHeight?: number;
}

const GameComponent: React.FC<GameComponentProps> = ({
    customWidth,
    customHeight,
}) => {
    const gameRef = useRef<Phaser.Game | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const gameWidth = customWidth || window.innerWidth;
        const gameHeight = customHeight || window.innerHeight;

        const config: Phaser.Types.Core.GameConfig = {
            type: Phaser.AUTO,
            width: gameWidth,
            height: gameHeight,
            parent: containerRef.current!,
            backgroundColor: "#202020",
            physics: {
                default: "arcade",
                arcade: {
                    gravity: {
                        y: 0,
                        x: 0,
                    },
                    debug: false,
                },
            },
            scene: [GameScene],
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
        };

        gameRef.current = new Phaser.Game(config);

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsMenuOpen((prev) => !prev);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            if (gameRef.current) {
                gameRef.current.destroy(true);
                gameRef.current = null;
            }
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [customWidth, customHeight]);

    useEffect(() => {
        const scene = gameRef.current?.scene.getScene("GameScene") as
            | GameScene
            | undefined;
        if (scene) {
            scene.isPlayerInputEnabled = !isMenuOpen;
        }
    }, [isMenuOpen]);

    const closeMenuAndResume = () => {
        setIsMenuOpen(false);
    };

    const quitToMenu = () => {
        setIsMenuOpen(false);
        navigate("/");
    };

    return (
        <div className="w-screen h-screen flex flex-col p-4 justify-center items-center gap-3 relative">
            <div
                ref={containerRef}
                className="w-full h-10/12 border-8 relative"
            >
                {isMenuOpen && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center">
                        <PauseMenu
                            onResume={closeMenuAndResume}
                            onQuit={quitToMenu}
                        />
                    </div>
                )}
            </div>
            <div className="h-1/7 bg-[#202020] rounded-lg mt-4 p-6 text-white font-sans shadow-lg">
                <div className="flex gap-8 text-sm">
                    <span className="flex items-center gap-1">Life: ❤️❤️</span>
                    <span className="flex items-center gap-1">Keys: 🔑 0</span>
                    <span className="flex items-center gap-1">Kills: X</span>
                    <span className="flex items-center gap-1">Bombs: 💣 0</span>
                </div>
            </div>
        </div>
    );
};

class GameScene extends Phaser.Scene {
    // Player
    private player!: Phaser.Physics.Arcade.Sprite;
    private wasdKeys!: {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
    };
    private PLAYER_SPEED = 450;

    // Tilemap system
    private map!: Phaser.Tilemaps.Tilemap;
    private tileset!: Phaser.Tilemaps.Tileset;
    private backgroundLayer!: Phaser.Tilemaps.TilemapLayer;
    private collisionLayer!: Phaser.Tilemaps.TilemapLayer;
    private TILE_SIZE = 160;
    private MAP_WIDTH_TILES = 250;
    private MAP_HEIGHT_TILES = 187;

    // World dimensions (calculadas basadas en tiles)
    private WORLD_WIDTH = 170 * 32;
    private WORLD_HEIGHT = 100 * 32;

    // Bullets
    private tears!: Phaser.Physics.Arcade.Group;
    private arrowKeys!: Phaser.Types.Input.Keyboard.CursorKeys;
    private BULLET_SPEED = 500;
    private lastShotTime: number = 0;
    private SHOT_COOLDOWN = 500;
    public isPlayerInputEnabled: boolean = true;

    constructor() {
        super({ key: "GameScene" });
    }

    preload(): void {
        this.loadTilemapAssets();
        this.createSimpleTextures();
    }

    create(): void {
        this.createTilemap();

        const margin = 64;
        this.physics.world.setBounds(
            margin,
            margin,
            this.WORLD_WIDTH - margin * 2,
            this.WORLD_HEIGHT - margin * 2
        );

        this.createPlayer();
        this.setupCamera();
        this.setupControls();
        this.setupCollisions();
    }

    update(): void {
        if (!this.isPlayerInputEnabled) {
            this.player.setVelocity(0, 0);
            return;
        }
        this.handlePlayerMovement();
        this.handlePlayerShooting();
        this.cleanupTears();
    }

    private loadTilemapAssets(): void {
        this.load.image("tileset", "/src/assets/maps/mapsheet.png");
    }

    private createSimpleTextures(): void {
        // Tears
        this.load.image("tears", "/src/assets/pj/tears.png");

        // Character
        this.load.image("playerSprite", "/src/assets/pj/pj.png");
    }

    private createTilemap(): void {
        this.map = this.make.tilemap({
            tileWidth: this.TILE_SIZE,
            tileHeight: this.TILE_SIZE,
            width: this.MAP_WIDTH_TILES,
            height: this.MAP_HEIGHT_TILES,
        });

        const tileset = this.map.addTilesetImage("tileset");
        if (!tileset) {
            throw new Error("Failed to load tileset: 'tileset'");
        }
        this.tileset = tileset;

        this.backgroundLayer = this.map.createBlankLayer(
            "background",
            this.tileset
        )!;
        this.collisionLayer = this.map.createBlankLayer(
            "collision",
            this.tileset
        )!;

        this.generateMap();
    }

    private generateMap(): void {
        for (let x = 0; x < this.MAP_WIDTH_TILES; x++) {
            for (let y = 0; y < this.MAP_HEIGHT_TILES; y++) {
                // Bordes del mapa (tiles de pared)
                if (
                    x === 0 ||
                    x === this.MAP_WIDTH_TILES - 1 ||
                    y === 0 ||
                    y === this.MAP_HEIGHT_TILES - 1
                ) {
                    this.collisionLayer.putTileAt(8, x, y);
                } else if (
                    x < 3 ||
                    x > this.MAP_WIDTH_TILES - 4 ||
                    y < 3 ||
                    y > this.MAP_HEIGHT_TILES - 4
                ) {
                    this.backgroundLayer.putTileAt(26, x, y);
                } else {
                    // Suelo normal
                    this.backgroundLayer.putTileAt(26, x, y);

                    // Añadir algunos obstáculos aleatorios
                    if (Math.random() < 0.05) {
                        // 2% chance
                        this.collisionLayer.putTileAt(13, x, y);
                    }
                }
            }
        }
    }

    private setupCollisions(): void {
        this.collisionLayer.setCollisionBetween(9, 13);

        this.physics.add.collider(this.player, this.collisionLayer);

        this.physics.add.collider(this.tears, this.collisionLayer, (tear) => {
            const sprite = tear as Phaser.Physics.Arcade.Sprite;
            sprite.setActive(false);
            sprite.setVisible(false);
        });
    }

    private createPlayer(): void {
        const startX = this.WORLD_WIDTH / 2;
        const startY = this.WORLD_HEIGHT / 2;

        this.player = this.physics.add.sprite(startX, startY, "playerSprite");
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.15);

        this.tears = this.physics.add.group({
            defaultKey: "tears",
            maxSize: 50,
        });
    }

    private setupCamera(): void {
        this.cameras.main.startFollow(this.player);

        this.cameras.main.setBounds(0, 0, this.WORLD_WIDTH, this.WORLD_HEIGHT);

        this.cameras.main.setLerp(1, 1);
    }

    private setupControls(): void {
        this.arrowKeys = this.input.keyboard!.createCursorKeys();
        this.wasdKeys = this.input.keyboard!.addKeys("W,S,A,D") as {
            W: Phaser.Input.Keyboard.Key;
            A: Phaser.Input.Keyboard.Key;
            S: Phaser.Input.Keyboard.Key;
            D: Phaser.Input.Keyboard.Key;
        };
    }

    private handlePlayerMovement(): void {
        let velocityX = 0;
        let velocityY = 0;

        if (this.wasdKeys.A.isDown) {
            velocityX = -this.PLAYER_SPEED;
        } else if (this.wasdKeys.D.isDown) {
            velocityX = this.PLAYER_SPEED;
        }

        if (this.wasdKeys.W.isDown) {
            velocityY = -this.PLAYER_SPEED;
        } else if (this.wasdKeys.S.isDown) {
            velocityY = this.PLAYER_SPEED;
        }

        // Normalizar la velocidad diagonal
        const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        if (length > 0) {
            velocityX = (velocityX / length) * this.PLAYER_SPEED;
            velocityY = (velocityY / length) * this.PLAYER_SPEED;
        }

        this.player.setVelocity(velocityX, velocityY);
    }

    private handlePlayerShooting(): void {
        const currentTime = this.time.now;

        if (currentTime - this.lastShotTime >= this.SHOT_COOLDOWN) {
            if (this.arrowKeys.up.isDown) {
                this.shootTears(0, -1);
                this.lastShotTime = currentTime;
            } else if (this.arrowKeys.down.isDown) {
                this.shootTears(0, 1);
                this.lastShotTime = currentTime;
            } else if (this.arrowKeys.left.isDown) {
                this.shootTears(-1, 0);
                this.lastShotTime = currentTime;
            } else if (this.arrowKeys.right.isDown) {
                this.shootTears(1, 0);
                this.lastShotTime = currentTime;
            }
        }
    }

    private shootTears(dirX: number, dirY: number): void {
        const tear = this.tears.get(this.player.x, this.player.y);

        if (tear) {
            tear.setActive(true);
            tear.setVisible(true);
            tear.setScale(0.15);
            tear.setVelocity(
                dirX * this.BULLET_SPEED,
                dirY * this.BULLET_SPEED
            );

            this.time.delayedCall(2000, () => {
                if (tear.active) {
                    tear.setActive(false);
                    tear.setVisible(false);
                }
            });
        }
    }

    private cleanupTears(): void {
        this.tears.children.entries.forEach((tear) => {
            const sprite = tear as Phaser.Physics.Arcade.Sprite;
            if (
                sprite.active &&
                (sprite.x < 0 ||
                    sprite.x > this.WORLD_WIDTH ||
                    sprite.y < 0 ||
                    sprite.y > this.WORLD_HEIGHT)
            ) {
                sprite.setActive(false);
                sprite.setVisible(false);
            }
        });
    }
}

export default GameComponent;
