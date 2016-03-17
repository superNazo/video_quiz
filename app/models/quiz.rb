class Quiz < ActiveRecord::Base
  has_many :questions, dependent: :destroy

  accepts_nested_attributes_for :questions,
                                reject_if: proc { |attrs| attrs['content'].blank? }
  validates :name,
            presence: true
end
