process.send({ ready: true });

process.on('message', msg => {
  process.send({ ok: true });
});
