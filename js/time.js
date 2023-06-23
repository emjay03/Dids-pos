$(document).ready(function() {
  clockUpdate();
  setInterval(clockUpdate, 1000);
})

function clockUpdate() {
  var date = new Date();
  

  function addZero(x) {
    if (x < 10) {
      return x = '0' + x;
    } else {
      return x;
    }
  }

  function twelveHour(x) {
    if (x > 12) {
      return x = x - 12;
    } else if (x == 0) {
      return x = 12;
    } else {
      return x;
    }
  }

  function pm_am(x) {
    if (x > 12) {
      return "PM";
    }
    else
    {
      return "AM";
    } 
  }

  var h = twelveHour(date.getHours());
  var m = addZero(date.getMinutes());
  var s = addZero(date.getSeconds());
  var pm_am=pm_am(date.getHours());

  $('#time').text(+h + ':' + m + ':' + s + " "+pm_am);
}