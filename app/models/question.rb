class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :answers, dependent: :destroy

  validates :content, length: { maximum: 150 }

  def next
    self.class.where("id > ?", id).first
  end

  def previous
    self.class.where("id < ?", id).last
  end
end
