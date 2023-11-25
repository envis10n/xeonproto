import config from '../config.ts';
import { Server } from '@ws';
import logger from '../log.ts';
import { defaultSession, store } from './session.ts';

const server = new Server(config.ws.host, config.ws.port);

server.on('connect', (client) => {
    logger.info(`Client connected: ${client.uuid}`);
    store.set(client.uuid, defaultSession(client.uuid));
});

server.on('disconnect', (client, code, reason) => {
    let msg = `Client disconnected: ${client.uuid} | Code: ${code}`;
    if (reason != undefined) msg += ` | Reason: ${reason}`;
    logger.info(msg);
    store.delete(client.uuid);
});

server.on('message', (client, msg) => {
    logger.info(`[${client.uuid}] Message: ${msg}`);
});

server.on('binary', (client, chunk) => {
    logger.info(`[${client.uuid}] Binary: ${JSON.stringify(chunk)}`);
});

export default server;
