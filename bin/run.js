'use strict';

const 
    slackClient = require('../server/slackClient'),
    service = require('../server/service'),
    http = require('http'),
    server = http.createServer(service),
    witToken = 'WIT_API_TOKEN',
    witClient = require('../server/witClient')(witToken),
    slackToken = 'SLACK_API_TOKEN',
    slackLogLevel = 'verbose',
    serviceRegistry = service.get('serviceRegistry'),
    rtm = slackClient.init(slackToken, slackLogLevel, witClient, serviceRegistry)

rtm.start()

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000))

server.on('listening', () => console.log(`IRIS is listening on ${server.address().port} in ${service.get('env')} mode.`))