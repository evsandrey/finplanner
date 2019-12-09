module V1
  class PostsController < ApplicationController
    before_action :set_post,     only: [:show, :update, :destroy]

    before_action :authorize_access_request!, only: [:create, :update, :destroy]
    ROLES = %w[admin manager user].freeze
 
  # GET /posts
    def index
      posts = Post.all.order(created_at: :desc).includes(:user)
      posts_with_associations = posts.map do |post|
        post.attributes.merge(
          'user' => post.user.as_json
        )
      end  
      render(json: posts_with_associations)
    end

  # GET /posts/1
    def show
      logger.debug @post.user.as_json
      render json: @post.attributes.merge(
        'user' => @post.user.as_json
      )
    end

  # POST /posts
    def create
      @post = Post.new(post_params)
      @post.user_id = current_user.id
      if @post.save
        render(        json: @post,         status: :created)
      else
        render(        json: @post.errors,         status: :unprocessable_entity)
      end
    end

  # PATCH/PUT /posts/1
    def update
      if @post.update(post_params)
        render(        json: @post)
      else
        render(        json: @post.errors,         status: :unprocessable_entity)
      end
    end

  # DELETE /posts/1
    def destroy
      @post.destroy
    end

    private

    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.includes(:user).find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def post_params
      params.require(:post).permit(:title, :text, :user_id)

    end

    def token_claims
      {aud: ROLES, verify_aud: true}
    end
  end
end
