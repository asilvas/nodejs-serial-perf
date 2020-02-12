import { forkIt } from './master.mjs';

const SMALL_OBJ_MASTER_OPTS = { objects: 5000 };
const SMALL_OBJ_GEN_OPTS = { levels: 2 };

const MEDIUM_OBJ_MASTER_OPTS = { objects: 1000 };
const MEDIUM_OBJ_GEN_OPTS = { levels: 10 };

const LARGE_OBJ_MASTER_OPTS = { objects: 50 };
const LARGE_OBJ_GEN_OPTS = { levels: 500 };

async function main() {
  let jsonResults = [];
  let advResults = [];
  jsonResults.push(await forkIt({ serialization: 'json' }, SMALL_OBJ_MASTER_OPTS, SMALL_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, SMALL_OBJ_MASTER_OPTS, SMALL_OBJ_GEN_OPTS));
  jsonResults.push(await forkIt({ serialization: 'json' }, SMALL_OBJ_MASTER_OPTS, SMALL_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, SMALL_OBJ_MASTER_OPTS, SMALL_OBJ_GEN_OPTS));
  jsonResults.push(await forkIt({ serialization: 'json' }, SMALL_OBJ_MASTER_OPTS, SMALL_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, SMALL_OBJ_MASTER_OPTS, SMALL_OBJ_GEN_OPTS));
  jsonResults.sort((a, b) => a.throughput > b.throughput ? -1 : 1);
  advResults.sort((a, b) => a.throughput > b.throughput ? -1 : 1);
  console.log('*** Small Objects ***');
  displayResults(jsonResults[0]);
  displayResults(advResults[0]);

  console.log();

  jsonResults = [];
  advResults = [];
  jsonResults.push(await forkIt({ serialization: 'json' }, MEDIUM_OBJ_MASTER_OPTS, MEDIUM_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, MEDIUM_OBJ_MASTER_OPTS, MEDIUM_OBJ_GEN_OPTS));
  jsonResults.push(await forkIt({ serialization: 'json' }, MEDIUM_OBJ_MASTER_OPTS, MEDIUM_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, MEDIUM_OBJ_MASTER_OPTS, MEDIUM_OBJ_GEN_OPTS));
  jsonResults.push(await forkIt({ serialization: 'json' }, MEDIUM_OBJ_MASTER_OPTS, MEDIUM_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, MEDIUM_OBJ_MASTER_OPTS, MEDIUM_OBJ_GEN_OPTS));
  jsonResults.sort((a, b) => a.throughput > b.throughput ? -1 : 1);
  advResults.sort((a, b) => a.throughput > b.throughput ? -1 : 1);
  console.log('*** Medium Objects ***');
  displayResults(jsonResults[0]);
  displayResults(advResults[0]);

  console.log();

  jsonResults = [];
  advResults = [];
  jsonResults.push(await forkIt({ serialization: 'json' }, LARGE_OBJ_MASTER_OPTS, LARGE_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, LARGE_OBJ_MASTER_OPTS, LARGE_OBJ_GEN_OPTS));
  jsonResults.push(await forkIt({ serialization: 'json' }, LARGE_OBJ_MASTER_OPTS, LARGE_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, LARGE_OBJ_MASTER_OPTS, LARGE_OBJ_GEN_OPTS));
  jsonResults.push(await forkIt({ serialization: 'json' }, LARGE_OBJ_MASTER_OPTS, LARGE_OBJ_GEN_OPTS));
  advResults.push(await forkIt({ serialization: 'advanced' }, LARGE_OBJ_MASTER_OPTS, LARGE_OBJ_GEN_OPTS));
  jsonResults.sort((a, b) => a.throughput > b.throughput ? -1 : 1);
  advResults.sort((a, b) => a.throughput > b.throughput ? -1 : 1);
  console.log('*** Large Objects ***');
  displayResults(jsonResults[0]);
  displayResults(advResults[0]);
}

function displayResults({ testName, oSize, time, throughput }) {
  console.log(`---`);
  console.log(`* Test: ${testName}`);
  console.log(`* Object Size: ${oSize}B`);
  console.log(`* Time: ${time}ms`);
  if (throughput < 1000000)
    console.log(`* Throughput: ${(throughput / 1000).toFixed(2)}KB/s`);
  else
    console.log(`* Throughput: ${(throughput / 1000000).toFixed(2)}MB/s`);
}

main();
