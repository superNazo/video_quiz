describe("Toggle Link", function() {

  it("prevents adding question when 10th question added", function(){
    var newQuestionField = {
      hide: function(){},
      show: function(){}
    };

    var fieldsCount = function() {
      return {
        length: 10
      };
    };

    var questions = null;

    object = new QuestionField(questions, fieldsCount, newQuestionField);
    spyOn(newQuestionField, "hide");

    object.toggleLink();
    expect(newQuestionField.hide).toHaveBeenCalled();
  });
});

describe("Bind Cocoon events to link", function(){
  it("adds one question when insert event fires", function(){
    var addQuestionLink = $("<div></div>"),
        fieldsCount = null,
        questions = null;

    var object = new QuestionField(addQuestionLink, fieldsCount, questions);

    spyOn(object, "toggleLink");
    object.bindCocoonEvents();

    addQuestionLink.trigger("cocoon:after-insert");
    expect(object.toggleLink).toHaveBeenCalled();
  });

  it("deletes one question when remove event fires", function(){
    var addQuestionLink = $("<div></div>"),
        fieldsCount = null,
        questions = null;

    var object = new QuestionField(addQuestionLink, fieldsCount, questions);

    spyOn(object, "toggleLink");
    object.bindCocoonEvents();

    addQuestionLink.trigger("cocoon:after-remove");
    expect(object.toggleLink).toHaveBeenCalled();
  });
});
