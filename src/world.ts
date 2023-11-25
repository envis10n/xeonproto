import { Timer } from './timer.ts';
import { Entity } from './entity.ts';
import { EventEmitter as EE } from 'https://deno.land/x/ee_ts@1.0.0/mod.ts';
// World system for ticking world entities.

interface Events {
    tick(delta: number): void;
}

export class World extends EE<Events> {
    private _lastDelta = 0;
    private _timer: Timer;
    private _entities: Map<string, Entity> = new Map();
    public get lastDelta(): number {
        return this._lastDelta;
    }
    public readonly tickInterval;
    constructor(tickInterval = 60) {
        super();
        this.tickInterval = 1000 / tickInterval; // Calculate millisecond tick rate.
        this._timer = new Timer((delta) => {
            this.tick(delta);
        }, this.tickInterval);
    }
    private tick(delta: number): void {
        this._lastDelta = delta;
        this.emit('tick', delta);
        for (const [_key, entity] of this._entities) {
            entity.tick(delta);
        }
    }
    public get<T extends Entity>(id: string): T | undefined {
        const ent = this._entities.get(id);
        if (ent == undefined) return undefined;
        return ent as T;
    }
    public register<T extends Entity>(entity: T): string {
        this._entities.set(entity.uuid, entity);
        return entity.uuid;
    }
    public shutdown(): void {
        this._timer.cancel();
    }
}

const world = new World(60);

export default world;
