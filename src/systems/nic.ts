import { Entity } from '../entity.ts';
import world from '../world.ts';

export class NIC implements Entity {
    public gateway: string | null = null;
    private queue: Uint8Array[] = [];
    public readonly uuid = crypto.randomUUID();
    public tick(_delta: number): void {
        if (this.gateway == null) return; // No upstream gateway
        if (this.queue.length == 0) return; // Nothing in queue.
    }
}
