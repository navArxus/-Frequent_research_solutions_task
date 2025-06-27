const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("./ProfileSchema")
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: ["https://frequent-research-solutions-task.vercel.app/", "http://localhost:3000"], // your React frontend
    methods: ["GET", "POST"],
    credentials: true, // if using cookies or authentication
}));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = Date.now() + "-" + Math.round(Math.random() * 1e9) + ext;
        cb(null, name);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
    fileFilter: (req, file, cb) => {
        const allowed = ["image/jpeg", "image/png", "image/jpg"];
        if (allowed.includes(file.mimetype)) cb(null, true);
        else cb(new Error("Only JPEG, PNG allowed"));
    },
});


// MongoDB setup 
mongoose.connect(process.env.MONGO_URI).then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("❌ Mongo error", err));

// Upload route
app.post("/api/upload", upload.single("image"), (req, res) => {
    console.log(req.file)
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded." });
    }
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});


// Check if username already exists
app.get('/api/check-username', async (req, res) => {
    const { username } = req.query;

    if (!username || username.trim() === "") {
        return res.status(400).json({ error: "Username is required" });
    }

    try {
        const user = await User.findOne({ username: username.trim() });
        if (user) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (err) {
        console.error("❌ Username check error", err);
        res.status(500).json({ error: "Server error" });
    }
});

// Route to save form data
app.post('/api/save-profile', async (req, res) => {
    try {
        console.log(req.body)
        const {
            username,
            password,
            profession,
            companyName,
            address,
            country,
            state,
            city,
            subscription,
            newsletter,
            image
        } = req.body;

        // ✅ Basic validation
        if (!username || !password || !address || !country || !state || !city) {
            return res.status(400).json({ error: "Required fields missing" });
        }

        const newUser = new User({
            username,
            password,
            profession,
            companyName,
            address,
            country,
            state,
            city,
            subscription,
            newsletter,
            image: image?.image || "" // safely extract image URL
        });

        const saved = await newUser.save();
        res.status(201).json({ message: "Profile saved", user: saved });
    } catch (err) {
        console.error("❌ Save error", err);
        res.status(500).json({ error: "Server error" });
    }
});



const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
