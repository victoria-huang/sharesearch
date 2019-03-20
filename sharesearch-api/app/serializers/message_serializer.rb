class MessageSerializer < ActiveModel::Serializer
  attributes :id, :content, :sender, :created_at
  has_one :conversation
end
