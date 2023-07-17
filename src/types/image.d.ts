export interface IImage {
    scene: Phaser.Scene
    screen: Phaser.GameObjects.Container
    x: number
    y: number
    texture: string
    frame?: string | number
}
