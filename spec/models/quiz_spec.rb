require 'rails_helper'

RSpec.describe Quiz, type: :model do
  before { @quiz = Quiz.new(name: 'Example Quiz') }

  it { should respond_to(:name) }

  it { should_not be_valid }

  it 'is valid with a name' do
    @quiz.should be_valid
  end

  it 'changes the number of Quizzes' do
    expect { @quiz.save }.to change { Quiz.count }.by(1)
  end

  it 'raises an error when saved without a name' do
    expect { subject.save! }.to raise_error(ActiveRecord::RecordInvalid)
  end

  describe 'when name is too long' do
    before { @quiz.name = 'q' * 41 }
    it { should_not be_valid }
  end

  describe 'when name is already taken' do
    before do
      same_quiz_name = @quiz.dup
      same_quiz_name.save
    end

    it { should_not be_valid }
  end
end
