import GameManager from '../../managers/GameManager'
import GameState from '../../managers/GameState'
import ScoreManager from '../../managers/ScoreManager'
import Button from '../../objects/buttons/Button'
import { IScreen } from '../../types/screen'
import GameScene from '../GameScene'
import BaseScreen from './BaseScreen'

class HUDScreen extends BaseScreen {
    private pauseButton: Button
    private scoreBitmapText: Phaser.GameObjects.BitmapText

    constructor(s: IScreen) {
        super(s)

        this.createPauseButton()
        this.createScoreBitmapText()

        ScoreManager.emitter.on('score-updated', this.handleScoreUpdated)
    }

    private createPauseButton(): void {
        this.pauseButton = new Button({
            scene: this.scene,
            x: 0,
            y: 0,
            texture: 'pauseIcon',
            scale: 1,
            width: 104,
            height: 90,
            pointerUpCallback: () => {
                GameManager.updateGameState(GameState.PAUSE)
            },
        })

        Phaser.Display.Align.In.TopRight(this.pauseButton, (this.scene as GameScene).zone, -60, -60)

        this.add(this.pauseButton)
    }

    private createScoreBitmapText(): void {
        this.scoreBitmapText = this.scene.add.bitmapText(0, 0, 'font', '0', 64)

        Phaser.Display.Align.In.TopCenter(
            this.scoreBitmapText,
            (this.scene as GameScene).zone,
            0,
            -28
        )

        this.add(this.scoreBitmapText)
    }

    private handleScoreUpdated = (score: number) => {
        this.scoreBitmapText.setText(score.toString())
    }
}

export default HUDScreen
