const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const app = express();
const prisma = new PrismaClient();
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

app.get('/answer-quizzes', verifyToken, async (req, res) => {
    
     const userId = req.userId;

     const user = await prisma.user.findUnique({
         where: { id: userId },
     });

     const answerQuizzes = "yes";

     res.send({ answerQuizzes: answerQuizzes, email: user.email });

});

app.get('/get-quizzes', async (req, res) => {
    const quizzes = await prisma.quiz.findMany();
    res.send(quizzes);
});

app.get('/get-User/:id', async (req, res) => {
    const userId = parseInt(req.params.id);

    const user = await prisma.user.findUnique({
        where: {id: userId}
    });

    res.send(user);
});

app.get('/get-quiz/:id', async (req, res) => {
    const quizId = parseInt(req.params.id);
    
    const quiz = await prisma.quiz.findUnique({
        where: {id: quizId}
    });
    
    if (!quiz) {
        return res.status(400).json({error: "Quiz not found"});
    }

    res.send(quiz);
});

app.get('/has-user-answered-quiz/:quizId', async (req, res) => {
    const quizId = parseInt(req.params.quizId);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 

    let userId;
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        userId = decoded.userId;
    } catch (err) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const answer = await prisma.answer.findFirst({
        where: {
            quizId: quizId,
            userId: userId,
        },
    });


    return res.json({ hasAnswered: !!answer });
});

app.post('/register', async (req, res) => {

    const registerData = req.body;

    if (!registerData.email || !registerData.password || !registerData.fullName)
    {   
        
        res.send({ error: "You've left empty fields" });
        return;
    }
  
    try {
        const hashedPassword = bcrypt.hashSync(registerData.password, 10);
    
        const user = await prisma.user.create({
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

    res.send({ success: "Your account has been created with " + registerData.email });

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

app.post('/create-quiz',async(req,res) => {

    const quizData = req.body; 

    if (!quizData.quiz || !quizData.title) {
        return res.status(400).json({error: "Missing mandatory fields: " + 
            (!quizData.quiz ? "quiz" :  "") +
            (!quizData.title ? "title" :  "")
        });
    } 

    const quiz = await prisma.quiz.create({
        data: {
            quiz: quizData.quiz,
            title: quizData.title
        }
    });

    res.send({success: "Added quiz: '" + quiz.title + "' successfully"});
}); 

app.post('/post-answer', async(req,res) => {
    
    try {
         const answerData = req.body;

        if (!answerData.textField) {
            return res.status(400).json({error : "Missing mandatory field: " + 
            (!answerData.textField ? "textField" : "")
            });
        }
        const answer = await prisma.answer.create({
            data : {
                textField: answerData.textField,
                userId: parseInt(answerData.userId),
                quizId: parseInt(answerData.quizId)
            }
        });

        res.send({success: "Answer is posted: '" + answer.textField +"'." });
    } catch (err) {
        console.error("Error in /post-answer: ", err);
        res.status(500).json({error: "Internal server error"});
    }
   
});

app.post('/post-feedback', async(req,res) => {
    const feedbackData = req.body;

    if (!feedbackData.comment) {
        return res.status(400).json({error: "Missing mandatory field: " + 
            (!feedbackData.comment ? "comment" : "")
        });
    } 

    const feedback = await prisma.feedback.create({
        data : {
            comment: feedbackData.comment
        }
    })

    res.send({success: "Feedback posted: '" + feedback.comment +"'."});
});

app.listen(port, () => {
    console.log("Server is running on port ", port);
});

