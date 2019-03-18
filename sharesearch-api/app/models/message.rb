class Message < ApplicationRecord
  belongs_to :conversation
  belongs_to :sender, class_name: 'User', foreign_key: 'sender_id'

  validates :content, presence: true
end
