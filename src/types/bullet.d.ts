export interface IBulletConstructor {
    scene: Phaser.Scene
    screen: Phaser.GameObjects.Container
    rotation: number
    x: number
    y: number
    texture: string
    frame?: string | number
}
