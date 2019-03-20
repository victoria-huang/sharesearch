class Api::V1::ConversationsController < ApplicationController
    def index 
        @conversations = current_user.conversations
        render json: @conversations
    end

    def create 
        @conversation = Coversation.create(conversation_params)

        if @conversation.valid?
            serialized_data = ActiveModelSerializers::Adapter::Json.new(
                ConversationSerializer.new(@conversation)
            ).serializable_hash

            ActionCable.server.broadcast 'conversation_channel', serialized_data
            head :ok
        end
    end

    private 

    def conversation_params 
        params.require(:conversation).permit(:room_name)
    end
end

