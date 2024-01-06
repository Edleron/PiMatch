import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Board } from "./Board";
import { Field } from "./Field";

export class Game extends Scene {
    create() {
        this.createBackground();
        this.createBoard();
    }

    createBoard() {
        this.board = new Board();
        this.container.addChild(this.board.container);
    }

    createBackground() {
        this.bg = App.sprite("bg");
        this.container.addChild(this.bg);
        this.bg.width = window.innerWidth;
        this.bg.height = window.innerHeight;
    }
}