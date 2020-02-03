const express = require('express');
const router = express.Router();

const path = require('path');
const Queue = require('bull');
const queue = new Queue('TEST:BULL_SEPARATE');
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
