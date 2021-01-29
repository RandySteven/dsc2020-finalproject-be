const express = require('express');
const {addProvince, getProvince, updateProvince, deleteProvince} = require('../controller/province');
const router = express.Router();

router
    .route('/')
        .get(getProvince)
        .post(addProvince)
        .put(updateProvince)
        .delete(deleteProvince)

router
    .route('/:provinceId')
    .get(getProvince)


module.exports = router;