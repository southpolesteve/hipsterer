class Echonest
  include HTTParty
  base_uri "http://developer.echonest.com/api/v4"
  default_params :api_key => "ABUMALOOTAJPCMUKU"

  def self.hottnesss(artist_name)
    response = get("/artist/hotttnesss/", :query => {:name => artist_name })['response']
    if response['artist']
      response['artist']['hotttnesss']
    else
      0
    end
  end

  def self.familiarity(artist_name)
    response = get("/artist/familiarity/", :query => {:name => artist_name })['response']
    if response['artist']
      response['artist']['familiarity']
    else
      0
    end
  end

end