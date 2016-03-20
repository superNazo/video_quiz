class Quiz < ActiveRecord::Base
  has_many :questions, dependent: :destroy

  accepts_nested_attributes_for :questions,
                                reject_if: proc { |attrs| attrs['content'].blank? }
  validates :name,
            presence: true

  def self.build_new
    quiz = Quiz.new
    3.times { quiz.questions.build }
    quiz
  end
end
