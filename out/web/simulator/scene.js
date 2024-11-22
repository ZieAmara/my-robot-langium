import * as Entities from "./entities.js";
import { Vector } from "./utils.js";
export class BaseScene {
    constructor(size = new Vector(10000, 10000)) {
        this.entities = [];
        this.time = 0;
        this.timestamps = [];
        this.size = size;
        this.robot = new Entities.Robot(this.size.scale(0.5), new Vector(250, 250), 0, 30, this);
        this.entities.push(new Entities.Wall(Vector.null(), this.size.projX()));
        this.entities.push(new Entities.Wall(Vector.null(), this.size.projY()));
        this.entities.push(new Entities.Wall(this.size, this.size.projY()));
        this.entities.push(new Entities.Wall(this.size, this.size.projX()));
        this.timestamps.push(new Entities.Timestamp(0, this.robot));
    }
}
// You can add new Scenes here
//# sourceMappingURL=scene.js.map