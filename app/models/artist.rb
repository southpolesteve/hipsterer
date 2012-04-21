class Artist
  include Mongoid::Document
  field :hottnesss, :type => Float
  field :familiarity, :type => Float
  field :name, :type => String
  index :name, unique: true
  attr_accessible :hottnesss, :familiarity, :name

  after_create :update_familiarty_and_hottnesss

  def update_familiarty_and_hottnesss
    self.familiarity = Echonest.familiarity(name)
    self.hottnesss = Echonest.hottnesss(name)
    save!
  end

end