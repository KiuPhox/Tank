import GameScene from '../scenes/GameScene'
import GameState from './GameState'

class GameManager {
    private static scene: GameScene

    private static currentState: GameState = GameState.READY
    private static previousState: GameState = GameState.READY

    public static emitter: Phaser.Events.EventEmitter

    public static init(scene: GameScene): void {
        this.scene = scene
        this.emitter = new Phaser.Events.EventEmitter()
    }

    public static updateGameState(gameState: GameState): void {
        if (this.currentState === gameState) return
        this.previousState = this.currentState
        this.currentState = gameState

        // switch (this.currentState) {

        // }

        this.emitter.emit('state-changed', this.currentState, this.previousState)
    }

    public static getCurrentState(): GameState {
        return this.currentState
    }

    public static getPreviousState(): GameState {
        return this.previousState
    }
}

export default GameManager
