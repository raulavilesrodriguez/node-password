const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

//todos los puntos finales de lessons
router.post('/', (req, res)=>{
    Lessons.add(req.body)
    .then(lesson =>{
        res.status(200).json(lesson)
    })
    .catch(error =>{
        res.status(500).json({message: "no se puede añadir lesson"})
    });
});

router.get('/', (req, res) =>{
    Lessons.find()
    .then(lesson =>{
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message: "no se puede encontrar registros"})
    });
});

router.get('/:id', (req, res) =>{
    const {id} = req.params;
    Lessons.findById(id)
    .then(lesson=> {
         if(lesson){
             res.status(200).json(lesson)
         } else{
             res.status(404).json({message:"Registro no encontrado"});
         }
    })
    .catch(error =>{
        res.status(500).json({message: "Error de búsqueda"})
    })
})

router.delete('/:id', (req, res) =>{
    const {id} = req.params;

    Lessons.remove(id)
    .then(count =>{
        if(count > 0){
            res.status(200).json({message: "Borrado exitósamente"})
        } else{
            res.status(404).json({message: "no se puede borrar"})
        }
    })
    .catch(error =>{
        res.status(500).json({message: "No se puede realizar el borrado"})
    })
})

router.patch('/:id', (req, res)=>{
    const{id}= req.params;
    const changes = req.body;

    Lessons.update(id, changes)
    .then(lesson =>{
        if(lesson){
            res.status(200).json(lesson)
        } else {
            res.status(404).json({messagen:"registro no encontrado"})
        }
    })
    .catch(error =>{
        res.status(500).json({message: "Error al actualizar"})
    });

});

router.post("/:id/messages", (req, res)=> {
    const {id} = req.params; //aqui id es string
    const msg = req.body;

    if(!msg.lesson_id){
        msg["lesson_id"] = parseInt(id, 10)  //aquí id le devuelve un número entero
    }

    Lessons.findById(id)
    .then(lesson => {
        if(!lesson){
            res.status(404).json({message: "Invalida id"})
        }
        //revisar todos los campos
        if(!msg.sender || !msg.text){
            res.status(400).json({message: "Debes suministrar los campos sender y text"})
        }

    Lessons.addMessage(msg, id)
    .then(message => {
        if(message){
            res.status(200).json(message)
        }
    })
    .catch(error =>{
        res.status(500).json({message: "Error al encontrar tus leccioens"})
    })

    })
    .catch(error => {
        res.status(500).json({message: "Error al encontrar tus clases"})
    });
});

router.get("/:id/messages", (req, res)=>{
    const {id} = req.params;

    Lessons.findLessonMessages(id)
    .then(lessons =>{
        res.status(200).json(lessons)
    })
    .catch(error =>{
        res.status(500).json({messages: "Error al recuperar el mensaje"})
    });
});

module.exports = router;