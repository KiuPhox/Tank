import GameManager from '../managers/GameManager'
import GameState from '../managers/GameState'
import PlayerDataManager from '../managers/PlayerDataManager'
import SoundManager from '../managers/SoundManager'
import GameScreen from './screens/GameScreen'
import HUDScreen from './screens/HUDScreen'
import MenuScreen from './screens/MenuScreen'
import PauseScreen from './screens/PauseScreen'

class GameScene extends Phaser.Scene {
    public zone: Phaser.GameObjects.Zone

    private gameScreen: GameScreen
    private menuScreen: MenuScreen
    private HUDScreen: HUDScreen
    private pauseScreen: PauseScreen

    constructor() {
        super({ key: 'GameScene' })
    }

    init(): void {
        GameManager.init(this)
        SoundManager.init(this)

        this.sound.setMute(!PlayerDataManager.getSound())
    }

    create(): void {
        this.createZone()

        this.gameScreen = new GameScreen({ scene: this }).setActive(false)
        this.menuScreen = new MenuScreen({ scene: this })
        this.HUDScreen = new HUDScreen({ scene: this }).setActive(false)
        this.pauseScreen = new PauseScreen({ scene: this }).setVisible(false)

        GameManager.emitter.on('state-changed', this.onGameStateChanged)
    }

    private createZone(): void {
        this.zone = this.add.zone(
            this.scale.width / 2,
            this.scale.height / 2,
            this.scale.width,
            this.scale.height
        )
    }

    update(time: number, delta: number): void {
        this.gameScreen.update(time, delta)
        this.menuScreen.update()
        const cameraPos = new Phaser.Math.Vector2(
            this.cameras.main.scrollX,
            this.cameras.main.scrollY
        )
        this.menuScreen.setPosition(cameraPos.x, cameraPos.y)
        this.HUDScreen.setPosition(cameraPos.x, cameraPos.y)
        this.pauseScreen.setPosition(
            cameraPos.x + this.scale.width / 2,
            cameraPos.y + this.scale.height / 2
        )
    }

    private onGameStateChanged = (gameState: GameState) => {
        if (gameState === GameState.READY) {
            //
        } else if (gameState === GameState.PLAYING) {
            this.gameScreen.setActive(true)
            this.HUDScreen.setActive(true)
            this.pauseScreen.setActive(false)
        } else if (gameState === GameState.PAUSE) {
            this.gameScreen.setLogicUpdate(false)
            this.HUDScreen.setActive(false)
            this.pauseScreen.setActive(true)
        }
    }
}

export default GameScene
