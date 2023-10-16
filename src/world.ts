import { Timer } from './timer.ts';
import { Entity } from './entity.ts';
// World system for ticking world entities.

export class World {
    private _lastDelta = 0;
    private _timer: Timer;
    private _entities: Map<string, Entity> = new Map();
    public get lastDelta(): number {
        return this._lastDelta;
    }
    public readonly tickInterval;
    constructor(tickInterval = 60) {
        this.tickInterval = 1000 / tickInterval; // Calculate millisecond tick rate.
        this._timer = new Timer((delta) => {
            this.tick(delta);
        }, this.tickInterval);
    }
    private tick(delta: number): void {
        this._lastDelta = delta;
        for (const [_key, entity] of this._entities) {
            entity.tick(delta);
        }
    }
    public register<T extends Entity>(entity: T): string {
        const uuid = crypto.randomUUID();
        entity.uuid = uuid;
        this._entities.set(uuid, entity);
        return uuid;
    }
    public shutdown(): void {
        this._timer.cancel();
    }
}
