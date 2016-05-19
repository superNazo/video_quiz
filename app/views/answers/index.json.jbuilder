json.array!(@answers) do |answer|
  json.extract! answer, :id, :interview_id, :video_token
  json.url answer_url(answer, format: :json)
end
