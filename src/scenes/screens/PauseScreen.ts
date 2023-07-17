import GameManager from '../../managers/GameManager'
import GameState from '../../managers/GameState'
import Button from '../../objects/buttons/Button'
import { IScreen } from '../../types/screen'
import BaseScreen from './BaseScreen'

class PauseScreen extends BaseScreen {
    private continueButton: Button
    private newGameButton: Button
    private modal: Phaser.GameObjects.NineSlice

    constructor(s: IScreen) {
        super(s)

        this.createModal()
        this.createContinueButton()
        this.createNewGameButton()

        this.add([this.modal, this.continueButton, this.newGameButton])
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
    }

    private createContinueButton(): void {
        this.continueButton = new Button({
            scene: this.scene,
            x: 0,
            y: -60,
            width: 400,
            height: 120,
            leftWidth: 50,
            rightWidth: 50,
            topHeight: 50,
            bottomHeight: 50,
            text: 'Continue',
            size: 50,
            texture: 'blueBtn',
            scale: 1,
            pointerUpCallback: () => {
                GameManager.updateGameState(GameState.PLAYING, this.scene)
            },
        })
    }

    private createNewGameButton(): void {
        this.newGameButton = new Button({
            scene: this.scene,
            x: 0,
            y: 60,
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

export default PauseScreen
