import { sleep } from './src/timer.ts';
import world from './src/world.ts';
import { close as authClose } from './src/account/auth.ts';
import server from './src/network/ws.ts';
import logger from './src/log.ts';

logger.info('World created.');

server.listen();
logger.info(`[WS] Listening on ws://${server.hostname}:${server.port}/`);

Deno.addSignalListener('SIGINT', async () => {
    logger.info('Shutting down...');
    await server.close();
    world.shutdown();
    authClose();
    logger.info('Shutdown complete. Goodbye!');
    await sleep(2500);
});
