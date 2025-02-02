const express = require('express');
const app = express();
const port = 4000;
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient();

app.use(express.json());


app.listen(port, () => {
    console.log("Server running on port",port);
});


app.get('/get-songs', async (req, res) => {
    const songs = await prisma.song.findMany();
    res.send(songs);
});

app.post('/add-song', async (req, res) => {
    const songData = req.body;
    
    if(!songData.songName || !songData.artist || !songData.genre) {
        res.send({error: "You've left empty fields"});
        return;
    }

    const song = await prisma.song.create({
        data: {
            songName: songData.songName,
            artist: songData.artist,
            genre: songData.genre
        }
    });

    res.send({song});
});

app.get('/event/:eventId', async (req,res) => {
    const eventId = parseInt(req.params.eventId);

    const event = await prisma.event.findUnique({
        where: {id: eventId},
        include : {rsvps: true}
    });

    res.send(event);
});

app.get('/event-RSVPs/:eventId', async (req, res) => {
    const eventId = parseInt(req.params.eventId);
    
    const RSVP = await prisma.RSVP.findMany({
        where : {eventId: eventId}
    }); 

    res.send(RSVP);
});

app.post('/add-event', async (req,res) => {
    const eventData = req.body; 

    if(!eventData.eventName || !eventData.description || !eventData.date) {
        res.send({error: "You've left empty fields"});
        return;
    }

    const event = await prisma.event.create({
        data: {
            eventName : eventData.eventName,
            description: eventData.description,
            date: new Date(eventData.date)
        }
    });

    res.send({success: "Successfully added event " + event.eventName, event});
});

app.post('/add-RSVP/:eventId', async (req, res) => {
    const eventId = parseInt(req.params.eventId);
    const RSVPData = req.body;

    if(!RSVPData.userName || !RSVPData.email || !RSVPData.attendanceStatus) {
        res.send({error: "You've left empty fields"});
        return;
    }
    console.log("STATUS: " + RSVPData.attendanceStatus);
    const validSatuses  = ["Going", "Maybe", "Not Going"];
    if (!validSatuses.includes(RSVPData.attendanceStatus)){
        res.send({error: "Attendance Status needs to be set to one of these statuses: Going, Maybe, Not Going"});
        return;
    }

    const RSVP = await prisma.RSVP.create({
        data: {
            userName: RSVPData.userName,
            email: RSVPData.email,
            attendanceStatus: RSVPData.attendanceStatus,
            event: {
                connect: {
                    id: eventId
                }
            }
        }
    });

    res.send({success: "Successfully sent RSVP"});
});

app.post('/assign-homework', async (req, res) => {

    const homeworkData = req.body;

    if(!homeworkData.title || !homeworkData.description || !homeworkData.dueDate || !homeworkData.assignedToStudent){
        res.send({error: "You've left empty fields"});
        return;
    }

    const assignment = await prisma.assignment.create({
        data: {
            title : homeworkData.title,
            description: homeworkData.description,
            dueDate : new Date(homeworkData.dueDate),
            assignedToStudent : homeworkData.assignedToStudent
        }
    });

    res.send({success: "Assigned Homework to studen: " + assignment.assignedToStudent,assignment});
});

app.post('/mark-completed/:assignmentId', async (req, res) => {
    const assignmentId = parseInt(req.params.assignmentId);
    const completionData = req.body;

    if(!completionData.studentName || !completionData.dateCompleted || !completionData.notes){
        res.send({error: "You've left empty fields"});
        return;
    }



    const completion = await prisma.completion.create({
        data: {
            studentName : completionData.studentName,
            dateCompleted : new Date(completionData.dateCompleted),
            notes : completionData.notes,
            assignment : {
                connect : {
                    id : assignmentId
                }
            }
        }
    });

    res.send({success: "Assignment Sent "});
});

app.get('/completed-assignments/:assignmentId', async (req, res) => {
   const  assignmentId = parseInt(req.params.assignmentId);

   const assignment = await prisma.assignment.findMany({
        where : {id : assignmentId},
        include: {compeltions: true}
   });

   res.send(assignment);
});

app.patch('/update-assignment/:assignmentId' , async (req, res) => {
    const assignmentId = parseInt(req.params.assignmentId);
    const homeworkData = req.body;

    if(!homeworkData.title || !homeworkData.description || !homeworkData.dueDate || !homeworkData.assignedToStudent){
        res.send({error: "You've left empty fields"});
        return;
    }

    const assignment = await prisma.assignment.update({
        where: {id : assignmentId},
        data: {
            title : homeworkData.title,
            description: homeworkData.description,
            dueDate : new Date(homeworkData.dueDate),
            assignedToStudent : homeworkData.assignedToStudent
        }
    });

    res.send({success: "Updated Assigment " + assignment.title});
});

app.delete('/delete-assigment/:assigmentId', async (req,res) => {
    const assigmentId = parseInt(req.params.assigmentId);

    const deletedAssigment = await prisma.assignment.delete({
        where : {id : assigmentId}
    });

    res.send({success: "Deleted Assignment " + deletedAssigment.title + " for student " + deletedAssigment.assignedToStudent});
});