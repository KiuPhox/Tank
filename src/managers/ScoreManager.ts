import PlayerDataManager from './PlayerDataManager'

export class ScoreManager {
    private static curScore: number
    private static highScore: number

    public static emitter: Phaser.Events.EventEmitter

    public static init(): void {
        this.curScore = 0
        this.highScore = PlayerDataManager.getHighScore()
        this.emitter = new Phaser.Events.EventEmitter()
    }

    public static getScore(): number {
        return this.curScore
    }

    public static updateScore = (score: number) => {
        this.curScore = score

        if (this.curScore > this.highScore) {
            this.highScore = this.curScore

            PlayerDataManager.setHighScore(this.curScore)

            this.emitter.emit('high-score-updated', this.highScore)
        }
        this.emitter.emit('score-updated', this.curScore)
    }
}

export default ScoreManager
