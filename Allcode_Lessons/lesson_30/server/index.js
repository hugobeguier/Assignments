const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const fileUpload = require("express-fileupload");

const app = express();
const prisma = new PrismaClient();
const port = 4000;

app.use(express.json());
app.use(cors());
app.use("/images", express.static(__dirname + '/images'));
app.use(fileUpload());

app.post('/api/upload-image', async(req, res) => {

    if (req.files === null) {
        res.send({ error: "No file uploaded." });
        return;
    }

    const file = req.files.file;

    file.mv(`${__dirname}/images/${file.name}`, async (error) => {
        if (error) {
            res.send({ error });
            return;
        }

        await prisma.image.create({
            data: {
                fileName: file.name,
                filePath: '/images/' + file.name
            }
        });

        res.send({ success: "Image uploaded successfully." });
    });
});

app.get('/api/get-images', async (req,res) => {
    const images = await prisma.image.findMany();
    res.send({ images });
});

app.listen(port, () => {
    console.log("Server is running on port ", port);
});

