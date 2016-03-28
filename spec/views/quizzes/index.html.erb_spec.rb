require 'rails_helper'

RSpec.describe "quizzes/index", type: :view do
  before(:each) do
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

    it "should have a pagination bar" do
    assign(:quizzes, quizzes.paginate(per_page: 2))
    render
 
    expect(rendered).to have_selector("div.pagination")
  end
end
