class Interview < ActiveRecord::Base
  belongs_to :quiz
  belongs_to :user
  has_many :answers, dependent: :destroy

  scope :started_by, ->(user) { where(user_id: user.id) }
end
