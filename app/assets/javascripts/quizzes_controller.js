var ready;

ready = function() {
  var check_to_hide_or_show_add_link;
  check_to_hide_or_show_add_link = function() {
    if ($('#questions .question .nested-fields').length === 10) {
      $('#add_question').hide();
    } else {
      $('#add_question').show();
    }
  };
  $('#questions').bind('cocoon:after-insert', function() {
    check_to_hide_or_show_add_link();
  });
  $('#questions').bind('cocoon:after-remove', function() {
    check_to_hide_or_show_add_link();
  });
  check_to_hide_or_show_add_link();
};

$(document).ready(ready);

$(document).on('page:load', ready);
