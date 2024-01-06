import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Field } from "./Field";

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createField();
    }

    createField() {
        const field = new Field(1, 1);
        this.container.addChild(field.sprite);
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.container.addChild(this.bg);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
    }
}