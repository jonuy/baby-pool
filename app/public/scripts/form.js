window.onload = function() {
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
  // Scroll to the start of the survey
  $('#bottom-container').scrollView();
};

