var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/extract-2019-01-02_21-42-49.csv'),
  csvStream = csv(),
  numRec = 0,
  sum = 0,
  count = 0
  ;

  csvStream
    .on("data", function(data){
      if (numRec > 0) {
        const details = JSON.parse(data[2]);
        const initIn = /initialization in ([0-9\.]+) secs/.exec(details.details);
        if (initIn) {
          //console.log(initIn[1]);
          sum += parseFloat(initIn[1], 10);
          count++;
        }
      }
      numRec++;
    })
    .on("end", function(){
      const avg = Math.floor(sum / count);
      console.log('sum: ' + sum + ' count: ' + count);
      console.log(`There were ${count} sessions average load time was ${avg} seconds`)
    });

  stream.pipe(csvStream);
