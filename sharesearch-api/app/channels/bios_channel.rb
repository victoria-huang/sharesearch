class BiosChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"

    stream_from "bios"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    user = User.find(data["id"])
    user.update!(bio: data["bio"])
    ActionCable.server.broadcast('bios', data)
  end
end
