var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/search-results-2018-06-07T16_30_04.264-0700.csv'),
  csvStream = csv(),
  samples = [],
  over_60_count = 0,
  over_60_sum = 0
  ;

  function standardDeviation(values){
    var avg = average(values);

    var squareDiffs = values.map(function(value){
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });

    var avgSquareDiff = average(squareDiffs);

    var stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
  }

  function average(data){
    var sum = data.reduce(function(sum, value){
      return sum + value;
    }, 0);

    var avg = sum / data.length;
    return avg;
  }

  csvStream
    .on("data", function(data){
      var details, load_time, float_load_time;
      try {
        details = JSON.parse(data[0]);
        load_time = /initialization in ([0-9\.]+) secs/.exec(details.details)[1];
        float_load_time = parseFloat(load_time, 10);
        samples.push(float_load_time);
        if (float_load_time > 60) {
          over_60_count++;
          over_60_sum += float_load_time;
        }
      }
      catch (err) {}
    })
    .on("end", function(){
      var
        std = standardDeviation(samples),
        avg = average(samples);
      console.log('Number of samples: %o', samples.length);
      console.log('Average: %o', Math.round(avg));
      console.log('Standard deviation: %o', Math.floor(std));
      console.log('Num over 60: %o', over_60_count);
      console.log('Avg over 60: %o', Math.floor(over_60_sum / over_60_count));
    });

  stream.pipe(csvStream);
