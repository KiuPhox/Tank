import { ICheckbox } from '../../types/button'

class Checkbox extends Phaser.GameObjects.Image {
    public pointerDownCallback?: () => void
    public pointerUpCallback?: () => void

    private textureChecked: string
    private textureUnchecked: string

    private defaultScale: number
    private isDown: boolean

    public checked: boolean

    constructor(c: ICheckbox) {
        super(c.scene, c.x, c.y, c.checked ? c.textureChecked : c.textureUnchecked)
        c.scene.add.existing(this)

        this.textureChecked = c.textureChecked
        this.textureUnchecked = c.textureUnchecked

        this.defaultScale = c.scale ?? 1
        this.setScale(this.defaultScale)

        this.isDown = false
        this.checked = c.checked ?? false

        this.pointerDownCallback = c.pointerDownCallback
        this.pointerUpCallback = c.pointerUpCallback

        this.setInteractive()
        this.on('pointerdown', this.onPointerDown)
        this.on('pointerup', this.onPointerUp)
        this.on('pointerout', this.onPointerOut)
        this.on('pointerover', this.onPointerOver)
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

    public setChecked(checked: boolean) {
        this.checked = checked
        this.setTexture(this.checked ? this.textureChecked : this.textureUnchecked)
    }

    public trigger(): void {
        this.setChecked(!this.checked)
    }
}
export default Checkbox
