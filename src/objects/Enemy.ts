import { Bullet } from './Bullet'
import { IImage } from '../types/image'
import Tank from './Tank'
import { Random } from '../utils/Random'

export class Enemy extends Tank {
    body: Phaser.Physics.Arcade.Body

    constructor(i: IImage) {
        super(i)
    }

    public initImage() {
        super.initImage()

        this.barrel.setTexture('barrelRed')

        // tweens
        this.scene.tweens.add({
            targets: this,
            props: { y: this.y - 200 },
            delay: 0,
            duration: 2000,
            ease: 'Linear',
            easeParams: null,
            hold: 0,
            repeat: -1,
            repeatDelay: 0,
            yoyo: true,
        })
    }

    update(time: number, delta: number): void {
        super.update(time, delta)
        if (this.active) {
            this.handleShooting()
        }
    }

    private handleShooting(): void {
        if (this.scene.time.now > this.lastShoot) {
            if (this.bullets.getLength() < 10) {
                this.bullets.add(
                    new Bullet({
                        scene: this.scene,
                        screen: this.screen,
                        rotation: this.barrel.rotation,
                        x: this.barrel.x,
                        y: this.barrel.y,
                        texture: 'bulletRed',
                    })
                )

                this.lastShoot = this.scene.time.now + Random.Int(400, 1000)
            }
        }
    }
}
