class HomeController < ApplicationController
  def index
    unless current_user
      render "logged_out" and return
    else
      if params[:friend_id]
        @friend_likes = current_user.facebook.get_connections(params[:friend_id].to_s, "music")
        @friend_likes.each do |like|
          like['familiarity'] = Echonest.familiarity(like['name'])
        end
        @friend = current_user.facebook_friends.select{ |friend| friend['id'] == params[:friend_id]}.first
        @user_likes = current_user.facebook_music_likes
        unless @friend_likes.size == 0 || @user_likes == 0
          @recommended = @friend_likes.select{ |like| like['familiarity'] < 0.7}
          @percent = (100 - (avg(@friend_likes)/avg(@user_likes))*100).to_i*2.abs
        end
      end
      @friends = current_user.facebook_friends
    end
  end

  def vinyl
    @result = Discogs.vinyl?(params[:name])
    render "vinyl", :layout => false
  end

  def avg(array)
    array.map{|a| a['familiarity']}.sum/array.size
  end
end
