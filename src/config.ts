import * as toml from '@toml';
import * as _log from '@log';
import logger from './log.ts';
import * as _path from '@std/path/mod.ts';

export interface XEONConfig {
    arango: {
        uri: string;
        username?: string;
        password?: string;
        token?: string;
    };
    deno: {
        kv?: string;
    };
    logging: {
        level?: _log.LevelName;
    };
    ws: {
        host: string;
        port: number;
    };
}

const _default_conf: string = toml.stringify({
    arango: {
        uri: 'http://localhost:8529/_db/pxeon',
        username: 'pxeon',
        password: 'pxeon',
        jwt: undefined,
    },
    deno: {
        kv: './deno.db',
    },
    logging: {
        level: 'DEBUG',
    },
    ws: {
        host: '127.0.0.1',
        port: 3000,
    },
});

const CONFIG_PATH = _path.resolve(Deno.cwd(), './xeon.toml');

try {
    Deno.statSync(CONFIG_PATH);
} catch (_e) {
    logger.warning(
        'Configuration file missing! Creating empty configuration file...',
    );
    Deno.writeTextFileSync(CONFIG_PATH, _default_conf);
}

let _toml: XEONConfig | undefined = undefined;

try {
    _toml = toml.parse(
        Deno.readTextFileSync(CONFIG_PATH),
    ) as unknown as XEONConfig;
} catch (e) {
    logger.error(e);
    Deno.exit(1);
}

if (_toml == undefined) Deno.exit(1);

logger.levelName = _toml.logging.level || 'DEBUG';

logger.debug('Configuration loaded.');

const _config: XEONConfig = _toml;

export default _config;
