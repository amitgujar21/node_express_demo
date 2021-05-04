const express = require('express');
const router = express.Router();
const { people } = require('../data');

router.get('/', (req, res) => {
    res.status(200).json({ success: true, data: people});
})

router.post('/', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({success: false, msg:'Please provide the name.'});
    }
    res.status(201).json({success: true, person: name});
})

router.post('/postman', (req, res) => {
    const { name } = req.body;
    if(!name) {
        return res.status(400).json({success: false, msg:'Please provide the name.'});
    }
    const newPeople = {
        id: new Date().toISOString(),
        name: name
    }
    res.status(201).json({success: true, data: [...people, newPeople]});
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    const person = people.find((people) => people.id === Number(id));

    if(!person) {
        return res.status(400).json({success: false, msg: `No people found with id ${id}`});
    }

    const newPeople = people.map((people) => {
        if(people.id === Number(id)) {
            people.name = name;
        }
        return people;
    });

    res.status(200).json({success: true, data: newPeople});
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    
    const person = people.find((person) => person.id === Number(id));

    if(!person) {
        return res.status(400).json({success: false, msg: `No person found with id ${id}`});
    }

    const newPeople = people.filter((person) => person.id != Number(id));
    res.status(200).json({success: true, data: newPeople});
})

module.exports = router;