class User < ApplicationRecord
    has_secure_password

    has_many :user_groups
    has_many :groups, through: :user_groups
    has_many :user_specialties
    has_many :specialties, through: :user_specialties
    has_many :reviews

    has_many :connected_relationships, class_name: 'Connection', foreign_key: 'connected_id', dependent: :destroy
    has_many :connector_relationships, class_name: 'Connection', foreign_key: 'connector_id', dependent: :destroy

    # has_many :connections, through: :connector_relationships, source: :connected

    validates :username, uniqueness: true

    def accepted_connections
        connections = self.connector_relationships.select { |c| c.accepted }
        connections.map { |c| c.connected }
    end

    def pending_connections
        connections = self.connector_relationships.select { |c| !c.accepted }
        connections.map { |c| c.connected }
    end
end
