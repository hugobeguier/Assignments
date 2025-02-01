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

    const user = await prisma.User.create({
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


app.listen(4000, () => {
    console.log("Server running.");
});