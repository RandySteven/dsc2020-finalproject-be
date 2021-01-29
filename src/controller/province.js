const { table } = require('../config/db');
const knex = require('../config/db');
const { route } = require('../router/province');
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addProvince = async (req, res) => {
    try {
        const {name, recovered, death, positive} = req.body;
        const [result] = await knex('provinces').insert({name, recovered, death, positive, created_at:new Date()});
        return res.send({status:true, message:'Storing data success', data:result});
    } catch (error) {
        return res.send({status:false, message:'Storing data failed'});
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
        let provinces, id, links;
        let count, message, total;
        // console.log(provinceId)
        if(provinceId==undefined){
            
            provinces = await knex('provinces').select('id', 'name', 'recovered', 'death', 'positive', knex.raw(`CONCAT('/api/v1/provinces/', '', id ) as "url"`)).whereNull('deleted_at');
            count = await knex('provinces').whereNull('deleted_at').count();
            total = count[0]['count(*)']
           
            // id = provinces[provinces.count()]['id']
            // links = `/api/v1/province/${provinces[0]['id']}`
            message = res.status(200).send({status:true, totalData:total, message:'Fetch success', data:{provinces}});
        }else{
            provinces = await knex('provinces').select('name', 'recovered', 'death', 'positive').where({'id':provinceId}).whereNull('deleted_at');
            message = res.status(200).send({status:true, stored:provinces});
        }
        return message;
    } catch (error) {
        return res.status(404).send({message:'Fetching data failed', status:false, error:error.message});
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateProvince = async (req, res) => {
    try {
        let message;
        const {id, name, recovered, death, positive} = req.body;
        const before = await knex('provinces').select('name','recovered','death','positive').where('id', '=', provinceId).whereNull('deleted_at');
        const result = await knex('provinces')
                                .where({'id':id})
                                .update({name, recovered, death, positive, updated_at:new Date()});
        const after = await knex('provinces').select('name','recovered','death','positive').where({'id':provinceId}).whereNull('deleted_at');
        message = res.status(200).send({status:true, message:'Updating data success', before:before, after:after});
        return message
    } catch (error) {
       return res.status(400).send({status:false, message:'Updating data failed', error:error.message});
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProvince = async (req, res) => {
    // let {provinceId} = req.body;
    const id = req.body;
    console.log(id);
    try {
        const result = await knex('provinces').where({'id':id}).update({deleted_at:new Date()});
        return res.status(200).send({status:true, message:'Destroy data success'});
    } catch (error) {
        return res.status(400).send({status:false, message:'Destroy data failed'});
    }
}

module.exports = {addProvince, getProvince, updateProvince, deleteProvince};