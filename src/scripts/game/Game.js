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
        this.processFallDown();
    }

    processFallDown() {
        return new Promise(resolve => {
            let completed = 0;
            let started = 0;

            // check all fields of the board starting from the bottom row
            for (let row = this.board.rows - 1; row >= 0; row--) {
                for (let col = this.board.cols - 1; col >= 0; col--) {
                    const field = this.board.getField(row, col);

                    // if there is no tile in the field
                    if (!field.tile) {
                        ++started;

                        // shift all tiles that are in the same col in all the rows above
                        this.fallDownTo(field).then(() => {
                            ++completed;

                            if (completed >= started) {
                                resolve();
                            }
                        });
                    }
                }
            }


        });
    }

    fallDownTo(emptyField) {
        // check all board fields in the found empty field col but in all higher rows
        for (let row = emptyField.row - 1; row >= 0; row--) {
            let fallingField = this.board.getField(row, emptyField.col);

            // find the first field with a tile
            if (fallingField.tile)  {
                // the first found tile will be placed in the curr empty field
                const fallingTile = fallingField.tile;
                fallingTile.field = emptyField;
                emptyField.tile = fallingTile;
                fallingField.tile = null;

                // run the tile move method and stop searching a tile for that empty field
                return fallingTile.fallDownTo(emptyField.position);
           }
        }

        return Promise.resolve();
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