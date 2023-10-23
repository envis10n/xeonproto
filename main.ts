import { sleep } from './src/timer.ts';
import { World } from './src/world.ts';
import { close as authClose } from './src/auth.ts';
import logger from './src/log.ts';

const world = new World(60);
logger.info('World created.');

Deno.addSignalListener('SIGINT', async () => {
    logger.info('Shutting down...');
    world.shutdown();
    authClose();
    logger.info('Shutdown complete. Goodbye!');
    await sleep(2500);
});
