const kue = require("kue");
const redisMock = require("redis-mock");

const queue = kue.createQueue({
    redis: {
        createClientFactory: () => {
            return redisMock.createClient()
        },
    },
});

queue.create("pong", {}).removeOnComplete(true).save();

queue.process("pong", 1, (job, done) => {
    console.log("PONG");
    done();
});
