const knex = require('../config/db');

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addProvince = async (req, res) => {
    try {
        const {name, recovered, death, positive} = req.body;
        const [result] = await knex('provinces').insert({name, recovered, death, positive, created_at:new Date()});
        res.send({status:true, message:'Create data success', data:result});
    } catch (error) {
        res.send({message:'Create error', error:error});
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const getProvince = async (req, res) => {
    try {
        const {provinceId} = req.params;
        let query="", provinces;
        // console.log(provinceId)
        if(provinceId==undefined){
            provinces = await knex('provinces').select('*').whereNull('deleted_at')
        }else{
            provinces = await knex('provinces').select('*').where({'id':provinceId}).whereNull('deleted_at')
        }
        return res.send({message:'Fetch success', data:provinces});
    } catch (error) {
        return res.send({message:'Get error', error:error});
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateProvince = async (req, res) => {
    try {
        const {provinceId} = req.params;
        const before = await knex('provinces').select('name','recovered','death','positive').where({'id':provinceId}).whereNull('deleted_at');
        const {name, recovered, death, positive} = req.body;
        const result = await knex('provinces').where('id','=',provinceId).update({name, recovered, death, positive, updated_at:new Date()});
        const after = await knex('provinces').select('name','recovered','death','positive').where({'id':provinceId}).whereNull('deleted_at');
        res.status(200).send({status:true, message:'Updating data success', before:before, after:after});
    } catch (error) {
        res.status(400).send({status:false, message:'Updating data failed', error:error.message});
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProvince = async (req, res) => {
    try {
        const {provinceId} = req.params;
        const result = await knex('provinces').where('id','=',provinceId).update({deleted_at:new Date()});
        res.status(200).send({status:true, message:'Destroy data success'});
    } catch (error) {
        res.status(400).send({status:false, message:'Destroy data failed', error:error.message});
    }
}

module.exports = {addProvince, getProvince, updateProvince, deleteProvince};