import config from '../config.ts';
import logger from '../log.ts';
import { Arango, Collection } from '@arango';

export const kv = await Deno.openKv(config.deno.kv);

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

export async function ensureCollection<T>(
    name: string,
): Promise<Collection<T>> {
    try {
        return await db.collection(name);
    } catch (_) {
        return await db.createCollection(name);
    }
}

export default db;
