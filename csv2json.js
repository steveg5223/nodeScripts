var
  fs = require('fs'),
  lineReader = require('readline').createInterface({
    input: fs.createReadStream('Downloads/search-results.json')
  }),
  output = [];

lineReader.on('line', function (line) {
//  console.log('Line from file:', line);
  try {
    output.push(line);
  }
  catch (e) {
    console.log('error in json formatting: ', JSON.stringify(e))
  }
});

lineReader.on('close', function (line) {
  var json_output = '[' + output.join(', ') + ']';
  console.log('lines in file:', output.length);
  //console.log(json_output);
  fs.writeFile("Downloads/search-results.json", json_output, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});
