var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/requests_per_sec.csv'),
  csvStream = csv(),
  max = 0,
  min=new Date().getTime(),
  count = 0
  ;

  csvStream
    .on("data", function(csv){
      var
        date = new Date(csv[1]),
        url_ts = date.getTime()
      ;
      count++;
      if (url_ts < min) {
        min = url_ts;
      }
      else if (url_ts > max) {
        console.log('new max old max = ' + max + ' new max = ' + url_ts);
        max = url_ts;
      }
    })
    .on("end", function(){
      var
        max_date = new Date(max),
        min_date = new Date(min)
      ;
      console.log(count + ' records processed, min = ' + min_date.toISOString() + ', max = ' + max_date.toISOString());
//      console.log(lt_30 + ' less than 30 days ago');
    });

  stream.pipe(csvStream);
