class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :sender_id
  has_one :conversation
end
