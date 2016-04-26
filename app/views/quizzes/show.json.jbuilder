json.extract! @quiz, :id, :name, :created_at, :updated_at
json.questions_attributes @quiz.questions do |question|
  json.extract! question, :id, :content, :record_time_limit
end
