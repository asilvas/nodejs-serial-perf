# nodejs-serial-perf

Testing only single process
[advanced serialization](https://nodejs.org/api/child_process.html#child_process_advanced_serialization)
efficiency on various sized objects we see:

* Small objects (<= 3KB) `json` performs up to ~12% faster.
* Medium objects (~26KB) `advanced` performs up to ~27% faster.
* Large objects (~1.5MB) `advanced` performs up to ~65% faster.

```
*** Small Objects ***
---
* Test: serialize_json
* Object Size: 2927B
* Time: 691.8777012825012ms
* Throughput: 21.15MB/s
---
* Test: serialize_advanced
* Object Size: 2921B
* Time: 775.3837003707886ms
* Throughput: 18.84MB/s

*** Medium Objects ***
---
* Test: serialize_json
* Object Size: 26266B
* Time: 660.3640003204346ms
* Throughput: 39.78MB/s
---
* Test: serialize_advanced
* Object Size: 26283B
* Time: 518.8196997642517ms
* Throughput: 50.66MB/s

*** Large Objects ***
---
* Test: serialize_json
* Object Size: 1456771B
* Time: 1684.7126998901367ms
* Throughput: 43.23MB/s
---
* Test: serialize_advanced
* Object Size: 1456873B
* Time: 1022.1971998214722ms
* Throughput: 71.26MB/s
```
