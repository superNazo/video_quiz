require 'rails_helper'

RSpec.describe Interview, type: :model do
  before { @interview = Interview.create(quiz_id: 1, user_id: 1, current_question_id: 1, status: nil) }

  it { should respond_to(:quiz_id) }

  it { should respond_to(:user_id) }

  it { should respond_to(:current_question_id) }

  it { should respond_to(:current_question_id) }

  it 'when interview is not completed' do
    expect(@interview.completed?).to be false
  end

  it 'when interview is completed' do
    @quiz = Quiz.create(name: 'Example Quiz')
    @quiz.questions.create!(content: 'This is question #1', record_time_limit: 10)
    @interview.set_next_question!(@quiz)

    expect(@interview.completed?).to be true
  end

  it 'when interview current question updated' do
    @quiz = Quiz.create(name: 'Example Quiz')
    @quiz.questions.create!(content: 'This is question #1', record_time_limit: 10)
    @quiz.questions.create!(content: 'This is question #2', record_time_limit: 20)
    @interview.set_next_question!(@quiz)

    expect(@interview).to have_attributes(:status => 'In progress')
  end
end
