import { Bullet } from './Bullet'
import { IImage } from '../types/image'
import Tank from './Tank'
import GameManager from '../managers/GameManager'
import GameState from '../managers/GameState'

export class Player extends Tank {
    body: Phaser.Physics.Arcade.Body

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private rotateKeyLeft: Phaser.Input.Keyboard.Key
    private rotateKeyRight: Phaser.Input.Keyboard.Key
    private shootingKey: Phaser.Input.Keyboard.Key

    public getBullets(): Phaser.GameObjects.Group {
        return this.bullets
    }

    constructor(i: IImage) {
        super(i)
    }

    public initImage() {
        super.initImage()

        // input
        if (this.scene.input.keyboard) {
            this.cursors = this.scene.input.keyboard.createCursorKeys()
            this.rotateKeyLeft = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
            this.rotateKeyRight = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
            this.shootingKey = this.scene.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.SPACE
            )
        }
    }

    update(time: number, delta: number): void {
        super.update(time, delta)
        if (this.active) {
            this.handleInput(delta)
            this.handleShooting()
        }
    }

    private handleInput(delta: number) {
        // move tank forward
        // small corrections with (- MATH.PI / 2) to align tank correctly
        if (this.cursors.up.isDown) {
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                this.speed,
                this.body.velocity
            )
        } else if (this.cursors.down.isDown) {
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                -this.speed,
                this.body.velocity
            )
        } else {
            this.body.setVelocity(0, 0)
        }

        // rotate tank
        if (this.cursors.left.isDown) {
            this.rotation -= 0.002 * delta
        } else if (this.cursors.right.isDown) {
            this.rotation += 0.002 * delta
        }

        // rotate barrel
        if (this.rotateKeyLeft.isDown) {
            this.barrel.rotation -= 0.005 * delta
        } else if (this.rotateKeyRight.isDown) {
            this.barrel.rotation += 0.005 * delta
        }
    }

    private handleShooting(): void {
        if (this.shootingKey.isDown && this.scene.time.now > this.lastShoot) {
            this.scene.cameras.main.shake(20, 0.005)
            this.scene.tweens.add({
                targets: this,
                props: { alpha: 0.8 },
                delay: 0,
                duration: 5,
                ease: 'Power1',
                easeParams: null,
                hold: 0,
                repeat: 0,
                repeatDelay: 0,
                yoyo: true,
                paused: false,
            })

            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        screen: this.screen,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletBlue',
                    })
                )

                this.lastShoot = this.scene.time.now + 80
            }
        }
    }

    public updateHealth(): void {
        super.updateHealth()
        if (this.health === 0) {
            this.scene.scene.start()
            GameManager.updateGameState(GameState.READY, this.scene)
        }
    }
}
