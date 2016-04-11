class Answer < ActiveRecord::Base
  belongs_to :interview
  belongs_to :question
  validates :interview_id, :video_token, presence: true

  scope :belonging_to, ->(interview) { where(interview_id: interview.id) }
end
