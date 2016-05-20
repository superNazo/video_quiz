class Quiz < ActiveRecord::Base
  has_many :questions, dependent: :destroy

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
end
