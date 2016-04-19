require 'rails_helper'

RSpec.describe Users::OmniauthCallbacksController, type: :controller do
  describe "GET #facebook" do
    before(:each) do
      @user = User.create!(email: "t@p.ua", provider: 'facebook', uid: '123545')
      valid_facebook_login_setup
      request.env["devise.mapping"] = Devise.mappings[:user]
      request.env["omniauth.auth"] = OmniAuth.config.mock_auth[:facebook]
      get :facebook
    end

    it "should set user_id" do
      expect(subject.current_user.id).to eq(@user.id)
    end

    it "should redirect to quizzes path" do
      expect(response).to redirect_to root_path
    end
  end
end
