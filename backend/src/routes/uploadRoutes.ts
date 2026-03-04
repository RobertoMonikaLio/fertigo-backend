import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// File Filter
const fileFilter = (req: any, file: any, cb: any) => {
    const allowedTypes = /jpeg|jpg|png|pdf|doc|docx/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Nur Bilder (JPG, PNG) und Dokumente (PDF, DOC) sind erlaubt!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: fileFilter
});

// @desc    Upload single file
// @route   POST /api/upload
// @access  Public (or protected if needed)
router.post('/', upload.single('file'), (req: any, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Keine Datei hochgeladen' });
    }

    const fileUrl = `${process.env.BACKEND_URL || 'http://localhost:5000'}/uploads/${req.file.filename}`;
    res.json({
        url: fileUrl,
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size
    });
});

// @desc    Upload multiple files
// @route   POST /api/upload/multiple
router.post('/multiple', upload.array('files', 10), (req: any, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'Keine Dateien hochgeladen' });
    }

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    const fileUrls = (req.files as Express.Multer.File[]).map(file => ({
        url: `${backendUrl}/uploads/${file.filename}`,
        filename: file.filename,
        originalName: file.originalname
    }));

    res.json(fileUrls);
});

export default router;
