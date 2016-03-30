var ready;

ready = function() {
  var checkToHideOrShowLink;
  checkToHideOrShowLink = function() {
    if ($("#questions .question .nested-fields").length === 10) {
      $("#add_question").hide();
    } else {
      $("#add_question").show();
    }
  };
  $("#questions").bind("cocoon:after-insert", function() {
    checkToHideOrShowLink();
  });
  $("#questions").bind("cocoon:after-remove", function() {
    checkToHideOrShowLink();
  });
  checkToHideOrShowLink();
};

$(document).ready(ready);

$(document).on("page:load", ready);
