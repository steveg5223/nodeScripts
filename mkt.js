var
  fs = require('fs'),
  csv = require('fast-csv'),
  stream = fs.createReadStream('Downloads/unique_redshift_users'),
  csvStream = csv(),
  domain_names = {}
  ;

  csvStream
    .on("data", function(data){
      var 
        email_str = data[0],
        domain = email_str.split('@').pop()
      ;
        if (! domain_names[domain]) {
          domain_names[domain] = 0;
        }
        domain_names[domain]++;
    })
    .on("end", function(){
      var
        i, domain_name, domain_count,
        domain_keys = Object.keys(domain_names)
      ;
      console.log('"domain name", "number of accounts"');
      for (i = 0; i < domain_keys.length; i++) {
        domain_name = domain_keys[i];
        console.log('"' + domain_name + '", ' + domain_names[domain_name]);
      }
    });

  stream.pipe(csvStream);
