class Question < ActiveRecord::Base
  belongs_to :quiz

  validates :content,
            presence: true
end
