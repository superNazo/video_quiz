json.array!(@answers) do |answer|
  json.extract! answer, :id, :interview_id, :video_token
  json.url quiz_answer_url(@quiz, answer, format: :json)
end
