import GameManager from '../../managers/GameManager'
import GameState from '../../managers/GameState'
import Bullet from '../../objects/Bullet'
import Enemy from '../../objects/Enemy'
import Player from '../../objects/Player'
import Obstacle from '../../objects/Obstacle'
import { IScreen } from '../../types/screen'
import BaseScreen from './BaseScreen'

class GameScreen extends BaseScreen {
    private map: Phaser.Tilemaps.Tilemap
    private tileset: Phaser.Tilemaps.Tileset | null
    private layer: Phaser.Tilemaps.TilemapLayer | null

    private player: Player
    private enemies: Phaser.GameObjects.Group
    private obstacles: Phaser.GameObjects.Group

    constructor(s: IScreen) {
        super(s)

        this.createTileMap()
        this.createObstaclesAndEnemies()
        this.createColliders()

        GameManager.emitter.on('state-changed', this.onGameStateChanged)
    }

    private createTileMap(): void {
        this.map = this.scene.make.tilemap({ key: 'levelMap' })

        this.tileset = this.map.addTilesetImage('tiles')
        if (!this.tileset) return
        this.layer = this.map.createLayer('tileLayer', this.tileset, 0, 0)

        if (!this.layer) return
        this.layer.setCollisionByProperty({ collide: true })

        this.add(this.layer)
    }

    private createObstaclesAndEnemies(): void {
        this.obstacles = this.scene.add.group({ runChildUpdate: true })
        this.enemies = this.scene.add.group({})
        this.convertObjects()
    }

    private createColliders(): void {
        if (this.layer) {
            this.scene.physics.add.collider(this.player, this.layer)
            this.scene.physics.add.collider(this.player, this.obstacles)
            this.scene.physics.add.collider(
                this.player.getBullets(),
                this.layer,
                this.bulletHitLayer,
                undefined,
                this
            )
            this.scene.physics.add.collider(
                this.player.getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                undefined,
                this
            )
        }

        this.enemies.children.each((gameObject: Phaser.GameObjects.GameObject): boolean | null => {
            const enemy = gameObject as Enemy
            this.scene.physics.add.overlap(
                this.player.getBullets(),
                enemy,
                this.playerBulletHitEnemy,
                undefined,
                this
            )
            this.scene.physics.add.overlap(
                enemy.getBullets(),
                this.player,
                this.enemyBulletHitPlayer,
                undefined
            )

            this.scene.physics.add.collider(
                enemy.getBullets(),
                this.obstacles,
                this.bulletHitObstacles,
                undefined
            )

            if (this.layer) {
                this.scene.physics.add.collider(
                    enemy.getBullets(),
                    this.layer,
                    this.bulletHitLayer,
                    undefined
                )
            }

            return null
        }, this)
    }

    update(time: number, delta: number): void {
        this.player.update(time, delta)

        this.enemies.children.each((gameObject: Phaser.GameObjects.GameObject): boolean | null => {
            const enemy = gameObject as Enemy
            enemy.update(time, delta)
            if (this.player.active && enemy.active) {
                const angle = Phaser.Math.Angle.Between(
                    enemy.body.x,
                    enemy.body.y,
                    this.player.body.x,
                    this.player.body.y
                )

                enemy.barrel.angle = (angle + Math.PI / 2) * Phaser.Math.RAD_TO_DEG
            }
            return null
        }, this)
    }

    private convertObjects(): void {
        // find the object layer in the tilemap named 'objects'
        const objects = this.map.getObjectLayer('objects')?.objects as any[]

        objects.forEach((object) => {
            if (object.type === 'player') {
                this.player = new Player({
                    scene: this.scene,
                    screen: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankBlue',
                })
            } else if (object.type === 'enemy') {
                const enemy = new Enemy({
                    scene: this.scene,
                    screen: this,
                    x: object.x,
                    y: object.y,
                    texture: 'tankRed',
                })
                this.enemies.add(enemy)
            } else {
                const obstacle = new Obstacle({
                    scene: this.scene,
                    screen: this,
                    x: object.x,
                    y: object.y - 40,
                    texture: object.type,
                })
                this.add(obstacle)
                this.obstacles.add(obstacle)
            }
        })
    }

    private bulletHitLayer = (
        object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        const bullet = object1 as Bullet
        bullet.destroy()
    }

    private bulletHitObstacles = (
        object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        const bullet = object1 as Bullet
        bullet.destroy()
    }

    private enemyBulletHitPlayer = (
        object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        const bullet = object1 as Bullet
        const player = object2 as Player
        bullet.destroy()
        player.updateHealth()
    }

    private playerBulletHitEnemy = (
        object1: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody,
        object2: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody
    ) => {
        const bullet = object1 as Bullet
        const enemy = object2 as Enemy
        bullet.destroy()
        enemy.updateHealth()
    }

    private onGameStateChanged = (gameState: GameState) => {
        if (gameState === GameState.PLAYING) {
            this.scene.cameras.main.startFollow(this.player, false, 0.01, 0.01)
            this.scene.cameras.main.setBounds(0, 0, this.layer?.width ?? 0, this.layer?.height ?? 0)
        } else if (gameState === GameState.READY) {
            this.scene.cameras.main.stopFollow().setScroll(0, 0)
        }
    }
}

export default GameScreen
