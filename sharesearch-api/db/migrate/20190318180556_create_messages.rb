class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :content
      t.references :conversation, foreign_key: true
      t.integer :sender_id

      t.timestamps
    end
  end
end
