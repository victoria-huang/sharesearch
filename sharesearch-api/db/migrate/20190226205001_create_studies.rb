class CreateStudies < ActiveRecord::Migration[5.2]
  def change
    create_table :studies do |t|
      t.string :title
      t.references :group, foreign_key: true
      t.references :journal, foreign_key: true
      t.integer :primary_id
      t.integer :corresponding_id
      t.text :abstract
      t.string :file

      t.timestamps
    end
  end
end
