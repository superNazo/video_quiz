require 'rails_helper'

RSpec.describe Question, type: :model do
  before { @question = Question.new(content: 'Example Question', quiz_id: 1) }

  it { should respond_to(:content) }

  it { should respond_to(:quiz_id) }

  it { should_not be_valid }

  it 'is valid with a content and quiz_id' do
    @question.should be_valid
  end

  it 'raises an error when saved without a content' do
    expect { subject.save! }.to raise_error(ActiveRecord::RecordInvalid)
  end

  describe 'when content is too long' do
    before { @question.content = 'q' * 151 }
    it { should_not be_valid }
  end
end
