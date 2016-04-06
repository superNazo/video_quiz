describe("checkToHideOrShowLink", function() {

  // it("contains 3 questions on page load", function() {
  //   ready();
  //   var questionFields = $("#questions .question .nested-fields");
  //   expect(questionFields.length).toEqual(3);
  // });

  // it("removes add question btn when fields count is 10", function() {
  //   var addQuestionBtn = $("#add_question");
  //   ready();

  //   for (var i = 0; i < 7; i++) {
  //     addQuestionBtn.click();
  //   }

  //   expect(addQuestionBtn).is(':visible').toBe(false);
  // });

  it("prevents adding question when 10th question added", function(){
    object = new QuestionField;
    var newQuestion = { hide: function(){} },
        questions = { length: 10 };
    spyOn(newQuestion, 'hide');

    object.hideOrShowBtn(questions, newQuestion);
    expect(newQuestion.hide).toHaveBeenCalled();
  });
});

describe('bindEvents', function(){
  it("adds one question when insert event fires", function(){
    object = new QuestionField;
    var newQuestion = { bindEvent: function(){} };
    spyOn(newQuestion, 'bindEvent');
    expect(object.getBtn).toHandleWith('cocoon:after-insert', object.bindEvent());
  });

  it("takes away one question when remove event fires", function(){
    object = new QuestionField;
    var questionBtn = { bindEvent: function(){} };

    spyOn(questionBtn, 'bindEvent');
    expect(questionBtn.bindEvent).toHaveBeenCalled();
  });
});
