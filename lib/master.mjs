import { fork } from 'child_process';
import { performance } from 'perf_hooks';
import genObject from './gen-object.mjs';

export async function forkIt(forkOptions = {}, masterOptions = {}, genOptions) {
  const { objects = 100 } = masterOptions;
  const uniqueObjects = [...Array(objects)].map(i => genObject(genOptions));
  const oSize = JSON.stringify(genObject(genOptions)).length;

  const cp = fork('./lib/worker.mjs', { cwd: process.cwd(), ...forkOptions });

  await new Promise((resolve, reject) => cp.once('message', ({ ready }) => ready ? resolve() : reject()));

  const testName = `serialize_${forkOptions.serialization}`;

  const startTime = performance.now();

  let promise;
  for (let i = 0; i < objects; i++) {
    promise = new Promise((resolve, reject) => cp.once('message', ({ ok }) => ok ? resolve() : reject() ));

    cp.send(uniqueObjects[i]);

    // wait for response
    await promise;
  }

  const time = performance.now() - startTime;

  cp.kill();

  const throughput = ((objects * oSize) / time) * 1000; // B/s

  return { testName, oSize, time, throughput };
}
