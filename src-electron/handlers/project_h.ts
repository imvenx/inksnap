import { ConfigH } from "./config_h";
import { InkscapeH } from "./inkscape_h";

export abstract class ProjectH {

    static async init() {
        if (!ConfigH.projectPath) return

        await InkscapeH.closeInkscape()
        InkscapeH.openInkscape(ConfigH.projectPathSvg)
    }

}

