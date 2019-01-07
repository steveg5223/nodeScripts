var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/userlist.csv'),
  csvStream = csv(),
  month_val = 3600 * 24 * 30 * 1000
  now = new Date(),
  lt_30 = 0,
  gt_30 = 0
  ;

  csvStream
    .on("data", function(csv){
      var
        date = new Date(csv[2]),
        elapsed = now.getTime() - date.getTime()
      ;
//      console.log(arguments)
      if (elapsed > month_val) {
        gt_30++;
      }
      else {
        console.log(csv.join(','));
        lt_30++;
      }
    })
    .on("end", function(){
//      console.log(gt_30 + ' more than 30 days ago');
//      console.log(lt_30 + ' less than 30 days ago');
    });

  stream.pipe(csvStream);
