const router=require('express').Router();
const {backup, restore}=require('../controllers/bdd.controllers')

router.get('/backup', backup);

router.get('/restore', restore);

module.exports=router;