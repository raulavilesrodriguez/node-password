const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

//para los puntos finales de messages
router.delete("/:id", (req, res)=>{
    const {id} = req.params;

    Lessons.removeMessages(id)
    .then(count =>{
        if(count >0){
            res.status(200).json({message: `Mensaje borrado con id ${id}`})
        } else{
            res.status(404).json({message: "no hay mensaje con ese id"})
        }
    })
    .catch(error =>{
        res.status(500).json({message: "no se puede borrar el mensaje"})
    });
});

module.exports = router;