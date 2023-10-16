import config from './src/config.ts';
import { Entity } from './src/entity.ts';
import { World } from './src/world.ts';

class TestEnt implements Entity {
    public uuid = '';
    public tick(delta: number): void {
        console.log('Test Tick', delta, 'ms');
    }
}

const world = new World(144);

const test = world.register(new TestEnt());

Deno.addSignalListener('SIGINT', () => {
    console.log('Shutting down...');
    world.shutdown();
});
