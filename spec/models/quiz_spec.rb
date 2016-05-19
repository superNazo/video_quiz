require 'rails_helper'

RSpec.describe Quiz, type: :model do
  before {
    @quiz = Quiz.new(name: 'Example Quiz')
    @user = User.new(id: 1, email: 'test@email.com')
  }

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

  it 'change the current question of interview' do
    @quiz = Quiz.create(name: 'Example Quiz 1')
    @quiz.questions.create!(content: 'This is question #1', record_time_limit: 10)
    @quiz.questions.create!(content: 'This is question #2', record_time_limit: 20)
    @interview = Interview.create(quiz_id: 1, user_id: 1, current_question_id: 1, status: nil)

    expect(@quiz.next_quiz_question(@interview.current_question_id).id).to eq(2)
  end

  describe 'interviews' do
    before {
      @quiz.save
      @user.save
      @interview_params = {quiz_id: @quiz.id, user_id: @user.id, current_question_id: 1, status: nil}
      @interview = Interview.new(@interview_params)
    }

    it 'should save interview with quiz and user params' do
      expect { @interview.save }.to change { Interview.count }.by(1)
    end

    it 'should create only one uniqueness interview' do
      (0..5).each do
        @interview.save
      end
      expect(Interview.count).to eq(1)
    end

    it 'should return false if interview does not exists for custom method' do
      expect(@quiz.interview_exists(@user).exists?).to eq(false)
    end

    it 'should return true for custom method if interview was saved' do
      @interview.save
      expect(@quiz.interview_exists(@user).exists?).to eq(true)
    end

    it 'should create new interview with params that send into custom method' do
      expect(@quiz.check_interview(@user, @interview_params)).to be_a_new(Interview)
    end

    it 'should assign interview that was created by user' do
      @interview.save
      expect(@quiz.check_interview(@user, @interview_params)).to eq(@interview)
    end
  end
end