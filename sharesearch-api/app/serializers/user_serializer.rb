class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :first_name, :last_name, :email, :bio, :degree, :position, :institution, :all_studies, :solo_studies, :all_accepted_connections, :pending_connections, :pending_requests
  has_many :specialties
  has_many :groups

  def all_studies
    object.all_studies.map { |s| { id: s.id, title: s.title } }
  end

  def solo_studies
    object.solo_studies.map { |s| { id: s.id, title: s.title } }
  end
end
