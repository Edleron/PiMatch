import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Board } from "./Board";
import { Field } from "./Field";

export class Game extends Scene {
    create() {
        this.selectedTile   = null;
        this.createBackground();
        this.createBoard();
    }

    createBoard() {
        this.board          = new Board();

        this.container.addChild(this.board.container);
        this.board.container.on("tile-touch-start", this.onTileClick.bind(this));
    }

    onTileClick(tile) {
        // 1 -> Select a new tile if there are no more selected
        // 2 -> swap tles if there one selected
        // 3 -> select a new tile if 

        if (!this.selectedTile) {
            this.selectTile(tile);
        }
    }

    selectTile(tile) {
        // -> Remember
        this.selectedTile = tile;

        // -> Highlight
        this.selectedTile.field.select();
    }

    createBackground() {
        this.bg             = App.sprite("bg");       
        this.bg.width       = window.innerWidth;
        this.bg.height      = window.innerHeight;

        this.container.addChild(this.bg);
    }
}