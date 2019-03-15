class Api::V1::ConnectionsController < ApplicationController

    def create 
        byebug
    end

    private 

    def connection_params 
        params.require(:connection).permit(
            :connector_id, 
            :connected_id
        )
    end
end
