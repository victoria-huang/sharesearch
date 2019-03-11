class Api::V1::SpecialtiesController < ApplicationController
    skip_before_action :authorized, only: [:index]

    def index 
        @specialties = Specialty.all
        render json: @specialties, status: 200
    end
end
