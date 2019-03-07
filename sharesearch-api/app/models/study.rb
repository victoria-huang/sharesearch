class Study < ApplicationRecord
  belongs_to :group
  belongs_to :journal
  has_many :reviews
end
