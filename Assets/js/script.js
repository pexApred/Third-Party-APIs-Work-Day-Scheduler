// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function updateWorkDaySchedule() {

  // TODO: Add code to display the current date in the header of the page.
  var currentDateTime = dayjs();
    $('#currentDay').text(currentDateTime.format('dddd, MMMM DD[th], hh:mm:ss'));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtnEl = $('.saveBtn');

  saveBtnEl.on("click", function() {
    console.log("test");
    // set a const to get ".description" by class value
    // set a const keyValue = $(this.parent.attr('id'));
    // set (save) item to local storage 
    // localStorage.setItem(keyValue, value)
  });

  
  

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  $('.time-block').each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    console.log(blockHour);

    if (blockHour < currentDateTime.hour()) {
      $(this).addClass('past');
      $(this).removeClass('present');
      $(this).removeClass('future');
    } else if (blockHour === currentDateTime.hour()) {
      $(this).removeClass('past');
      $(this).addClass('present');
      $(this).removeClass('future');
    } else {
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
    }
  });
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //

  // Update the date every day
  setInterval ( updateWorkDaySchedule, 24 * 60 * 60 * 1000 );

});
