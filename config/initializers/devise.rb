Devise.setup do |config|
  config.omniauth :facebook, Rails.application.secrets.facebook_app_id, Rails.application.secrets.facebook_app_secret
  require 'devise/orm/active_record'
  config.strip_whitespace_keys = [:email]
  config.skip_session_storage = [:http_auth]
  config.stretches = Rails.env.test? ? 1 : 10
  config.reconfirmable = true
  config.expire_all_remember_me_on_sign_out = true
  config.password_length = 8..72
  config.timeout_in = 30.minutes
  config.reset_password_within = 6.hours
  config.sign_out_via = :delete
  config.secret_key = Rails.application.secrets.secret_key_base || '8ed23f0f9f'
end
