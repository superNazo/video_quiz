class VideoRecorderController < ApplicationController
  before_action :ziggeo_init, :all_videos, only: :index

  def index
  end

  private

  def ziggeo_init
    @ziggeo = Ziggeo.new(Rails.application.secrets.ziggeo_api_token,
                         Rails.application.secrets.ziggeo_private_key,
                         Rails.application.secrets.ziggeo_encryption_key)
  end

  def all_videos
    @all_videos = []
    @ziggeo.videos.index.map { |video| @all_videos.push(video["token"]) }
  end
end
