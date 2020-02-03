const timeout = (ms=10000) => new Promise(res => setTimeout(res, ms))

module.exports = async function(job) {
  try {
    console.log('test begin...')
    await timeout();
    console.log('test done')
    return Promise.resolve();
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
}