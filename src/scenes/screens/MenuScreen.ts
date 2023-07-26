import GameManager from '../../managers/GameManager'
import GameState from '../../managers/GameState'
import { IScreen } from '../../types/screen'
import GameScene from '../GameScene'
import BaseScreen from './BaseScreen'

class MenuScreen extends BaseScreen {
    private startKey: Phaser.Input.Keyboard.Key
    private bitmapTexts: Phaser.GameObjects.BitmapText[] = []
    private background: Phaser.GameObjects.Rectangle

    constructor(s: IScreen) {
        super(s)

        if (s.scene.input.keyboard) {
            this.startKey = s.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
            this.startKey.isDown = false
        }

        this.background = s.scene.add.rectangle(
            0,
            0,
            s.scene.scale.width + 100,
            s.scene.scale.height + 100,
            0x000000
        )
        this.bitmapTexts.push(s.scene.add.bitmapText(0, 0, 'font', 'PRESS S TO PLAY', 30))
        this.bitmapTexts.push(s.scene.add.bitmapText(0, 0, 'font', 'TANK', 100))

        Phaser.Display.Align.In.Center(this.bitmapTexts[0], (s.scene as GameScene).zone, 0, 30)
        Phaser.Display.Align.In.Center(this.bitmapTexts[1], (s.scene as GameScene).zone, 0, -30)
        Phaser.Display.Align.In.Center(this.background, (s.scene as GameScene).zone, 0, -30)

        this.add(this.background)
        this.add(this.bitmapTexts)

        GameManager.emitter.on('state-changed', this.onGameStateChanged)
    }

    update(): void {
        if (this.active && this.startKey.isDown) {
            GameManager.updateGameState(GameState.PLAYING)
        }
    }

    private onGameStateChanged = (gameState: GameState) => {
        if (gameState === GameState.READY) {
            this.setActive(true)
        } else {
            this.scene.add.tween({
                targets: this,
                alpha: 0,
                duration: 1000,
                onComplete: () => {
                    this.setActive(false)
                },
            })
        }
    }
}

export default MenuScreen
