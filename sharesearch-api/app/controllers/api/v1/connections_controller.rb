class Api::V1::ConnectionsController < ApplicationController
    before_action :find_connection, only: %i[accept reject]

    def create 
        @connection = Connection.create(connection_params)

        if @connection.valid?
            render json: @connection, status: :accepted
        else 
            render json: { error: 'Failed to create connection'}, status: :not_acceptable
        end
    end

    def accept 
        @connection.update(accepted: true)

        render json: @connection, status: 200
    end

    def reject
        @connection.destroy

        render json: { message: 'Connection request rejected' }, status: 200
    end

    private 

    def find_connection
        @connection = Connection.find_by(connection_params)
    end

    def connection_params 
        params.require(:connection).permit(
            :connector_id, 
            :connected_id
        )
    end
end
