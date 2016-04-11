class CreateInterviews < ActiveRecord::Migration
  def change
    create_table :interviews do |t|
      t.references :quiz, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true
      t.references :current_question, index: true, foreign_key: true
      t.string :status

      t.timestamps null: false
    end
  end
end
