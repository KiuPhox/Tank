import SoundManager from '../managers/SoundManager'
import { IBulletConstructor } from '../types/bullet'

class Bullet extends Phaser.GameObjects.Image {
    body: Phaser.Physics.Arcade.Body

    private bulletSpeed: number

    constructor(b: IBulletConstructor) {
        super(b.scene, b.x, b.y, b.texture)

        this.rotation = b.rotation
        this.initImage()
        this.scene.add.existing(this)
        b.screen.add(this)

        SoundManager.playShootSound(new Phaser.Math.Vector2(b.x, b.y))
    }

    private initImage(): void {
        // variables
        this.bulletSpeed = 1000

        // image
        this.setOrigin(0.5, 0.5)
        this.setDepth(2)

        // physics
        this.scene.physics.world.enable(this)
        this.scene.physics.velocityFromRotation(
            this.rotation - Math.PI / 2,
            this.bulletSpeed,
            this.body.velocity
        )
    }
}

export default Bullet
