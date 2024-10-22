import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
      return knex.schema.createTable('districts', (table) => {
            table.increments('id')
            table.string('district_name').notNullable()
            table.string('district_code').notNullable().unique()
            table.timestamps(true, true)
      })
}


export async function down(knex: Knex): Promise<void> {
      return knex.schema.dropTable('districts')
}

