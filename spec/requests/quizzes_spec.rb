require 'rails_helper'

RSpec.describe "Quizzes", type: :request do
  describe "GET /quizzes" do
    it "works! (now write some real specs)" do
      get quizzes_path
      expect(response).to have_http_status(200)
    end
  end
end
