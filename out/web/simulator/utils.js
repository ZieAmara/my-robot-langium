export class Vector {
    static fromAngle(rad, norm) {
        return new Vector(Math.cos(rad) * norm, Math.sin(rad) * norm);
    }
    static null() {
        return new Vector(0, 0);
    }
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    plus(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    minus(other) {
        return new Vector(this.x - other.x, this.y - other.y);
    }
    scale(factor) {
        return new Vector(this.x * factor, this.y * factor);
    }
    projX() {
        return new Vector(this.x, 0);
    }
    projY() {
        return new Vector(0, this.y);
    }
    norm() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
export class Ray {
    constructor(origin, vector) {
        this.origin = origin;
        this.vector = vector;
    }
    intersect(entities) {
        let pois = [];
        for (var i = 0; i < entities.length; i++) {
            let e = entities[i];
            let entityPOI = e.intersect(this);
            console.log(entityPOI);
            pois = pois.concat(entityPOI);
        }
        return this.findClosestIntersection(pois);
    }
    findClosestIntersection(pois) {
        let idx = 0;
        let minDist = Infinity;
        if (pois.length > 0) {
            for (var i = 0; i < pois.length; i++) {
                let d = this.origin.minus(pois[i]).norm();
                if (d < minDist) {
                    minDist = d;
                    idx = i;
                }
            }
            return pois[idx];
        }
        else {
            return undefined;
        }
    }
    getPoiFinder() {
        return (p1, p2) => {
            const P = p1.minus(p2);
            const V = this.vector;
            const den = P.x * V.y - V.x * P.y;
            if (den != 0) {
                const I = p1.minus(this.origin);
                let nomT = I.x * V.y - V.x * I.y;
                let nomU = P.x * I.y - I.x * P.y;
                let t = nomT / den;
                let u = -nomU / den;
                if (t > 0 && t < 1 && u > 0) {
                    return p1.plus(P.scale(-t));
                }
            }
            return undefined;
        };
    }
}
//# sourceMappingURL=utils.js.map