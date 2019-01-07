var array = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16],
  [17, 18, 19, 20]
];
var row_incr = 0, last_row_incr = -1;
var col_incr = 1, last_col_incr = -1;
var col_left = 0, col_right = array[0].length - 1;
var row_top = 0, row_bottom = array.length - 1;
var end = false, start = true;
var row_num = 0, col_num = 0;
var guard_count = 0;
while (! end) {
  console.log('row_num = %o, col_num = %o, row_incr: %o, col_incr: %o', row_num, col_num, row_incr, col_incr);
  if (row_num === row_bottom) {
    console.log('end of grid going down');
    last_row_incr = row_incr;
    row_incr = 0;
    col_incr = last_col_incr *= -1;
    row_bottom--;
    col_num++;
    console.log('row_incr: %o, last_row_incr: %o, col_incr: %o', row_incr, last_row_incr, col_incr);
  }
  else if (row_num === row_top && !start) {
    console.log('end of grid going up');
    last_row_incr = row_incr;
    row_incr = 0;
    col_incr = last_col_incr *= -1;
    row_top++;
    if (! start) {col_num--;}
    console.log('row_incr: %o, last_row_incr: %o, col_incr: %o', row_incr, last_row_incr, col_incr);
  }
  row_num += row_incr;
  if (col_num === col_left && !start) {
    console.log('end of grid going left');
    last_col_incr = col_incr;
    col_incr = 0;
    row_incr = last_row_incr *= -1;
    col_left++;
    row_num--;
    console.log('col_incr: %o, last_col_incr: %o, row_incr: %o', col_incr, last_col_incr, row_incr);
  }
  else if (col_num === col_right) {
    console.log('end of grid going right');
    last_col_incr = col_incr;
    col_incr = 0;
    row_incr = start ? 1 : last_row_incr *= -1;
    col_right--;
    row_num++;
    start = false;
    console.log('col_incr: %o, last_col_incr: %o, row_incr: %o', col_incr, last_col_incr, row_incr);
  }
  col_num += col_incr;
  if (col_left === col_right && row_top === row_bottom) {
    end = true;
  }
  if (guard_count < 100) {guard_count++;}
  else {end = true;}
}

