require "rails_helper"

RSpec.describe AnswersController, type: :routing do
  describe "routing" do

    it "routes to #new" do
      expect(:get => "/answers/new").to route_to("answers#new")
    end

    it "routes to #create" do
      expect(:post => "/answers").to route_to("answers#create")
    end

  end
end
