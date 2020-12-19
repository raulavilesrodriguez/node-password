//están los quieries de Knex
//const knex = require('knex')
//const config = require('../knexfile')
//const db = knex(config.development)
const db = require('../dbConfig');

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  addMessage,
  findLessonMessages,
  removeMessages
};

async function add(lesson) {
   return await db('lessons').insert(lesson, ['id', 'name'])
   //const [id] = await db('lessons').insert(lesson);
   //return findById(id);
}

function find(){
    return db('lessons');
}

function findById(id){
    return db('lessons')
    .where({id})  //es lo mismo que poner id: id
    .first()
}

function remove(id){
  return db('lessons')
  .where({id})
  .del();
}

function update(id, changes){
    return db('lessons')
        .where({id})
        .update(changes) //con el id se está siendo específico
        .then(() =>{
            return findById(id);
        });
        
}

function findMessageById(id){
    return db('messages')
    .where({id})
    .first();
}

async function addMessage(message, lesson_id){
    return await db('messages')
    .where({lesson_id})
    .insert(message, ['id'])
    //const [id] = await db('messages')
    //.where({lesson_id})
    //.insert(message);
    //return findMessageById(id);
}

function findLessonMessages(lesson_id){
    return db("lessons as l") //bd padre
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
        "l.id as LessonID",
        "l.name as LessonName",
        "m.id as MessageID",
        "m.sender",
        "m.text"
    )
    .where({lesson_id});
}

function removeMessages(id){
    return db("messages")
    .where({id})
    .del();
}