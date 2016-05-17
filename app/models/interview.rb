class Interview < ActiveRecord::Base
  belongs_to :quiz
  belongs_to :user
  has_many :answers, dependent: :destroy

  scope :started_by, ->(user) { where(user_id: user.id) }

  def completed?
    self.status == 'Completed'
  end

  def set_next_question!(quiz)
    if self.current_question_id != quiz.questions.last.id
      self.update(current_question_id: quiz.next_quiz_question(self.current_question_id).id, status: 'In progress')
    else
      self.update(status: 'Completed')
    end
  end
end
