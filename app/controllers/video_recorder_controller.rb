class VideoRecorderController < ApplicationController
  def index
    @ziggeo = Ziggeo.new('1eb1e578bfc596f031a607decb12685c', '9c6ce0e56f7ee53aaafda64be7b91ea6', '6ef0ee7153dce4d1a61dcbc7c65b248b')
    @all_videos = []
    @ziggeo.videos.index.map { |video| @all_videos.push(video['token']) }
  end
end
