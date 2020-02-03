const express = require('express');
const router = express.Router();

const { REDIS_STRING, REDIS_PASSWORD, REDIS_HOST, REDIS_PORT } = process.env;
console.log(REDIS_STRING)

const path = require('path');
const Queue = require('bull');
const queue = new Queue('TEST:BULL_SEPARATE', {
  // do not pass redis url in constructor if supplying ioredis options directly:
  redis: {
    host: REDIS_HOST,
    port: REDIS_PORT,
    db: 0,
    tls: {},
    password: REDIS_PASSWORD,
    connectTimeout: 30000
  },
  // ... another Queue options ...
});
queue.process(1, path.join(__dirname, '../', 'queues/test.js'));
const { setQueues } = require('bull-board');
let queues = [
  queue,
];
setQueues(queues);

router.route('/')
.get(async (req, res) => {
  // let job = 
  await queue.add({}, {
    delay: 1000
  });
  
  return res.json({
    success: true
  });
});

module.exports = router;
