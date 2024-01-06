import { App } from "../system/App";
import { Scene } from "../system/Scene";
import { Board } from "./Board";
import { CombinationManager } from "./CombinationManager";
import { Field } from "./Field";

export class Game extends Scene {
    create() {
        this.disabled       = false;
        this.selectedTile   = null;
        this.createBackground();
        this.createBoard();
        this.combinationManager = new CombinationManager(this.board);
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

        if (this.disabled) {
            return;
        }

        if (!this.selectedTile) {
            this.selectTile(tile);
        } else {

            if (!this.selectedTile.isNeighbour(tile)) {
                this.clearSelection();
                this.selectTile(tile);
            } else {
                this.swap(this.selectedTile, tile);
            }           
        }
    }

    selectTile(tile) {
        // -> Remember
        this.selectedTile = tile;

        // -> Highlight
        this.selectedTile.field.select();
    }

    swap(selectedTile, tile) {
        this.disabled = true; // lock the board to prevent tiles movement while the animation is already running
        this.clearSelection(); // hide the "field-selected"

        selectedTile.moveTo(tile.field.position, 0.2);
        tile.moveTo(selectedTile.field.position, 0.2).then(() => {
            this.board.swap(selectedTile, tile);
            // ...
            const matches = this.combinationManager.getMatches();
            if (matches.length) {
                this.processMatches(matches);
            }
            console.log(matches);
            // ...
            this.disabled = false; // lock the board
        });

        // 1. reset fields in moved tiles
        // 2. reset tiles in the board's fields
        // 3. place the moved tiles in the new positions of the new fields
    }

    processMatches(matches) {
        this.removeMatches(matches);
    }

    removeMatches(matches) {
        matches.forEach(match => {
            match.forEach(tile => {
                tile.remove();
            });
        });
    }

    clearSelection() {
        if (this.selectedTile) {
            this.selectedTile.field.unselect();
            this.selectedTile = null
        }
    }

    createBackground() {
        this.bg             = App.sprite("bg");       
        this.bg.width       = window.innerWidth;
        this.bg.height      = window.innerHeight;

        this.container.addChild(this.bg);
    }
}