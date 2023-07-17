import BootScene from './scenes/BootScene'
import GameScene from './scenes/GameScene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
    title: 'Tank',
    url: 'https://github.com/digitsensitive/phaser3-typescript',
    version: '2.0',
    scale: {
        width:
            window.innerWidth > window.innerHeight
                ? (1200 * window.innerWidth) / window.innerHeight
                : 1600,
        height: 1200,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    zoom: 0.6,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, GameScene],
    input: {
        keyboard: true,
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            // debug: true,
        },
    },

    backgroundColor: '#000000',
    render: { pixelArt: false, antialias: true },
}
