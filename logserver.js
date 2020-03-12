process.env.TZ = "Asia/Shanghai";
const log4js = require('log4js');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
/** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- **/
if (cluster.isMaster) {
    log4js.configure({
        appenders: {
            file: {type: 'dateFile', filename: 'log/server.log', daysToKeep: 7, keepFileExt: true,
                layout: {
                    type: 'pattern',
                    pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %X{real_name} - %m'
                }
            },
            server: {type: 'tcp-server', host: '0.0.0.0', port: 5000}
        },
        categories: {
            default: {appenders: ['file'], level: 'debug'}
        }
    });

    for (i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
}