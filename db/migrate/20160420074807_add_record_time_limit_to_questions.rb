class AddRecordTimeLimitToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :record_time_limit, :integer
  end
end
