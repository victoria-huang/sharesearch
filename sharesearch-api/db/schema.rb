# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_03_18_180556) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "connections", force: :cascade do |t|
    t.integer "connected_id"
    t.integer "connector_id"
    t.boolean "accepted", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["connected_id", "connector_id"], name: "index_connections_on_connected_id_and_connector_id", unique: true
    t.index ["connected_id"], name: "index_connections_on_connected_id"
    t.index ["connector_id"], name: "index_connections_on_connector_id"
  end

  create_table "conversations", force: :cascade do |t|
    t.string "room_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "journals", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "address"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "messages", force: :cascade do |t|
    t.string "content"
    t.bigint "conversation_id"
    t.integer "sender_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["conversation_id"], name: "index_messages_on_conversation_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "content"
    t.bigint "user_id"
    t.bigint "study_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["study_id"], name: "index_reviews_on_study_id"
    t.index ["user_id"], name: "index_reviews_on_user_id"
  end

  create_table "specialties", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "studies", force: :cascade do |t|
    t.string "title"
    t.bigint "group_id"
    t.bigint "journal_id"
    t.integer "primary_id"
    t.integer "corresponding_id"
    t.text "abstract"
    t.boolean "is_complete"
    t.string "final_draft_file"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_studies_on_group_id"
    t.index ["journal_id"], name: "index_studies_on_journal_id"
  end

  create_table "user_conversations", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "conversation_id"
    t.index ["conversation_id"], name: "index_user_conversations_on_conversation_id"
    t.index ["user_id"], name: "index_user_conversations_on_user_id"
  end

  create_table "user_groups", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "group_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["group_id"], name: "index_user_groups_on_group_id"
    t.index ["user_id"], name: "index_user_groups_on_user_id"
  end

  create_table "user_specialties", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "specialty_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["specialty_id"], name: "index_user_specialties_on_specialty_id"
    t.index ["user_id"], name: "index_user_specialties_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.string "first_name"
    t.string "last_name"
    t.string "email"
    t.string "bio"
    t.string "degree"
    t.string "position"
    t.string "institution"
    t.string "ed_level"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "messages", "conversations"
  add_foreign_key "reviews", "studies"
  add_foreign_key "reviews", "users"
  add_foreign_key "studies", "groups"
  add_foreign_key "studies", "journals"
  add_foreign_key "user_conversations", "conversations"
  add_foreign_key "user_conversations", "users"
  add_foreign_key "user_groups", "groups"
  add_foreign_key "user_groups", "users"
  add_foreign_key "user_specialties", "specialties"
  add_foreign_key "user_specialties", "users"
end
