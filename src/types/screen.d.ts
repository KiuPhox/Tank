import GameScene from '../scenes/GameScene'

export interface IScreen {
    scene: GameScene
    x?: number
    y?: number
}
