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

    if(!journalData.title || !journalData.description){
        res.send({error: "Missing mandatory fields: " +
            (!journalData.title ? "title " : " ") +
            (!journalData.description ? "description" : "")});
        return;
    }

    const journal = await prisma.journal.create({
        data : {
            title: journalData.title,
            description: journalData.description
        }
    });

    res.send({success: "Added " + journal.title + " successfully!"});
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

//GET ENDPOINTS
app.get('get-journal/:journalId', async (req,res) => {
    const journalId = parseInt(req.params.journalId);
    
    const journal = await prisma.journal.findUnique({
        where : { id: journalId }
    });
    res.send(journal);
});

app.get('get-post/:postId', async (req,res) => {
    const postId = parseInt(req.params.postId);
    
    const post = await prisma.post.findUnique({
        where : { id: postId }
    });
    res.send(post);
});

app.get('get-travelImage/:imageId', async (req,res) => {
    const imageId = parseInt(req.params.imageId);
    
    const image = await prisma.image.findUnique({
        where : { id: imageId }
    });
    res.send(image);
});

app.get('get-comment/:commentId', async (req,res) => {
    const commentId = parseInt(req.params.commentId);
    
    const comment = await prisma.comment.findUnique({
        where : { id: commentId }
    });
    res.send(comment);
});

app.get('get-user/:userId', async (req,res) => {
    const userId = parseInt(req.params.userId);
    
    const user = await prisma.user.findUnique({
        where : { id: userId }
    });
    res.send(user);
});

//UPDATE ENDPOINTS



//DELETE ENDPOINTS