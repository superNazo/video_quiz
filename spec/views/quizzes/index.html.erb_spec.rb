require 'rails_helper'

RSpec.describe "quizzes/index", type: :view do
  before(:each) do
    view.stub(:will_paginate)
    assign(:quizzes, [
      Quiz.create!(
        :name => "Name"
      ),
      Quiz.create!(
        :name => "Name"
      )
    ])
  end

  it "renders a list of quizzes" do
    render
    assert_select "tr>td", :text => "Name".to_s, :count => 2
  end
end
