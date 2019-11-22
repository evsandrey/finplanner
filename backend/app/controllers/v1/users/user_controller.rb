module V1
    module Users
        class UserController < ApplicationController
            before_action :authorize_access_request!

            def me
                render json: current_user.as_json(only: [:id, :email, :username, :role])
            end
        end
    end
end
