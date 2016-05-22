require 'rails_helper'

RSpec.describe Answer, type: :model do
  before { @answer = Answer.new(interview_id: 1, video_token: 'Answer 1') }

  it { should respond_to(:interview_id) }

  it { should respond_to(:video_token) }
end
