module V1
    module Users
      class SignupController < ApplicationController
        def create
          user = User.new(user_params)
          if user.save
            payload  = { user_id: user.id, aud: [user.role] }
            session = JWTSessions::Session.new(payload: payload,
                                              refresh_by_access_allowed: true)
            tokens = session.login

            response.set_cookie(JWTSessions.access_cookie,
                                value: tokens[:access],
                                httponly: true,
                                secure: Rails.env.production?)
            render json: { 
              csrf: tokens[:csrf],
              jwt: tokens[:access], 
              user: user
            }
          else
            render json: { error: user.errors.full_messages.join(' ') },
                  status: :unprocessable_entity
          end
        end
        private

        def user_params
          params.permit(:email, :username, :password)
        end

      end
    end
end