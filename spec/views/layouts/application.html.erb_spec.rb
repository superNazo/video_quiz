require 'rails_helper'
RSpec.describe "layouts/application" do
  it "home page for not sign in user" do
    render

    expect(rendered).to match %r{<a href="/">Home</a>}
    expect(rendered).to match %r{<a href="/users/auth/facebook">Sign in with Facebook</a>}
  end

  it "home page for sign in user" do
    user = User.create!(email: "sample@example.org", name: "Sample")
    sign_in user
    render

    expect(rendered).to match %r{<a href="/quizzes">Home</a>}
    expect(rendered).to match %r{<a rel="nofollow" data-method="delete" href="/sign_out">Log out</a>}
  end
end
