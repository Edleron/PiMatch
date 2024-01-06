import { Tools } from "../system/Tools";
import { Game } from "./Game";

export const Config = {
    scenes: {
        Game
    },
    tilesColors: ["blue", "green", "orange", "pink", "red", "yellow"],
    board: { rows: 6, cols: 6 },
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/))
};