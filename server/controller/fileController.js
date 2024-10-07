const asyncHandler = require('express-async-handler');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

exports.create_post = [
    upload.single('file_sent'), 
    asyncHandler(async (req, res) => {
        if(!req.file){
            res.json({error: 'No file uploaded'}).status(400);
        }

        const folderId = req.body.folder_id === "null" ? null : req.body.folder_id;
        console.log(folderId);
        if(folderId) {
            const folder = await prisma.folder.findUnique({
                where: {
                    id: folderId,
                }
            });

            if(!folder){
                res.json({error: 'Folder not found'}).status(404);
                return;
            }
        }

        const file = await prisma.file.create({
            data: {
                name: req.file.originalname,
                size: req.file.size,
                userId: req.user.googleId,
                folderId: folderId,
                mimeType: req.file.mimetype,
                path: req.file.filename,
            }
        });

        res.json(file).status(200);
    })
];

exports.get_all_files = asyncHandler(async (req, res) => {
    const folderId = req.params.folderId === "root" ? null : req.params.folderId;

    if(folderId) {
        const folder = await prisma.folder.findUnique({
            where: {
                id: folderId,
            }
        });

        if(!folder){
            res.json({error: 'Folder not found'}).status(404);
            return;
        }
    }

    const files = await prisma.file.findMany({
        where: {
            userId: req.user.googleId,
            folderId: folderId,
        }
    });

    res.json(files).status(200);
});

exports.download_file = asyncHandler(async (req, res) => {
    const fileId = req.params.fileId;

    const file = await prisma.file.findUnique({
        where: {
            id: fileId,
        }
    });

    if(!file){
        res.json({error: 'File not found'}).status(404);
        return;
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.path);

    res.download(filePath, file.name, (err) => {
        if(err){
            res.json({error: 'An error occurred'}).status(500);
            return;
        }
    });
});

exports.delete_file = asyncHandler(async (req, res) => {
    const fileId = req.params.fileId;

    const file = await prisma.file.findUnique({
        where: {
            id: fileId,
        }
    });

    if(!file){
        res.json({error: 'File not found'}).status(404);
        return;
    }

    const filePath = path.join(__dirname, '..', 'uploads', file.path);
    console.log(filePath);
    fs.unlink(filePath, async (err) => {
        if(err){
            res.json({error: 'An error occurred'}).status(500);
            return;
        }

        await prisma.file.delete({
            where: {
                id: fileId,
            }
        });
        console.log('File deleted');
        res.json({message: 'File deleted'}).status(200);
    });
});