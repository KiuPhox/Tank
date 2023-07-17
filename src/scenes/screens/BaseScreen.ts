import { IScreen } from '../../types/screen'

class BaseScreen extends Phaser.GameObjects.Container {
    constructor(s: IScreen) {
        super(s.scene, s.x, s.y)
        s.scene.add.existing(this)
    }

    public setActive(value: boolean): this {
        return this.setLogicUpdate(value).setVisible(value)
    }

    public setLogicUpdate(value: boolean): this {
        super.setActive(value)
        this.getAll().forEach((element) => {
            element.setActive(value)
        })
        return this
    }
}

export default BaseScreen
