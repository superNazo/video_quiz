require 'rails_helper'

RSpec.describe QuizzesController, type: :controller do
  before(:each) do
    @user = User.create!(email: "user@example.org", name: "Name")
    sign_in @user
  end

  let(:valid_attributes) {
    { name: 'New quiz' }
  }

  let(:invalid_attributes) {
    { name: ' ' }
  }

  let(:valid_session) { {} }

  describe "GET #index" do
    it "assigns all quizzes as @quizzes" do
      quiz = Quiz.create! valid_attributes

      get :index, {}, valid_session

      expect(assigns(:quizzes)).to eq([quiz])
    end

    it "redirect to home page if not sign in" do
      sign_out @user

      get :index, {}, valid_session

      expect(response.status).to eq 302
    end

    it "if user sign in show quizzes" do
      get :index, {}, valid_session

      expect(response.status).to eq 200
    end
  end

  describe "GET #show" do
    it "assigns the requested quiz as @quiz" do
      quiz = Quiz.create! valid_attributes

      get :show, {:id => quiz.to_param}, valid_session

      expect(assigns(:quiz)).to eq(quiz)
    end
  end

  describe "GET #new" do
    it "assigns a new quiz as @quiz" do
      get :new

      expect(assigns(:quiz)).to be_a_new(Quiz)
    end
  end

  describe "GET #edit" do
    it "assigns the requested quiz as @quiz" do
      quiz = Quiz.create! valid_attributes

      get :edit, {:id => quiz.to_param}, valid_session

      expect(assigns(:quiz)).to eq(quiz)
    end
  end

  describe "POST #create" do
    context "with valid params" do
      it "creates a new Quiz" do
        expect {
          post :create, {:quiz => valid_attributes}, valid_session
        }.to change(Quiz, :count).by(1)
      end

      it "assigns a newly created quiz as @quiz" do
        post :create, {:quiz => valid_attributes}, valid_session

        expect(assigns(:quiz)).to be_a(Quiz)
        expect(assigns(:quiz)).to be_persisted
      end

      it "redirects to the created quiz" do
        post :create, {:quiz => valid_attributes}, valid_session

        expect(response).to redirect_to(Quiz.last)
      end
    end

    context "with invalid params" do
      it "assigns a newly created but unsaved quiz as @quiz" do
        post :create, {:quiz => invalid_attributes}, valid_session

        expect(assigns(:quiz)).to be_a_new(Quiz)
      end

      it "re-renders the 'new' template" do
        post :create, {:quiz => invalid_attributes}, valid_session

        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    context "with valid params" do
      let(:new_attributes) {
        { name: 'updated name' }
      }

      it "updates the requested quiz" do
        quiz = Quiz.create! valid_attributes

        put :update, {:id => quiz.to_param, :quiz => new_attributes}, valid_session

        expect(quiz.reload.name).to eq ('updated name')
      end

      it "assigns the requested quiz as @quiz" do
        quiz = Quiz.create! valid_attributes

        put :update, {:id => quiz.to_param, :quiz => valid_attributes}, valid_session

        expect(assigns(:quiz)).to eq(quiz)
      end

      it "redirects to the quiz" do
        quiz = Quiz.create! valid_attributes

        put :update, {:id => quiz.to_param, :quiz => valid_attributes}, valid_session

        expect(response).to redirect_to(quiz)
      end
    end

    context "with invalid params" do
      it "assigns the quiz as @quiz" do
        quiz = Quiz.create! valid_attributes

        put :update, {:id => quiz.to_param, :quiz => invalid_attributes}, valid_session

        expect(assigns(:quiz)).to eq(quiz)
      end

      it "re-renders the 'edit' template" do
        quiz = Quiz.create! valid_attributes

        put :update, {:id => quiz.to_param, :quiz => invalid_attributes}, valid_session

        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    it "destroys the requested quiz" do
      quiz = Quiz.create! valid_attributes

      expect {
        delete :destroy, {:id => quiz.to_param}, valid_session
      }.to change(Quiz, :count).by(-1)
    end

    it "redirects to the quizzes list" do
      quiz = Quiz.create! valid_attributes

      delete :destroy, {:id => quiz.to_param}, valid_session

      expect(response).to redirect_to(quizzes_url)
    end
  end
end
