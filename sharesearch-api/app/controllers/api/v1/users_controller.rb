class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def profile 
        render json: UserSerializer.new(current_user), status: :accepted
    end

    def create
        @user = User.create(user_params.except(:specialties))
        
        if @user.valid?
            user_params[:specialties].each { |sId| UserSpecialty.create(specialty_id: sId.to_i, user_id: @user.id) }
            # selected_specialties = user_params[:specialties].map{ |id| Specialty.find(id) }
            # @user.update(specialties: selected_specialties)
            @token = encode_token(user_id: @user.id)
            render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
        else
            render json: { error: 'Failed to create user'}, status: :not_acceptable
        end
    end

    private 

    def user_params 
        params.require(:user).permit(
            :username, 
            :password,
            :first_name,
            :last_name,
            :email,
            :bio, 
            :degree,
            :position,
            :institution,
            :ed_level,
            specialties: []
        )
    end
end
