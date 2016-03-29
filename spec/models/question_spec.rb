require 'rails_helper'

RSpec.describe Question, type: :model do
  before { @question = Question.new(content: 'Example Question', quiz_id: 1) }

  it { should respond_to(:content) }

  it { should respond_to(:quiz_id) }
end
