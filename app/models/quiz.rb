class Quiz < ActiveRecord::Base
  belongs_to :user
  has_many :questions, -> { order('id ASC') }, dependent: :destroy
  has_many :interviews, dependent: :destroy

  accepts_nested_attributes_for :questions,
                                limit: 10,
                                reject_if: proc { |attrs| attrs["content"].blank? },
                                allow_destroy: true
  validates :name,
            presence: true,
            uniqueness: true,
            length: { maximum: 40 }

  def self.build_new
    quiz = Quiz.new
    3.times { quiz.questions.build }
    quiz
  end

  def interview_exists(current_user)
    self.interviews.started_by(current_user)
  end

  def check_interview(current_user, interview_params)
    if interview_exists(current_user).exists?
      self.interviews.started_by(current_user).first
    else
      self.interviews.new(interview_params)
    end
  end

  def next_quiz_question(current_question)
    self.questions.where("id > ?", current_question).first
  end
end
