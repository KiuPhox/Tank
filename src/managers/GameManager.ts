import GameState from './GameState'

class GameManager {
    private static currentState: GameState = GameState.READY
    private static previousState: GameState = GameState.READY

    public static emitter: Phaser.Events.EventEmitter

    public static init(): void {
        this.emitter = new Phaser.Events.EventEmitter()
    }

    public static updateGameState(gameState: GameState, scene: Phaser.Scene): void {
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
