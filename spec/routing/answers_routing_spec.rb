require "rails_helper"

RSpec.describe AnswersController, type: :routing do
  describe "routing" do
    it "routes to #new" do
      expect(:get => "quizzes/1/answers/new").to route_to("answers#new", :quiz_id => "1")
    end

    it "routes to #create" do
      expect(:post => "quizzes/1/answers").to route_to("answers#create", :quiz_id => "1")
    end
  end
end
