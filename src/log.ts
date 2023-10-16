import * as log from '@log';

log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler('DEBUG'),
    },
    loggers: {
        'project-xeon': {
            level: 'DEBUG',
            handlers: ['console'],
        },
    },
});

const logger = log.getLogger('project-xeon');

export default logger;
