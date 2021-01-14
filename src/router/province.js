const express = require('express');
const {addProvince, getProvince, updateProvince, deleteProvince} = require('../controller/province');
const router = express.Router();

router
    .route('/')
        .get(getProvince)
        .post(addProvince)

router
    .route('/:provinceId')
    .get(getProvince)
        .put(updateProvince)
        .delete(deleteProvince)

module.exports = router;