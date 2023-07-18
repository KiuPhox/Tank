import GameManager from '../../managers/GameManager'
import GameState from '../../managers/GameState'
import PlayerDataManager from '../../managers/PlayerDataManager'
import Button from '../../objects/buttons/Button'
import Checkbox from '../../objects/buttons/Checkbox'
import { IScreen } from '../../types/screen'
import BaseScreen from './BaseScreen'

class PauseScreen extends BaseScreen {
    private soundCheckbox: Checkbox
    private continueButton: Button
    private newGameButton: Button
    private modal: Phaser.GameObjects.NineSlice

    constructor(s: IScreen) {
        super(s)

        this.createModal()
        this.createContinueButton()
        this.createNewGameButton()
        this.createSoundCheckbox()

        this.add([this.newGameButton, this.soundCheckbox])
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

    private createContinueButton(): void {
        this.continueButton = new Button({
            scene: this.scene,
            x: 0,
            y: 0,
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
                GameManager.updateGameState(GameState.PLAYING)
            },
        })
        this.add(this.continueButton)
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
    }

    private createSoundCheckbox(): void {
        this.soundCheckbox = new Checkbox({
            scene: this.scene,
            x: -100,
            y: -130,
            checked: false,
            textureChecked: 'checkedBox',
            textureUnchecked: 'uncheckedBox',
            pointerUpCallback: () => {
                this.soundCheckbox.trigger()
                PlayerDataManager.setSound(this.soundCheckbox.checked)
                this.scene.sound.setMute(!this.soundCheckbox.checked)
            },
        })

        this.soundCheckbox.setChecked(PlayerDataManager.getSound())

        this.add(this.scene.add.bitmapText(-50, -130, 'font', 'Sound', 50).setOrigin(0, 0.5))
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
