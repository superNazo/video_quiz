class Users::SessionsController < Devise::SessionsController
# before_filter :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
   def create
  #   super
     @user = User.find_or_create_from_auth_hash(auth_hash)
     self.current_user = @user
     redirect_to '/'
   end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

   protected
   def auth_hash
     request.env['omniauth.auth']
   end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.for(:sign_in) << :attribute
  # end
end
