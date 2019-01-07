var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/sumo.csv'),
  csvStream = csv()
  ;

  csvStream
    .on("data", function(csv){
      var
        ts = new Date(csv[0]),
        url = csv[1]
      ;
      if (num_requests === undefined) {
        num_requests = 0;
        return;
      }
      if (url.length === 0) {
        url = '/'; // make empty request look like slash
      }
      num_requests++;
      const found_pattern = accum.find(function (elem) {
        if (elem.regex.test(url)) {
          return true
        }
      });
      if (found_pattern) {
        found_pattern.count++;
        console.log(`Pattern: ${found_pattern.pattern} count ${found_pattern.count}`);
        return;
      }
      console.log(url, url.length);
      return;
    })
    .on("end", function(){
      accum.forEach(function (elem) {
        // console.log(`${elem.pattern} occurred ${elem.count} out of ${num_requests}`)
      });
      console.log(JSON.stringify(accum));
    });

  stream.pipe(csvStream);
