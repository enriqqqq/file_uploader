const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');
const folderController = require('../controller/folderController');
const { isAuth } = require('../config/authMiddleware');

// POST request for creating a file
router.post('/files/create', isAuth, fileController.create_post);

// POST request for creating a folder
router.post('/folders/create', isAuth, folderController.create_post);

// GET request for getting all folders in a folder
router.get('/folders/:folderId?', isAuth, folderController.get_all_folders);

// GET request for getting all files in a folder
router.get('/folders/:folderId/files', isAuth, fileController.get_all_files);

// DELETE request for deleting a folder
router.delete('/folders/:folderId/delete', isAuth, folderController.delete_folder);

// DELETE request for deleting a file
router.delete('/files/:fileId/delete', isAuth, fileController.delete_file);

// DOWNLOAD request for downloading a file
router.get('/files/:fileId/download', isAuth, fileController.download_file);

// UPDATE request for updating a folder
router.put('/folders/:folderId/update', isAuth, folderController.update_folder);

module.exports = router;

