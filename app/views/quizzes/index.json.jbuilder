json.total_items @quizzes.count
json.collection (@quizzes) do |quiz|
  json.extract! quiz, :id, :name
  json.url quiz_url(quiz, format: :json)
end
