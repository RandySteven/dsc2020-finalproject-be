const { table } = require("../../src/config/db");

exports.up = function(knex) {
  return knex.schema.createTable('provinces', function(table){
    table.increments(),
    table.string('name'),
    table.integer('recovered'),
    table.integer('death'),
    table.integer('positive'),
    table.timestamps(),
    table.timestamp('deleted_at').nullable()
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('provinces');
};
