import { App } from "../system/App";
import * as PIXI from "pixi.js";
import { Field } from "./Field";
import { TileFactory } from "./TileFactory";

export class Board {
    constructor() {
        this.container      = new PIXI.Container();
        this.fields         = [];
        this.rows           = App.config.board.rows;
        this.cols           = App.config.board.cols;

        this.create();
        this.ajustPosition();
    }

    ajustPosition() {
        this.fieldSize      = this.fields[0].sprite.width;
        this.width          = this.cols * this.fieldSize;
        this.height         = this.rows * this.fieldSize;

        // Tam ortaya alma
        this.container.x    = (window.innerWidth - this.width) / 2 + this.fieldSize / 2;
        this.container.y    = (window.innerHeight - this.height) / 2 + this.fieldSize / 2;
    }

    create() {
        this.createFields();
        this.createTiles();
    }

    createTiles() {
        this.fields.forEach(field => this.createTile(field));
    }

    createTile(field) {
        const tile          = TileFactory.generate();

        field.setTile(tile);
        this.container.addChild(tile.sprite);
    }

    createFields() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.createField(row, col);
            }
        }
    }

    createField(row, col) {
        const field         = new Field(row, col);

        this.fields.push(field);
        this.container.addChild(field.sprite);
    }
}