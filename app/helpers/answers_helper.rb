module AnswersHelper
  def interview_status_of(quiz)
    interview = quiz.interviews.started_by(current_user).last
    interview.status unless interview.nil?
  end

  def current_question
    @quiz.questions.find(@interview.current_question_id)
  end
end
