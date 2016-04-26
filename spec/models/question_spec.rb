require 'rails_helper'

RSpec.describe Question, type: :model do
  before do
    @question = Question.new(content: 'Example Question',
                             record_time_limit: 30)
  end

  it { should respond_to(:content) }

  it { should respond_to(:quiz_id) }

  it { should respond_to(:record_time_limit) }

  it 'should save question to database' do
    expect { @question.save }.to change { Question.count }.by(1)
  end

  it 'should not be valid with empty record_time_limit' do
    @question.record_time_limit = nil
    should_not be_valid
  end

  it 'should not be valid with text inside record_time_limit' do
    @question.record_time_limit = 'some-text'
    should_not be_valid
  end
end
