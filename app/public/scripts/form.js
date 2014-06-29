window.onload = function() {
  // Initially keep the survey section hidden
  $('#bottom-container').hide();

  // Function to scroll to the survey view when shown
  $.fn.scrollView = function() {
    return this.each(function() {
      $('html, body').animate({
        scrollTop: $(this).offset().top
      }, 500);
    })
  }
}

function startSurvey() {
  // Show the survey section
  $('#bottom-container').show();
  $('#bottom-container').scrollView();
};

