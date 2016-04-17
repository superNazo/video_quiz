json.extract! @quiz, :id, :name, :created_at, :updated_at
json.questions @quiz.questions do |question|
  json.extract! question, :id, :content
end
