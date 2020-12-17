
exports.up = function(knex) {
  return knex.schema.createTable('lessons', tbl =>{
      tbl.increments() //campo id
      tbl.text('name', 128).notNullable()
      tbl.timestamps(true, true)  //crea la fecha y el otro true para modificar
  })
  .createTable('messages', tbl=>{
      tbl.increments()  //campo id
      tbl.string('sender')
      .notNullable()
      .index();
      tbl.text('text')
      .notNullable();
      tbl.timestamps(true, true)

      //columna con la key de la tabla 'lessons'
      tbl.integer('lesson_id')
      .unsigned()
      .references('id')
      .inTable('lessons')
      .onDelete('CASCADE')  //especifica que los datos secundarios se eliminan cuando se eliminan los datos principales.
      .onUpdate('CASCADE')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('messages').dropTableIfExists('lessons')
};
