const fs = require('fs');
const path = require('path');
const crudModel = require("../models/crud.model")

const home = async(req,res) => {
    const cruds = await crudModel.find();

    res.render('index', {
        cruds
    })
}

const create = (req,res) => {
    res.render('create')
}

const store = async (req,res) => {
    const image = req.file.destination.replace("public", '') + '/' + req.file.filename
    await crudModel.create({
        name: req.body.name,
        email: req.body.email,
        contact: req.body.contact,
        image
    })

    res.redirect('/');
}

const edit = async(req,res) => {

    let data = await crudModel.findOne({_id: req.params.id})

    if(data) {
        res.render('edit', {
            data
        })
    }else {
        res.redirect('/');
    }
}

const update = async (req,res) => {
   
    if(req.file) {

        let response = await crudModel.findOne({_id: req.params.id});

        fs.unlinkSync(path.join(__dirname, "../public", response.image))
 
        const image = req.file.destination.replace("public", '') + '/' + req.file.filename

        await crudModel.updateOne({_id: req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            image
        })
    }else {
        await crudModel.updateOne({_id: req.params.id}, {
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact
        })
    }

    res.redirect('/');
}

const destroy = async (req,res) => {
    await crudModel.deleteOne({_id: req.params.id});

    res.redirect('/');
}

module.exports = {
    home,
    create,
    store,
    edit,
    update,
    destroy
}