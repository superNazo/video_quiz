json.max "4"
json.quizzes @quizzes do |quiz|
  json.extract! quiz, :id, :name
  json.url quiz_url(quiz, format: :json)
end
