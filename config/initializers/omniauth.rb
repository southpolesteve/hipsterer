Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, 
          ENV["FACEBOOK_APP_ID"], 
          ENV["FACEBOOK_APP_SECRET"], 
          {:scope => "user_likes, friends_likes, email"}
end
