class Api::V1::MessagesController < ApplicationController
    def create
        @message = Message.create(message_params)
        @conversation = Conversation.find(message_params[:conversation_id])

        if @message.valid?
            serialized_data = ActiveModelSerializers::Adapter::Json.new(
                MessageSerializer.new(@message)
            ).serializable_hash

            MessageChannel.broadcast_to @conversation, serialized_data
            head :ok
        end
    end
    
    private
    
    def message_params
        params.require(:message).permit(:content, :conversation_id, :sender_id)
    end
end
