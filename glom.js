fs = require('fs')
fs.readFile('e_n.json', 'utf8', function (err,data) {
  var
    i, j, dup, out_str,
    json = JSON.parse(data),
    output = {};
  if (err) {
    return console.log(err);
  }
  console.log(json.length);
  for (i = 0; i < json.length; i++) {
    dup = {};
    for (j = 0; j < 2; j++) {
      output['a_sub' + i + '_sub_' + j] = json[i];
    }
  }

  out_str = JSON.stringify(output);
  fs.writeFile("glom.json", out_str, function(err) {
    if(err) {
      return console.log(err);
    }

    console.log("glom.json was saved!");
  });
});
