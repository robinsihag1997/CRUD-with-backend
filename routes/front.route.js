const express = require('express');
const { home, create, store, edit, update, destroy } = require('../controllers/front.controller');
const { upload } = require('../middleware/fileUploadMiddleware');

const router = express.Router();

// index
router.get('/',  home)

// create
router.get('/create',  create)

// store
router.post('/store', upload.single("image"), store)

// edit
router.get('/edit/:id',  edit)

// update
router.post('/update/:id', upload.single("image"),  update)

// delete
router.post('/destroy/:id',  destroy)

module.exports = router;