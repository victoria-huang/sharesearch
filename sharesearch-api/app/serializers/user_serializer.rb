class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :bio, :degree, :position, :institution
end
