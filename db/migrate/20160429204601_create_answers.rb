class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.references :interview, index: true, foreign_key: true
      t.string :video_token

      t.timestamps null: false
    end
  end
end
