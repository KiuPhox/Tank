import PlayerDataManager from '../../managers/PlayerDataManager'
import ScoreManager from '../../managers/ScoreManager'
import Button from '../../objects/buttons/Button'
import { IScreen } from '../../types/screen'
import BaseScreen from './BaseScreen'

class GameOverScreen extends BaseScreen {
    private modal: Phaser.GameObjects.NineSlice
    private newGameButton: Button
    private resultBitmapText: Phaser.GameObjects.BitmapText

    constructor(s: IScreen) {
        super(s)

        this.createModal()
        this.createNewGameButton()
        this.createResultBitmapText()

        ScoreManager.emitter.on('score-updated', this.handleScoreUpdated)
        ScoreManager.emitter.on('high-score-updated', this.handleHighScoreUpdated)
    }

    private createModal(): void {
        this.modal = this.scene.add.nineslice(
            0,
            0,
            'purpleMsg',
            undefined,
            600,
            600,
            50,
            50,
            50,
            50
        )
        this.add(this.modal)
    }

    private createNewGameButton(): void {
        this.newGameButton = new Button({
            scene: this.scene,
            x: 0,
            y: 130,
            width: 400,
            height: 120,
            leftWidth: 50,
            rightWidth: 50,
            topHeight: 50,
            bottomHeight: 50,
            text: 'New Game',
            size: 50,
            texture: 'greenBtn',
            scale: 1,
            pointerUpCallback: () => {
                this.scene.scene.start('GameScene')
            },
        })

        this.add(this.newGameButton)
    }

    private createResultBitmapText(): void {
        this.resultBitmapText = this.scene.add
            .bitmapText(
                0,
                -90,
                'font',
                ['High score: ' + PlayerDataManager.getHighScore(), 'Score: 0'],
                50,
                1
            )
            .setOrigin(0.5, 0.5)
            .setLineSpacing(28)

        this.add(this.resultBitmapText)
    }

    private handleScoreUpdated = (score: number) => {
        this.resultBitmapText.setText([
            this.resultBitmapText.text.split('\n')[0],
            'Score: ' + score,
        ])
    }

    private handleHighScoreUpdated = (score: number) => {
        this.resultBitmapText.setText([
            'High Score: ' + score,
            this.resultBitmapText.text.split('\n')[1],
        ])
    }

    public setActive(value: boolean): this {
        if (value) super.setActive(value)

        this.scene.add.tween({
            targets: this,
            scale: value ? 1 : 0,
            duration: 300,
            ease: value ? 'Back.out' : 'Quad.out',
            onComplete: () => {
                if (!value) {
                    super.setActive(value)
                }
            },
        })
        return this
    }
}

export default GameOverScreen
