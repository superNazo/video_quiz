require 'rails_helper'

RSpec.describe HomeController, type: :controller do
  describe "GET #index" do
    it "if user signed in redirect to quizzes page" do
      user = User.create!(email: "user@example.org", name: "Name")
      sign_in user

      get :index, {}
      
      expect(response).to redirect_to quizzes_path
    end

    it "if user is NOT signed in render index view" do
      get :index, {}
      expect(response).to render_template("index")
    end
  end
end
