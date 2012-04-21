class User
  include Mongoid::Document
  field :provider, :type => String
  field :uid, :type => String
  field :name, :type => String
  field :email, :type => String
  field :token, :type => String
  field :facebook_music_likes, :type => Array
  field :facebook_friend_ids, :type => Array
  attr_accessible :provider, :uid, :name, :email, :token

  after_create :update_friends_and_music_likes

  def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth['provider']
      user.uid = auth['uid']
      if auth['info']
         user.name = auth['info']['name'] || ""
         user.email = auth['info']['email'] || ""
      end
      if auth['credentials']
        user.token = auth['credentials']['token']
      end
    end
  end

  def update_friends_and_music_likes
    self.facebook_music_likes = get_music_likes
    save!
  end

  def facebook
    Koala::Facebook::API.new(token)
  end

  def get_music_likes
    facebook.get_connections('me','music')
  end

end

