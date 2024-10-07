const { body } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// POST request for creating a folder
exports.create_post = [
    body('folder_name').isString().notEmpty(),
    body('parent_folder_id').optional(),
    asyncHandler(async (req, res) => {
        const { folder_name, parent_folder_id } = req.body;
        const folderId = parent_folder_id || null;

        // find parent folder
        if (folderId) {
            const parentFolder = await prisma.folder.findUnique({
                where: {
                    id: folderId
                }
            });

            if (!parentFolder) {
                res.json({ error: 'Parent folder not found' }).status(404);
                return;
            }
        }

        const folder = await prisma.folder.create({
            data: {
                name: folder_name,
                userId: req.user.googleId,
                parentFolderId: folderId,
            }
        });

        res.json(folder).status(200);
    })
]

// GET request for getting all folders in a folder
exports.get_all_folders = asyncHandler(async (req, res) => {
    const folderId = req.params.folderId || null;
    let path = [];

    // find parent folder
    if (folderId) {
        const folder = await prisma.folder.findUnique({
            where: {
                id: folderId
            }
        });

        if (!folder) {
            res.json({ error: 'Folder not found' }).status(404);
            return;
        }

        // get path of folder
        let currentFolder = folder;
        while (currentFolder) {
            path.push({ id: currentFolder.id, name: currentFolder.name });

            if(!currentFolder.parentFolderId) break;

            currentFolder = await prisma.folder.findUnique({
                where: {
                    id: currentFolder.parentFolderId
                }
            });
        }
    }

    const folders = await prisma.folder.findMany({
        where: {
            userId: req.user.googleId,
            parentFolderId: folderId,
        }
    });

    path.reverse();

    res.json({folders, path}).status(200);
});


// DELETE request for deleting a folder
exports.delete_folder = asyncHandler(async (req, res) => {
    const folderId = req.params.folderId;

    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId
        }
    });

    if (!folder) {
        res.json({ error: 'Folder not found' }).status(404);
        return;
    }

    await prisma.folder.delete({
        where: {
            id: folderId
        }
    });

    res.json({ message: 'Folder deleted' }).status(200);
});

exports.update_folder = asyncHandler(async (req, res) => {
    const folderId = req.params.folderId;
    const { folder_name } = req.body;

    const folder = await prisma.folder.findUnique({
        where: {
            id: folderId
        }
    });

    if (!folder) {
        res.json({ error: 'Folder not found' }).status(404);
        return;
    }

    await prisma.folder.update({
        where: {
            id: folderId
        },
        data: {
            name: folder_name
        }
    });

    res.json({ message: 'Folder updated' }).status(200);
});

process.on('SIGTERM', async () => {
    await prisma.$disconnect();
    process.exit(0);
});