class CreateJobs < ActiveRecord::Migration[6.0]
  def change
    create_table :jobs do |t|
      t.datetime :join_date
      t.datetime :quit_date
      t.string :position
      t.string :company
      t.string :company_url
      t.text :description
      t.text :exp
      t.text :technologies
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
