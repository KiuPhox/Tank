export interface IButton {
    scene: Phaser.Scene
    x: number
    y: number
    texture: string
    frame?: string | number
    width?: number
    height?: number
    leftWidth?: number
    rightWidth?: number
    topHeight?: number
    bottomHeight?: number
    text?: string
    size?: number
    scale?: number
    pointerDownCallback?: () => void
    pointerUpCallback?: () => void
}

export interface ICheckbox {
    scene: Phaser.Scene
    x: number
    y: number
    textureChecked: string
    textureUnchecked: string
    checked?: boolean
    scale?: number
    pointerDownCallback?: () => void
    pointerUpCallback?: () => void
}
