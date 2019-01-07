var fs = require('fs');
fs.open('Downloads/snaps.json', 'r', function(err, fileToRead){
  if (!err){
    fs.readFile(fileToRead, {encoding: 'utf-8'}, function(err,data){
      var catalog, snap_index, snap_cat_keys, snap_key, snap_entry, csv_entry;
      if (!err){
        catalog = JSON.parse(data);
        snap_cat_keys = Object.keys(catalog.response_map);
        for (snap_index = 0; snap_index < snap_cat_keys.length; snap_index++) {
          snap_key = snap_cat_keys[snap_index];
          snap_entry = catalog.response_map[snap_key];
          csv_entry = '"'
            + [snap_entry.snap_pack_label,
              snap_entry.snap_pack_class_id,
              snap_entry.class_map.category,
              snap_entry.class_map.info.purpose.value].join('","')
          + '"';
          console.log(csv_entry)
        }
      }else{
        console.log(err);
      }
    });
  }else{
    console.log(err);
  }
});