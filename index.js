const express = require('express')
const Lessons = require('./models/dbHelpers')
const server = express()

server.use(express.json())

const PORT = 8000;

server.get('/', (req, res)=> {
    res.json({message: 'Hola Feliz Navidad'});
});

server.post('/api/lessons', (req, res)=>{
    Lessons.add(req.body)
    .then(lesson =>{
        res.status(200).json(lesson)
    })
    .catch(error =>{
        res.status(500).json({message: "no se puede añadir lesson"})
    });
});

server.get('/api/lessons', (req, res) =>{
    Lessons.find()
    .then(lesson =>{
        res.status(200).json(lesson)
    })
    .catch(error => {
        res.status(500).json({message: "no se puede encontrar registros"})
    });
});

server.get('/api/lessons/:id', (req, res) =>{
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

server.delete('/api/lessons/:id', (req, res) =>{
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

server.patch('/api/lessons/:id', (req, res)=>{
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
    })

})

server.listen(PORT, ()=>{
    console.log(`\n **Servidor Cooriendo en el puerto ${PORT}** \n`)
})
