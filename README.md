planetos
========

Access the Planet OS API with your Node.js app.

[![Build Status](https://travis-ci.org/fvdm/nodejs-planetos.svg?branch=master)](https://travis-ci.org/fvdm/nodejs-planetos)

* [Node.js](https://nodejs.org)
* [Package on npm](https://www.npmjs.com/package/@franklin/planetos)
* [Planet OS](https://planetos.com)
* [API documentation](http://data.planetos.com/guide/)


Example
-------

```js
var planetos = require ('@franklin/planetos') ({
  apikey: 'abc123'
});

// NOAA Wave Watch 3 data
var params = {
  lon: -50.5,
  lat: 49.5,
  count: 1,
  context: 'reftime_time_lat_lon'
};

planetos ('noaa_ww3_global_1.25x1d', params, console.log);
```


Installation
------------

This module requires an API key from Planet OS.
You can find it in your [account settings](http://data.planetos.com/account/settings/).

`npm install @franklin/planetos`


Configuration
-------------

The module takes the following settings:


param    | type   | required | default   | description
:--------|:-------|:---------|:----------|:---------------------
apikey   | string | yes      |           | Your API key
timeout  | number | no       | 5000      | Request timeout in ms
endpoint | string | no       | Planet OS | Override default API endpoint (i.e. proxy)


```js
var planetos = require ('@franklin/planetos') ({
  apikey: 'abc123',
  timeout: 10000,
  endpoint: 'https://my.proxy/http://data.planetos.com/v1'
});
```


API call
--------

The function takes these arguments:


argument | type     | required | description
:--------|:---------|:---------|:-------------------------
dataset  | string   | yes      | Dataset name, i.e. `noaa_ww3_global_1.25x1d`
params   | object   | yes      | Dataset query parameters
callback | function | yes      | `function (err, data) {}`


```js
// Process results
function myCallback (err, data) {
  if (err) {
    return console.log (err);
  }

  console.dir (data, {
    depth: null,
    colors: true
  });
}

// Query parameters
var params = {
  lon: -50.5,
  lat: 49.5,
  count: 1,
  context: 'reftime_time_lat_lon'
};

// Request data from API
planetos ('noaa_ww3_global_1.25x1d', params, myCallback);
```


#### Output:

```js
{ stats: { maxCount: 61, offset: 0, count: 1 },
  entries: 
   [ { context: 'reftime_time_lat_lon',
       axes: 
        { reftime: '2016-03-17T18:00:00',
          time: '2016-03-17T18:00:00',
          longitude: -49.99999999999997,
          latitude: 50 },
       data: 
        { Wind_speed_surface: 5.519999980926514,
          Wind_direction_from_which_blowing_surface: 288.3900146484375,
          'v-component_of_wind_surface': -1.7400000095367432,
          'u-component_of_wind_surface': 5.239999771118164,
          Direction_of_wind_waves_surface: 72.16000366210938,
          Primary_wave_mean_period_surface: 7.929999828338623,
          Primary_wave_direction_surface: 81.6500015258789,
          Significant_height_of_wind_waves_surface: 0.4399999976158142,
          Mean_period_of_wind_waves_surface: 7.940000057220459,
          Secondary_wave_mean_period_surface: 3.1500000953674316,
          Significant_height_of_combined_wind_waves_and_swell_surface: 0.9700000286102295,
          Secondary_wave_direction_surface: 259.6300048828125 } } ] }
```


License
-------

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org>


Author
------

Franklin van de Meent
| [Website](https://frankl.in)
| [Github](https://github.com/fvdm)
