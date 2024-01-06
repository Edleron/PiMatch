import { gsap } from "gsap";
import { App } from "../system/App";

export class Tile {
    constructor(color) {
        this.field      = null;
        
        this.color      = color;
        this.sprite     = App.sprite(this.color);

        this.sprite.anchor.set(0.5);
    }

    moveTo(position, duration) {
        return new Promise(resolve => {
            gsap.to(this.sprite, {
                duration,
                pixi: {
                    x: position.x,
                    y: position.y
                },
                onComplete: () => {
                    resolve();
                }
            });
        });
    }

    setPosition(position) {
        this.sprite.x   = position.x;
        this.sprite.y   = position.y;
    }
}