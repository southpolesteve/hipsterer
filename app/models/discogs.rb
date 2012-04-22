class Discogs
  include HTTParty
  base_uri "http://api.discogs.com"

  def self.vinyl?(artist_name)
    response = get("/database/search", :query => {:q => artist_name, :per_page => 30, :type => "release"})
    if response['results'].empty?
      return false
    else
      response['results'].map{ |r| r['format'].first}.uniq.include?("Vinyl")
    end
  end

end
