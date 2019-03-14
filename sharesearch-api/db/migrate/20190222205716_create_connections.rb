class CreateConnections < ActiveRecord::Migration[5.2]
  def change
    create_table :connections do |t|
      t.integer :connected_id
      t.integer :connector_id
      t.boolean :accepted, default: false

      t.timestamps
    end
    
    add_index :connections, :connected_id 
    add_index :connections, :connector_id
    add_index :connections, [:connected_id, :connector_id], unique: true
  end
end
