describe("checkToHideOrShowLink", function() {

  it("contains 3 questions on page load", function() {
    var questionFields = $("#questions .question .nested-fields");
    ready();
    expect(questionFields).toEqual(3);
  });

  it("removes 'add question' btn when fields count is 10", function() {
    var addQuestionBtn = $("#add_question");
    ready;

    for (var i = 0; i < 7; i++) {
      addQuestionButton.click();
    }

    expect(addQuestionBtn).is(':visible')).toBe(false);
  });
});
