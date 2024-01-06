import { Tools } from "../system/Tools";
import { Game } from "./Game";

export const Config = {
    scenes: {
        Game
    },
    loader: Tools.massiveRequire(require["context"]('./../../sprites/', true, /\.(mp3|png|jpe?g)$/))
};