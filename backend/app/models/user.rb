class User < ApplicationRecord
   has_secure_password
   has_one_attached :avatar
   
   has_many :posts

   enum role: %i[user manager admin].freeze
   
   validates :email,
            format: { with: URI::MailTo::EMAIL_REGEXP },
            presence: true,
            uniqueness: { case_sensitive: false }

   def avatar_url
       if self.avatar.attached? 
        Rails.application.routes.url_helpers.polymorphic_url(self.avatar.variant(resize_to_limit: [300, 300]).processed)
        #Rails.application.routes.url_helpers.rails_blob_path(self.avatar, only_path: true)
       else
         nil
       end
   end

   def as_json
      super(only: [:id, :username, :email, :role], methods: :avatar_url)
   end

   def generate_password_token!
      begin
        self.reset_password_token = SecureRandom.urlsafe_base64
      end while User.exists?(reset_password_token: self.reset_password_token)
      self.reset_password_token_expires_at = 1.day.from_now
      save!
    end
  
    def clear_password_token!
      self.reset_password_token = nil
      self.reset_password_token_expires_at = nil
      save!
    end

end
