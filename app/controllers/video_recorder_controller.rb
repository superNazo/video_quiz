class VideoRecorderController < ApplicationController
  before_action :ziggeo_init, :all_videos, only: :index

  def index
  end

  private

  def ziggeo_init
    @ziggeo = Ziggeo.new('1eb1e578bfc596f031a607decb12685c', +
      + '9c6ce0e56f7ee53aaafda64be7b91ea6', +
      + '6ef0ee7153dce4d1a61dcbc7c65b248b')
  end

  def all_videos
    @all_videos = []
    @ziggeo.videos.index.map { |video| @all_videos.push(video['token']) }
  end
end
