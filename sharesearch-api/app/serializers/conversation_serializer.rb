class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :room_name, :users
  has_many :messages

  def users 
    object.users.map do |u| 
      { 
        first_name: u.first_name,
        last_name: u.last_name,
        username: u.username
      }
    end
  end
end
