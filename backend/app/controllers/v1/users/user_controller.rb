module V1
    module Users
        class UserController < ApplicationController
            before_action :authorize_access_request!

            def update_profile
                logger.debug user_params[:avatar]
                user = User.find_by!(email: user_params[:email])
                if user.update(updatable_params)
                    attach_main_pic(user,user_params[:avatar]) if user_params[:avatar].present? && user_params[:avatar] != "null" 
                    render json: user.as_json
                else
                   render json: user.errors, status: :unprocessable_entity 
                 end
            end

            def me
                render json: current_user.as_json
            end
            
            def attach_main_pic(user,avatar)
                user.avatar.attach(avatar)
            end
            
            def updatable_params
                {
                    username: user_params[:username],
                    email: user_params[:email]
                }
            end
            # Only allow a trusted parameter "white list" through.
            def user_params
                params.permit(:id, :email, :username, :role, :avatar, :avatar_url)
            end
        end
    end
end
