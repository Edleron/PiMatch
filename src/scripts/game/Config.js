import { Tools } from "../system/Tools";
import { Game } from "./Game";

export const Config = {
    scenes: {
        Game
    },
    board: { rows: 6, cols: 6 },
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/))
};