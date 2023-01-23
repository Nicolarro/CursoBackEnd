import express from 'express';
import mongoose from 'mongoose';
import { userModel } from '../models/users.models.js'

const router = express.Router()

router.get('/', async (req, res) => {
    
    try {
        const users = await userModel.find()
        res.send({
            result: "success",
            payload: users
        })
    } catch (error) {
        console.error("Cannot get users from mongo ", error);
    }

})

    router.post( '/' , async (req,res) => {
    // Primero obtenemos los datos que necesitaremos, segün 10 definido en nuestro schema.
    let {first_name, last_name, email}= req.body
    // Evaluamos que los valores si existan
    if( !first_name, !last_name, !email) return res.send({status: "error", error: "Incomplete values"});
    // Si todo estå en orden, pedimos a mongoose que inserte el nuevo documento.
    //Nota que aqui, para poder crear un modelo, utilizaremos el
    let result
    = await userModel.create({
    first_name,
    last_name,
    email
    })
    console.log(result)
    //Dev01vemos el usuario recién creado.l
    res.send ( {status : "success" , payload : result})
    })

router.put('/:uuid', async (req, res) => {
    const { uuid } = req.params

    const userToReplace = req.body

    const result = await userModel.updateOne({_id: uuid}, userToReplace)

    res.send({status: 'success', payload: result})
})


router.delete('/:uuid', async (req, res) => {
    const { uuid } = req.params

    const result = await userModel.deleteOne({_id: uuid})

    res.send({status: 'success', payload: result})
})


export default router