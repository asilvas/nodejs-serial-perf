const uniqueCache = {};

export default genObject;

function genObject(options = {}, unique = true, o = new Object()) {
  const { numerics = 50, strings = 50, stringLength = 10, arrays = 10, arrayLength = 5, levels = 50 } = options;
  if (levels <= 1) return o;

  let cache, key;

  if (!unique) {
    key = JSON.stringify(options);
    cache = uniqueCache[key];
    if (cache) {
      o._ = cache;
      return o;
    }
  }

  const _ = o._ = {};

  let i;
  for (i = 0; i < numerics; i++) {
    _[`n${i}`] = Math.random();
  }
  for (i = 0; i < strings; i++) {
    _[`s${i}`] = randString(stringLength);
  }
  for (i = 0; i < arrays; i++) {
    _[`a${i}`] = [...Array(arrayLength)].map(i => (i % 2) === 0 ? Math.random() : randString(stringLength));
  }

  if (!unique) {
    uniqueCache[key] = o;
  }

  if (levels > 1) {
    genObject({ ...options, levels: levels - 1 }, unique, o._);
  }

  return o;
}

function randString(len) {
  return [...Array(len)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
}