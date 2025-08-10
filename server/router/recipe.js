const express = require('express');
const Controller = require('../Controllers/recipe');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();


router.post("/api/cook", Controller.recipes)
router.post("/save", authMiddleware, Controller.saveRecipe)
router.post("/myRecipes", Controller.myRecipes)


module.exports = router