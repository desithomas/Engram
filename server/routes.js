 const express = require('express')
 const router = express.Router()

 const {connectToDatabase} = require('./db')

 router.get('/health', function(req, res){ 
    res.json({
        status: "ok", 
        message: "running breezing sliding cruising"
    })
 } )

 router.get('/assignments', async function (req, res){
    try {
        const database = await connectToDatabase()

        const assignments = await database.collection('assignments').find({}).sort({dueDate: 1}).toArray()

        res.json(assignments)
    } catch (error){
        console.error('Unable to get the assignments.', error)

        res.status(500).json({error: 'Unable to get the assignments.'})
    
    }
 })

 router.post('/assignments', async function (req, res){
    try{
        const {
            title, 
            courseName, 
            assignmentType, 
            dueDate, 
            estimatedTime, 
            energyLevel, 
            status, 
            instructions
        } = req.body

        if ( !title || !courseName || !dueDate){
            return res.status(400).json({
                error: 'Title, course and the due date are needed'
            })
        }

        const assignment = {
            title: title, 
            courseName: courseName, 
            assignmentType: assignmentType || "",
            dueDate: dueDate, 
            estimatedTime: estimatedTime || "", 
            energyLevel: energyLevel || "", 
            status: status || 'notStarted', 
            instructions: instructions || '', 
            createdAt: new Date(), 
            updatedAt: new Date()
        }

        const database = await connectToDatabase()

        const result = await database
        .collection('assignments')
        .insertOne(assignment)

        res.status(201).json({...assignment, 
            _id: result.insertedId
        })
        }catch(error){
    console.error('Could not create the assignment', error)

        res.status(500).json({
            error: 'could not create the assignment.'
        })
    }
})


 module.exports = router