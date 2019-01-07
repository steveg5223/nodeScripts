var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/search-results-2018-05-15T10_35_31.896-0700.csv'),
  csvStream = csv(),
  header = true
  ;

  csvStream
    .on("data", function(csv){
      var details, user, ts;
      if (header) {
        header = false;
        return;
      }
      details = JSON.parse(csv[0]);
      ts = csv[2];
      user = csv[3];
      console.log(details.details);
      return;
    })
    .on("end", function(){
    });

  stream.pipe(csvStream);
