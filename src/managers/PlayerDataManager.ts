import { PlayerData } from '../types/player-data'

const INITIAL_PLAYER_DATA: PlayerData = {
    highScore: 0,
    sound: true,
}

class PlayerDataManager {
    public static getPlayerData(): PlayerData {
        try {
            const playerData = this.load()
            if (playerData) {
                return playerData
            }
        } catch (error) {
            console.error('Error retrieving player high score:', error)
        }

        return INITIAL_PLAYER_DATA
    }

    public static getHighScore(): number {
        return this.getPlayerData().highScore
    }

    public static setHighScore(highScore: number): void {
        const playerData = this.getPlayerData()
        playerData.highScore = highScore
        this.save(playerData)
    }

    public static getSound(): boolean {
        return this.getPlayerData().sound
    }

    public static setSound(sound: boolean): void {
        const playerData = this.getPlayerData()
        playerData.sound = sound
        this.save(playerData)
    }

    public static save(playerData: PlayerData): void {
        try {
            const serializedValue = JSON.stringify(playerData)
            localStorage.setItem('tank-player-data', serializedValue)
        } catch (error) {
            console.error(`Error saving player data:`, error)
        }
    }

    public static load(): PlayerData | null {
        try {
            const serializedValue = localStorage.getItem('tank-player-data')
            if (serializedValue !== null) {
                return JSON.parse(serializedValue)
            }
        } catch (error) {
            console.error(`Error loading player data:`, error)
        }
        return null
    }
}

export default PlayerDataManager
