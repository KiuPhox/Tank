import Bullet from './Bullet'
import { IImage } from '../types/image'
import Tank from './Tank'
import GameManager from '../managers/GameManager'
import GameState from '../managers/GameState'

const MOVEMENT_SPEED = 200
const ROTATE_SPEED = 0.005

class Player extends Tank {
    body: Phaser.Physics.Arcade.Body

    // input
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys
    private rotateKeyLeft: Phaser.Input.Keyboard.Key
    private rotateKeyRight: Phaser.Input.Keyboard.Key
    private shootingKey: Phaser.Input.Keyboard.Key

    private isShootingPointerDown: boolean

    constructor(i: IImage) {
        super(i)

        this.isShootingPointerDown = false

        this.scene.input.on('pointermove', this.handlePointerMove)
        this.scene.input.on('pointerdown', this.handlePointerDown)
        this.scene.input.on('pointerup', this.handlePointerUp)
    }

    public initImage() {
        super.initImage()

        // input
        if (this.scene.input.keyboard) {
            this.cursors = this.scene.input.keyboard.createCursorKeys()
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
                MOVEMENT_SPEED,
                this.body.velocity
            )
        } else if (this.cursors.down.isDown) {
            this.scene.physics.velocityFromRotation(
                this.rotation - Math.PI / 2,
                -MOVEMENT_SPEED,
                this.body.velocity
            )
        } else {
            this.body.setVelocity(0, 0)
        }

        // rotate tank
        if (this.cursors.left.isDown) {
            this.rotation -= ROTATE_SPEED * delta
        } else if (this.cursors.right.isDown) {
            this.rotation += ROTATE_SPEED * delta
        }
    }

    private handleShooting(): void {
        if (this.isShootingPointerDown && this.scene.time.now > this.lastShoot) {
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

    private handlePointerMove = (pointer: PointerEvent) => {
        const angle = new Phaser.Math.Vector2(
            pointer.x + this.scene.cameras.main.scrollX - this.x,
            pointer.y + this.scene.cameras.main.scrollY - this.y
        ).angle()

        this.barrel.rotation = angle + Math.PI / 2
    }
    private handlePointerDown = () => {
        this.isShootingPointerDown = true
    }
    private handlePointerUp = () => {
        this.isShootingPointerDown = false
    }

    public updateHealth(): void {
        super.updateHealth()
        if (this.health <= 0) {
            GameManager.updateGameState(GameState.GAME_OVER)
        }
    }

    destroy(fromScene?: boolean | undefined): void {
        this.scene.input.off('pointermove', this.handlePointerMove)
        this.scene.input.off('pointerdown', this.handlePointerDown)
        this.scene.input.off('pointerup', this.handlePointerUp)

        super.destroy(fromScene)
    }
}

export default Player
