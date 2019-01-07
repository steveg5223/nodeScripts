var
  index,
  url_list = [],
  request = require('request'),
  fs = require('fs'),
  arr = [],
  setIntervalCount = 0,
  getTimer = function () {
    var start = new Date(), end;
    return {
      start    : function () { return start; },
      duration : function () { return ( new Date().getTime() - start.getTime() ) / 1000 ; },
      d_secs   : function () { return Math.floor( this.duration() ); },
      reset    : function () {
        start = new Date();
        end = undefined;
      },
      end      : function () {
        if ( end === undefined ) { end = new Date(); }
        return (end.getTime() - start.getTime()) / 1000;
      }
    };
  },
  get_promise_fn = function (get_promise_index, task_request) {
    var
      options = {
        url: task_request.url,
        timeout: 180000,
        auth: {
          'bearer': task_request.bearer,
          'sendImmediately': true
        }
    }
    return new Promise(function (resolve, reject) {
      request(options, resolve);
    }).then(function(error, response, body) {
      var timer, log_Str;
      try {
        timer = arr[get_promise_index].timer;
      }
      catch (err) {
        console.log('in catch err = %o', err);
      }
      if (error || response) {
        console.log("error: %o, response: %o", error, response);
      }
      console.log('"%o","%o secs"', task_request.url, timer.duration());
      arr[get_promise_index].pending = false;
    });
  },
  interval_fn = function () {
    index = 0;
    for (index = 0; index < url_list.length; index++) {
      if (arr[index] === undefined) {
        arr[index] = {
          pending : true,
          promise : get_promise_fn(index, url_list[index]),
          timer   : getTimer()
        };
      }
      else if (! arr[index].pending) {
        arr[index].promise = get_promise_fn(index, url_list[index]);
        arr[index].pending = true;
        arr[index].timer.reset();
      }
    }
  }
  ;
fs.readFile('/Users/sgoodwin/task_url_list.json', 'utf8', (err, data) => {
  var config_file, config_index, repetition_index, elem;
  if (err) throw err;
  config_file = JSON.parse(data);
  for (config_index = 0; config_index < config_file.length; config_index++) {
    elem = config_file[config_index];
    for (repetition_index = 0; repetition_index < elem.count; repetition_index++) {
      url_list.push(elem);
    }
  }
  console.log('"url","%duration"');
  setInterval(interval_fn, 1000);
});
