import { IButton } from '../../types/button'

export default class Button extends Phaser.GameObjects.Container {
    public pointerDownCallback?: () => void
    public pointerUpCallback?: () => void

    private defaultScale: number
    private isDown: boolean

    private button: Phaser.GameObjects.NineSlice
    private text: Phaser.GameObjects.BitmapText

    constructor(b: IButton) {
        super(b.scene, b.x, b.y)
        b.scene.add.existing(this)

        this.pointerDownCallback = b.pointerDownCallback
        this.pointerUpCallback = b.pointerUpCallback

        this.button = b.scene.add.nineslice(
            0,
            0,
            b.texture,
            b.frame,
            b.width,
            b.height,
            b.leftWidth,
            b.rightWidth,
            b.topHeight,
            b.bottomHeight
        )

        this.defaultScale = b.scale ?? 1
        this.setScale(this.defaultScale)

        this.isDown = false

        this.button.setInteractive()
        this.button.on('pointerdown', this.onPointerDown)
        this.button.on('pointerup', this.onPointerUp)
        this.button.on('pointerout', this.onPointerOut)
        this.button.on('pointerover', this.onPointerOver)

        this.text = this.scene.add.bitmapText(0, 0, 'font', b.text, b.size)
        Phaser.Display.Align.In.Center(this.text, this.button)

        this.add([this.button, this.text])
    }

    private onPointerDown = () => {
        this.setScale(this.defaultScale * 0.9)
        this.isDown = true
        if (this.pointerDownCallback !== undefined) {
            this.pointerDownCallback()
        }
    }

    private onPointerUp = () => {
        this.setScale(this.defaultScale)
        if (this.isDown) {
            this.isDown = false
            if (this.pointerUpCallback !== undefined) {
                this.pointerUpCallback()
            }
        }
    }

    private onPointerOver = () => {
        this.scene.add.tween({
            targets: this,
            scale: this.defaultScale * 1.1,
            duration: 100,
        })
    }

    private onPointerOut = () => {
        this.scene.add.tween({
            targets: this,
            scale: this.defaultScale,
            duration: 100,
        })
    }
}
