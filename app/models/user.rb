class User
  include Mongoid::Document
  field :provider, :type => String
  field :uid, :type => String
  field :name, :type => String
  field :email, :type => String
  field :token, :type => String
  field :facebook_music_likes, :type => Array
  field :facebook_friends, :type => Array
  attr_accessible :provider, :uid, :name, :email, :token

  after_create :update_music_likes_and_friends

  def self.create_with_omniauth(auth)
    user = find_or_initialize_by uid: auth['uid'] 
    user.provider = auth['provider']
    user.uid = auth['uid']
    if auth['info']
       user.name = auth['info']['name'] || ""
       user.email = auth['info']['email'] || ""
    end
    if auth['credentials']
      user.token = auth['credentials']['token']
    end
    if user.save!
      user
    end
  end

  def update_music_likes_and_friends
    music_likes = get_music_likes
    music_likes.each do |like|
      like['familiarity'] = Echonest.familiarity(like['name'])
    end
    self.facebook_music_likes = music_likes
    self.facebook_friends = get_friends
    save!
  end

  def facebook
    Koala::Facebook::API.new(token)
  end

  def get_music_likes
    facebook.get_connections('me','music')
  end

  def friend_music_likes(friend_id)
    facebook.get_connections(friend_id.to_s, 'music')
  end

  def get_friends
    friends_array = facebook.get_connections('me','friends')
  end


end

