class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :bio
      t.string :degree
      t.string :position
      t.string :institution

      t.timestamps
    end
  end
end
