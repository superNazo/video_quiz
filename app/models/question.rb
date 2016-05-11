class Question < ActiveRecord::Base
  belongs_to :quiz
  has_many :answers, dependent: :destroy

  validates :content, length: { maximum: 150 }
  validates :record_time_limit,
            numericality: { only_integer: true }, presence: true

  def next
    self.class.where("id > ?", id).first
  end

  def previous
    self.class.where("id < ?", id).last
  end
end
