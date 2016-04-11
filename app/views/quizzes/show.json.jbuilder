json.(@quiz, :id, :name, :created_at, :updated_at)

json.quiz_questions @quiz.questions do |question|
  json.(question, :id, :content)
end
