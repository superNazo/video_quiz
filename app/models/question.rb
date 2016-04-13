class Question < ActiveRecord::Base
  belongs_to :quiz

  validates :content, length: { maximum: 150 }
end
