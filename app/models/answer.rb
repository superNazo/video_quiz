class Answer < ActiveRecord::Base
  belongs_to :interview
  belongs_to :question

  validates :interview_id, :video_token, presence: true
end
