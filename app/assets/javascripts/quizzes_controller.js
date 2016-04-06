// var ready = function() {
//   var checkToHideOrShowLink;
//   checkToHideOrShowLink = function() {
//     if ($("#questions .question .nested-fields").length === 10) {
//       $("#add_question").hide();
//     } else {
//       $("#add_question").show();
//     }
//   };

//   $("#questions").bind("cocoon:after-insert", function() {
//     checkToHideOrShowLink();
//   });
//   $("#questions").bind("cocoon:after-remove", function() {
//     checkToHideOrShowLink();
//   });
//   checkToHideOrShowLink();
// };

// $(document).ready(ready);

// $(document).on("page:load", ready);



var QuestionField = function() {};

QuestionField.prototype.countFields = function() {
  return $("#questions .question .nested-fields");
}

QuestionField.prototype.getBtn = function() {
  return $("#add_question");
}

QuestionField.prototype.hideOrShowBtn = function(questionsList, newQuestionBtn) {
  if (questionsList.length >= 10) {
    newQuestionBtn.hide();
  } else {
    newQuestionBtn.show();
  }
};

QuestionField.prototype.bindEvent = function(object) {
  $("#questions").bind("cocoon:after-insert", function() {
    object.hideOrShowBtn(object.countFields(), object.getBtn());
  });
  $("#questions").bind("cocoon:after-remove", function() {
    object.hideOrShowBtn(object.countFields(), object.getBtn());
  });
  object.hideOrShowBtn(object.countFields(), object.getBtn());
};

window.QuestionField = QuestionField;

$(document).on('ready page:load', function() {
  var object = new QuestionField,
    questionsList = $("#questions .question .nested-fields"),
    newQuestionBtn = $('#add_question');

  object.hideOrShowBtn(questionsList, newQuestionBtn);
  object.bindEvent(object);
});
