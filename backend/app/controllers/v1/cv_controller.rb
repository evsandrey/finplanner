module V1
    class CvController < ApplicationController
      # GET /cv
      def get_cv
        user = User.includes(:jobs).first
        render(json: user.as_cv)
      end
    end
end
    