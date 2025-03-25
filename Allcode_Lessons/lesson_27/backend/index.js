const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
const port = 4000;

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});

//POST ENDPOINTS
app.post('/create-journal', async (req, res) => {

    const journalData = req.body;
    console.log("Retrieved JournalData: ", journalData);

    if(!journalData.title || !journalData.description){
        res.send({error: "Missing mandatory fields: " +
            (!journalData.title ? "title " : " ") +
            (!journalData.description ? "description" : "")+
            (!journalData.userId ? "userId" : "")});
        return;
    }

    try {
        //Ensure the user exists before creating journal
        const userExists = await prisma.users.findUnique({
            where: { id:journalData.userId }
        });

        if(!userExists) {
            return res.send({error: "User not found"});
        }
        
        const journal = await prisma.journal.create({
            data : {
                title: journalData.title,
                description: journalData.description,
                user : {
                    connect: { id: journalData.userId }
                }
            }
        });
        
        res.send({success: "Added " + journal.title + " successfully!"});
    } catch (error) {
        console.error(error);
        res.send({error: "An error occurred while creating the journal"});
    }
});

app.post('/create-post', async (req, res) => {

    const postData = req.body;

    if(!postData.content || !postData.journalId){
        res.send({error: "Missing mandatory fields: " +
            (!postData.content ? "content " : " ") +
            (!postData.journalId ? "journalId" : "")});
        return;
    }

    const post = await prisma.post.create({
        data : {
            content: postData.content,
            journalId: postData.journalId
        }
    });

    res.send({success: "Added " + post.content + " successfully!"});
});

app.post('/create-travelImage', async (req, res) => {

    const imageData = req.body;

    if(!imageData.imageUrl || !imageData.postId){
        res.send({error: "Missing mandatory fields: " +
            (!imageData.imageUrl ? "imageUrl " : " ") +
            (!imageData.postId ? "postId" : "")});
        return;
    }

    const travelImage = await prisma.travelImage.create({
        data : {
            imageUrl: imageData.imageUrl,
            postId: postData.postId
        }
    });

    res.send({success: "Added " + travelImage.imageUrl + " successfully!"});
});

app.post('/create-comment', async (req, res) => {

    const commentData = req.body;

    if(!commentData.comment || !commentData.postId || !commentData.userId){
        res.send({error: "Missing mandatory fields: " +
            (!commentData.comment ? "imageUrl" : " ") +
            (!commentData.postId ? "postId" : " ") + 
            (!commentData.userId ? "userId":"")});
        return;
    }

    const comment = await prisma.comment.create({
        data : {
            comment: commentData.comment,
            postId: commentData.postId,
            userId: commentData.userId
        }
    });

    res.send({success: "Added " + comment.comment + " successfully!"});
});

app.post('/create-user', async (req, res) => {

    const userData = req.body;
   
    if(!userData.email || !userData.firstname || !userData.lastname || !userData.password){
        return res.status(400).json({error: "Missing mandatory fields: " + 
            (!userData.email ? "email" : "") +
            (!userData.firstname ? "firstname" : "") + 
            (!userData.lastname ? "lastname" : "") + 
            (!userData.password ? "password" : "")});    
    }
   
    const existingUser = await prisma.users.findUnique({
        where: {
            email: userData.email
        }
    });
   
    if (existingUser) {
        return res.status(400).json({ success: false, error: "Email already in use" });
    }
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_]).+$/;

    if(!passwordRegex.test(userData.password)) {
        return res.status(400).json({error: "Password must contain at least one uppercase letter and a special character."});
    }
   
    const user = await prisma.users.create({
        data: {
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            password: userData.password
        }
    });
    
    res.send({success: "Added user with email " + user.email +" successfully"});
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Find user in database
    const user = await prisma.users.findUnique({
        where: { email }
    });

    if (!user || user.password !== password) {
        return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    res.json({ success: true, user: { id: user.id, email: user.email, firstname: user.firstname, lastname: user.lastname } });
});

//GET ENDPOINTS
app.get('/get-journal/:journalId', async (req,res) => {
    const journalId = parseInt(req.params.journalId);
    
    const journal = await prisma.journal.findUnique({
        where : { id: journalId }
    });
    res.send(journal);
});

app.get('/get-journals-from-user/:userId', async (req,res) => {
    const userId = parseInt(req.params.userId);
    const journals = await prisma.journal.findMany({
        where : {userId : userId}
    });

    res.send(journals);
});

app.get('/get-all-journals', async (req,res) => {
    const journals = await prisma.journal.findMany();
    res.send(journals);
});

app.get('/get-post/:postId', async (req,res) => {
    const postId = parseInt(req.params.postId);
    
    const post = await prisma.post.findUnique({
        where : { id: postId }
    });
    res.send(post);
});

app.get('/get-travelImage/:imageId', async (req,res) => {
    const imageId = parseInt(req.params.imageId);
    
    const image = await prisma.image.findUnique({
        where : { id: imageId }
    });
    res.send(image);
});

app.get('/get-comment/:commentId', async (req,res) => {
    const commentId = parseInt(req.params.commentId);
    
    const comment = await prisma.comment.findUnique({
        where : { id: commentId }
    });
    res.send(comment);
});

app.get('/get-user/:userId', async (req,res) => {
    const userId = parseInt(req.params.userId);
    
    const user = await prisma.users.findUnique({
        where : { id: userId }
    });
    res.send(user);
});

//UPDATE ENDPOINTS

app.put('/update-journal/:journalId', async (req, res) => {
    const journalId = parseInt(req.params.journalId, 10); 
    const { title, description } = req.body;
    
    try {
        
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }

        const journal = await prisma.journal.update({
            where: { id: journalId },
            data: { title, description }, 
        });

        res.status(200).json({ message: 'Journal updated successfully', journal });
    } catch (error) {
       res.status(500).json({ message: 'Failed to update journal', error: error.message });
    }
});

//DELETE ENDPOINTS

app.delete('/delete-journal/:journalId', async (req,res) => {
    const journalId = await parseInt(req.params.journalId,10);

    try {
        const journal = await prisma.journal.delete({
            where: { id: journalId },
            data: { title, description }
        });
        res.status(200).json({ message: 'Journal deleted successfully', journal });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete journal', error: error.message });
    }
});