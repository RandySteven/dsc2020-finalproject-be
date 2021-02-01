const { table } = require('../config/db');
const knex = require('../config/db');
const { route } = require('../router/province');
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const addProvince = async (req, res) => {
    let query;
    try {
        const provinces = await knex('provinces').whereNull('deleted_at');
        const {name, recovered, death, positive} = req.body;
        const [result] = await knex('provinces').insert({name, recovered, death, positive, created_at:new Date()}).then(async (data) => {
            query = await knex('provinces').where({'id':data[0]}).first()
            return res.status(200).send({status:true, message:'Storing data success', data:query})
        })
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
    // try {
        const {provinceId} = req.params;
        let provinces, id, links;
        let count, message, total;
        // console.log(provinceId)
            if(provinceId==undefined){
                provinces = await knex('provinces').select('id', 'name', 'recovered', 'death', 'positive', knex.raw(`CONCAT('/api/v1/provinces/', '', id ) as "url"`)).whereNull('deleted_at');
                count = await knex('provinces').whereNull('deleted_at').count();
                total = count[0]['count(*)']
                message = res.status(200).send({status:true, totalData:total, message:'Fetch success', data:{provinces}});
            }else{
                provinces = await knex('provinces').select('name', 'recovered', 'death', 'positive').where({'id':provinceId}).whereNull('deleted_at').then((data)=>{
                    if(data==""){
                        message = res.status(404).send({status:false, message:'Data not found'})
                    }else{
                        message = res.status(200).send({status:true, data:data});
                    }
                })
            }
        return message;
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const updateProvince = async (req, res) => {
    try {
        let message, after, before, result;
        const {id, name, recovered, death, positive} = req.body;
        const query = await knex('provinces').where('id', '=', id)
            .whereNull('deleted_at').then(async(data) => {
                if(data==""){
                    message = res.status(404).send({status:false, message:'Data not found'})
                }else{
                    await knex('provinces').where('id', '=', id).update({name, recovered, death, positive, updated_at:new Date()}).then(async(province)=>{
                        after = await knex('provinces').where('id', '=', id).first()
                        result = after
                    })
                    message = res.status(200).send({status:true, message:'Update data success', before:data, after:result });
                }
            })
        return message
    }catch(error){
        return res.status(400).send({status:false, message:'Update data failed'})
    }
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const deleteProvince = async (req, res) => {
    try {
        const id = req.body.id;
        const result = await knex('provinces').where('id', '=' ,id).whereNull('deleted_at').then(async(data)=>{
            if(data == ""){
                message = res.status(404).send({status:false, message:'Data not found'})
            }else{
                await knex('provinces').where('id', '=', id).update({deleted_at: new Date()});
                message = res.status(200).send({status:true, messsage:'Destroy data success'})
            }
        })
        return message;
    } catch (error) {
        return res.status(400).send({status:false, message:'Destroy data failed'});
    }
}

module.exports = {addProvince, getProvince, updateProvince, deleteProvince};