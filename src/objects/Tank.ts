import SoundManager from '../managers/SoundManager'
import { IImage } from '../types/image'

class Tank extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body
    protected screen: Phaser.GameObjects.Container
    // variables
    protected health: number
    protected lastShoot: number
    protected speed: number

    public barrel: Phaser.GameObjects.Image
    protected lifeBar: Phaser.GameObjects.Graphics

    // game objects
    protected bullets: Phaser.GameObjects.Group

    constructor(i: IImage) {
        super(i.scene, i.x, i.y, i.texture, i.frame)
        this.screen = i.screen
        this.scene.add.existing(this)
        this.initImage()
    }

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    public initImage(): void {
        this.health = 1
        this.lastShoot = 0
        this.speed = 100

        // image
        this.setDepth(0)

        this.barrel = this.scene.add.image(0, 0, 'barrelBlue')
        this.barrel.setOrigin(0.5, 1)
        this.barrel.setDepth(1)

        this.lifeBar = this.scene.add.graphics()
        this.redrawLifebar()

        // game objects
        this.bullets = this.scene.add.group({
            /*classType: Bullet,*/
            active: true,
            maxSize: 10,
            runChildUpdate: true,
        })

        // physics
        this.scene.physics.world.enable(this)
        this.screen.add([this, this.lifeBar, this.barrel])
    }

    private redrawLifebar(): void {
        this.lifeBar.clear()
        this.lifeBar.fillStyle(0xe66a28, 1)
        this.lifeBar.fillRect(-this.width / 2, this.height / 2, this.width * this.health, 15)
        this.lifeBar.lineStyle(2, 0xffffff)
        this.lifeBar.strokeRect(-this.width / 2, this.height / 2, this.width, 15)
        this.lifeBar.setDepth(1)
    }

    public update(time: number, delta: number): void {
        this.barrel.x = this.x
        this.barrel.y = this.y
        this.lifeBar.x = this.x
        this.lifeBar.y = this.y
    }

    public updateHealth(): void {
        if (this.health > 0) {
            this.health -= 0.05
            this.redrawLifebar()
            SoundManager.playHitSound(new Phaser.Math.Vector2(this.x, this.y))
        }

        if (this.health <= 0) {
            this.destroy()
            this.barrel.destroy()
            this.lifeBar.destroy()
        }
    }
}

export default Tank
