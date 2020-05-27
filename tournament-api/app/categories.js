const express = require('express');

const Category = require('../models/Category');

const router = express.Router();

router.post('/', async (req,res) => {
   const categoryData = req.body;

   const category = new Category(categoryData);
    try {
        await category.save();
        return res.send(category)
    } catch (error) {
        return res.status(400).send(error)
    }
});

router.get('/', async (req, res) => {
   const categories = await Category.find();
   res.send(categories)
});


module.exports = router;