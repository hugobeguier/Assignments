const express = require('express');
const { PrismaClient } = require('@prisma/client');

const app = express();

app.use(express.json());
const prisma = new PrismaClient();

app.get('/test', (req, res) => {
    res.send({message: "Hello World!"});
});

app.get('/get-users-info', async (req, res) => {
    const usersInfo = await prisma.User.findMany();
    res.send(usersInfo);
});

app.post('/create-user', async (req, res) => {
    const userData = req.body;
    console.log("CREATE USER");
    const user = await prisma.user.create({
        data: {
            userName: userData.userName,
            password: userData.password,
            email: userData.email,
            mobileNumber: userData.mobileNumber,
            country: userData.country
        }
    });
    res.send({ user: user });
});

app.get('/get-entries', async (req,res) => {
    const entries = await prisma.entry.findMany();
    res.send(entries);
});

app.post('/create-entry', async (req, res) => {
    const entryData = req.body;

    const entry = await prisma.entry.create({
        data : {
            title: entryData.title,
            content: entryData.content,
            createdDate: entryData.createdDate
        }
    });

    res.send({entry:entry});
});

app.get('/fetch-entry-by-id/:id', async (req, res) => {

    const id = parseInt(req.params.id);
   
    const entry = await prisma.entry.findUnique({
        where : {
            id: id
        }
    })

    res.send(entry);
});

app.listen(4000, () => {
    console.log("Server running.");
});