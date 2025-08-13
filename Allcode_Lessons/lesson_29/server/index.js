const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

const app = express();
const prisma = new PrismaClient();
const schema = new passwordValidator();
const port = 4000;

app.use(express.json());
app.use(cors());

const verifyToken = (req, res, next) => {

    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {

        if (error) {
            res.send({ error: "You session has expired or does not exist." });
            return;
        } else {
            req.userId = decoded.userId;
            next();
        }

    });

};

app.get('/getCurrentUser', verifyToken, async (req, res) => {
    const userId = parseInt(req.params.id);
    
    const user = await prisma.user.findUnique({
        where: {id: userId}
    });

    if (!user) {
        res.send({ error: "User not found." });
        return;
    }

    res.send(user);
});

app.get('/getNotes', verifyToken, async (req, res) => {
    const userId = parseInt(req.params.id);

    const notes = await prisma.notes.findMany({
        where : {userId: userId}
    });

    res.send(`Successfully found notes for user with id ${userid}`);
});

app.post('/register', async (req, res) => {

    const registerData = req.body;

    if (!registerData.email || !registerData.password || !registerData.fullName)
    {   
        
        res.send({ error: "You've left empty fields" });
        return;
    }

    const emailValid = emailValidator.validate(registerData.email);
    if (!emailValid) {
        res.send({ error: "The email you submitted is not valid"});
        return;
    }

   schema
        .is().min(8)                                    // Minimum length 8
        .is().max(100)                                  // Maximum length 100
        .has().uppercase()                              // Must have uppercase letters
        .has().lowercase()                              // Must have lowercase letters
        .has().digits(2)                                // Must have at least 2 digits
        .has().not().spaces()                           // Should not have spaces
        .is().not().oneOf(['Passw0rd', 'Password123','Test123#']);

    const passwordValid = schema.validate(registerData.password);

    if (!passwordValid) {
        res.send({ error: "Your password is not safe, please include 8 characters with upper and lower case letters, and numbers." });
        return;
    }

    if (registerData.fullName.length < 4) {
        res.send({ error: "Your full name must be at least 4 characters"});
        return;
    }

    const emailExists = await prisma.user.findUnique({
        where : {email: registerData.email}
    });

    if (emailExists) {
        res.send({ error: "Email already exists."});
        return;
    }

    let user;
    try {
        const hashedPassword = bcrypt.hashSync(registerData.password, 10);
    
        user = await prisma.user.create({
            data: {
                email: registerData.email,
                password: hashedPassword,
                fullName: registerData.fullName
            }
        });
    } catch (error) {
        console.log(error);
        res.send({ error: "Something went wrong. Please try again later." });
        return;
    }

    res.send({ success: "Your account has been created with " + user.email });

});

app.post('/login', async (req, res) => {

    const loginData = req.body;

    if (!loginData.email || !loginData.password) {
        res.send({ error: "You've left empty fields." });
        return;
    }

    const user = await prisma.user.findUnique({
        where: { email: loginData.email }
    });

    if (!user) {
        res.send({ error: "An account with that email does not exist." });
        return;
    }

    const passwordValid = await bcrypt.compare(loginData.password, user.password);

    if (!passwordValid) {
        res.send({ error: "Password for that email is invalid." });
        return;
    }

    res.send({
        token: jwt.sign({ userId: user.id }, process.env.SECRET_KEY, { expiresIn: "1h" }),
        user
    });

});

app.post('/create-note', verifyToken, async (req, res) => {
    const userId = req.userId;
    const noteData = req.body;

    if (!noteData.textArea) {
        res.send({ error: "You must submit some kind of text."});
        return;
    }

    if (noteData.textArea.length < 10) {
        res.send({ error: "Your note must be at least 10 characters."});
        return;
    }

    const user = await prisma.user.findUnique({
        where : { id: userId }
    });

    if (!user) {
        res.send({ error: "User not found."});
        return;
    }

    const note = await prisma.notes.create({
        data: {
            textArea: noteData.textArea,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    });

    res.send({ success: "Your note has been added successfully"});
});


app.listen(port, () => {
    console.log("Server is running on port ", port);
});

