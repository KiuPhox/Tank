import GameManager from '../managers/GameManager'
import GameState from '../managers/GameState'
import PlayerDataManager from '../managers/PlayerDataManager'
import ScoreManager from '../managers/ScoreManager'
import SoundManager from '../managers/SoundManager'
import GameOverScreen from './screens/GameOverScreen'
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
    private gameOverScreen: GameOverScreen

    private mainCamera: Phaser.Cameras.Scene2D.Camera
    private uiCamera: Phaser.Cameras.Scene2D.Camera
    public blurFx: Phaser.FX.Blur

    constructor() {
        super({ key: 'GameScene' })
    }

    init(): void {
        GameManager.init(this)
        SoundManager.init(this)
        ScoreManager.init()

        this.sound.setMute(!PlayerDataManager.getSound())
    }

    create(): void {
        this.createZone()

        this.gameScreen = new GameScreen({ scene: this }).setActive(false)
        this.menuScreen = new MenuScreen({ scene: this })
        this.HUDScreen = new HUDScreen({ scene: this }).setActive(false)
        this.pauseScreen = new PauseScreen({ scene: this })
            .setVisible(false)
            .setPosition(this.scale.width / 2, this.scale.height / 2)
        this.gameOverScreen = new GameOverScreen({ scene: this })
            .setVisible(false)
            .setPosition(this.scale.width / 2, this.scale.height / 2)

        this.mainCamera = this.cameras.main
        this.uiCamera = this.cameras.add()

        this.mainCamera.ignore([
            this.menuScreen,
            this.HUDScreen,
            this.pauseScreen,
            this.gameOverScreen,
        ])

        this.uiCamera.ignore(this.gameScreen)

        this.blurFx = this.mainCamera.postFX.addBlur(0, 0, 0, 0)

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
    }

    private onGameStateChanged = (gameState: GameState) => {
        if (gameState === GameState.READY) {
            //
        } else if (gameState === GameState.PLAYING) {
            this.gameScreen.setActive(true)
            this.HUDScreen.setActive(true)
            this.pauseScreen.setActive(false)
            this.gameOverScreen.setActive(false)
        } else if (gameState === GameState.PAUSE) {
            this.gameScreen.setLogicUpdate(false)
            this.HUDScreen.setActive(false)
            this.pauseScreen.setActive(true)
        } else if (gameState === GameState.GAME_OVER) {
            this.gameScreen.setLogicUpdate(false)
            this.HUDScreen.setActive(false)
            this.gameOverScreen.setActive(true)
        }
    }
}

export default GameScene
