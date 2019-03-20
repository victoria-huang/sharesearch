class User < ApplicationRecord
    has_secure_password

    has_many :user_groups
    has_many :groups, through: :user_groups
    has_many :user_specialties
    has_many :specialties, through: :user_specialties
    has_many :reviews
    has_many :user_conversations
    has_many :conversations, through: :user_conversations

    has_many :connected_relationships, class_name: 'Connection', foreign_key: 'connected_id', dependent: :destroy
    has_many :connector_relationships, class_name: 'Connection', foreign_key: 'connector_id', dependent: :destroy

    # has_many :connections, through: :connector_relationships, source: :connected

    validates :username, uniqueness: true

    # all accepted connections
    def all_accepted_connections
        connections = accepted_requests.concat(accepted_connections)
    end

    # requests from other
    def pending_requests 
        connections = self.connected_relationships.select { |c| !c.accepted }
        connections.map { |c| c.connector.format_connection }
    end

    # my accepted requests
    def accepted_requests 
        connections = self.connected_relationships.select { |c| c.accepted }
        connections.map { |c| c.connector.format_connection }
    end

    # my pending requests
    def pending_connections
        connections = self.connector_relationships.select { |c| !c.accepted }
        connections.map { |c| c.connected.format_connection }
    end

    # accepted requests from others
    def accepted_connections 
        connections = self.connector_relationships.select { |c| c.accepted }
        connections.map { |c| c.connected.format_connection }
    end

    def format_connection
        {
            id: self.id,
            username: self.username,
            first_name: self.first_name,
            last_name: self.last_name,
            email: self.email
        }
    end

    def all_studies 
        self.groups.map { |g| g.studies }.flatten
    end

    def solo_studies 
        solo_group = self.groups.find { |g| g.name === "#{self.username}-solo" }
        solo_group ? solo_group.studies : []
    end
end
