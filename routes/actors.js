const express = require('express');
const router = express.Router();
const Actor = require('../models/actor');


// ALL AUTHORS ROUTE
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const actors = await Actor.find(searchOptions)
        res.render('actors/index', {
            actors: actors,
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
    
})

//new
router.get('/new', (req, res) => {
    res.render('actors/new' , { actor: new Actor() })
})

//create
router.post('/', async (req, res) => {
    const actor = new Actor({
        name: req.body.name
    })
    try{
        const newActor = await actor.save()
        // res.redirect(`actors/${newActor.id}`)
        res.redirect(`actors`)

    } catch {
        res.render('actors/new', {
            actor: actor,
            errorMessage: 'Error creating Actor'
        })
    }
    // actor.save((err, newActor) => {
    //     if (err) {
    //         res.render('actors/new', {
    //             actor: actor,
    //             errorMessage: 'Error creating Actor'
    //         })
    //     } else{
    //         // res.redirect(`actors/${newActor.id}`)
    //         res.redirect(`actors`)
    //     }
    // })
})
module.exports = router;