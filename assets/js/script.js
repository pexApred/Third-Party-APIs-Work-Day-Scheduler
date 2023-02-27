// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(function updateWorkDaySchedule() {

  // TODO: Add code to display the current date in the header of the page.
  var currentDateTime = dayjs();
    $('#currentDay').text(currentDateTime.format('dddd, MMMM DD[th]'));

  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveBtnEl = $('.saveBtn');

  saveBtnEl.on("click", function() {
    console.log("test");
    // Console.log above works/Now i need to save 
    // Description element within the time-block
    var calendarNotes = $(this).siblings('.description').val();
    // id of time block
    var keyValue = $(this).parent().attr('id');
    // Saving input to local storage using time-block id
    localStorage.setItem(keyValue, calendarNotes);
  });

  
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  $('.time-block').each(function() {
    // This is referring to the <div> containing .time-block & id hour-x
    // Parsing string to integer, grabbing attribute 'id' and 
    // splitting the hour-x at '-' to get [0]= hour, [1]= x 
    var blockHour = parseInt($(this).attr('id').split('-')[1]);

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
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
    var blockId = $(this).attr('id');
    var savedInput = localStorage.getItem(blockId);

    if (savedInput) {
      $(this).find('.description').val(savedInput);
    }

  });
  // Update the date every day
  setInterval ( updateWorkDaySchedule, 24 * 60 * 60 * 1000 );

});