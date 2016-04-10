var QuestionField = function(questions, fields, addFieldlink) {
  this.questions = questions;
  this.fieldsList = fields;
  this.addFieldlink = addFieldlink;
};

QuestionField.prototype.toggleLink = function() {
  if (this.fieldsList().length >= 10) {
    this.addFieldlink.hide();
  } else {
    this.addFieldlink.show();
  }
};

QuestionField.prototype.bindCocoonEvents = function() {
  this.questions.bind("cocoon:after-insert", this.toggleLink.bind(this));
  this.questions.bind("cocoon:after-remove", this.toggleLink.bind(this));
};

$(document).on('ready page:load', function() {
  var object = new QuestionField($('#questions'), function() { return $("#questions .question .nested-fields"); }, $("#add_question"));

  object.bindCocoonEvents();
  object.toggleLink();
});
