import GameScene from '../scenes/GameScene'
import { Random } from '../utils/Random'

class SoundManager {
    private static scene: GameScene

    public static init(scene: GameScene) {
        this.scene = scene
    }

    public static playShootSound(source: Phaser.Math.Vector2) {
        if (this.isInsideCameraView(source)) {
            this.scene.sound.play('shoot', {
                detune: Random.Int(1, 200),
                volume: 0.6,
            })
        }
    }

    public static playHitSound(source: Phaser.Math.Vector2) {
        if (this.isInsideCameraView(source)) {
            this.scene.sound.play('hit', {
                detune: Random.Int(1, 200),
                volume: 0.3,
            })
        }
    }

    private static isInsideCameraView(source: Phaser.Math.Vector2): boolean {
        const cameraScroll = new Phaser.Math.Vector2(
            this.scene.cameras.main.scrollX,
            this.scene.cameras.main.scrollY
        )
        return (
            source.x - cameraScroll.x < this.scene.scale.width &&
            source.x - cameraScroll.x > 0 &&
            source.y - cameraScroll.y < this.scene.scale.height &&
            source.y - cameraScroll.y > 0
        )
    }
}

export default SoundManager
