import GameManager from '../../managers/GameManager'
import GameState from '../../managers/GameState'
import Button from '../../objects/buttons/Button'
import { IScreen } from '../../types/screen'
import GameScene from '../GameScene'
import BaseScreen from './BaseScreen'

class HUDScreen extends BaseScreen {
    private pauseButton: Button

    constructor(s: IScreen) {
        super(s)

        this.pauseButton = new Button({
            scene: s.scene,
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
}

export default HUDScreen
