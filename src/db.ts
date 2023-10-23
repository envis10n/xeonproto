import config from './config.ts';
import logger from './log.ts';
import { Arango, Collection } from '@arango';

const db: Arango = await (async () => {
    if (
        config.arango.token == undefined
    ) {
        // Basic
        if (
            config.arango.username != undefined &&
            config.arango.password != undefined
        ) {
            return await Arango.basicAuth({
                uri: config.arango.uri,
                username: config.arango.username,
                password: config.arango.password,
            });
        } else {
            logger.critical('Missing ArangoDB credentials!');
            Deno.exit(1);
        }
    } else {
        // JWT
        return await Arango.jwtAuth({
            uri: config.arango.uri,
            jwt: config.arango.token,
        });
    }
})();

export default db;
