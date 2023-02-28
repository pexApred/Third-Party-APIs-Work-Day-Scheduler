$(function updateWorkDaySchedule() {

  // TODO: Add code to display the current date in the header of the page.
  var currentDateTime = dayjs();
    $('#currentDay').text(currentDateTime.format('dddd, MMMM DD[th]'));

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

    var blockId = $(this).attr('id');
    var savedInput = localStorage.getItem(blockId);

    if (savedInput) {
      $(this).find('.description').val(savedInput);
    }

  });
  // Update the date every day
  setInterval ( updateWorkDaySchedule, 24 * 60 * 60 * 1000 );

});
