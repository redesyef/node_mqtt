'use strict'
module.exports = function setupAgent (AgentModel){
    async function CreateOrUpdate(agent){
        const cond ={
            where:{
                uuid: agent.uuid
            }
        }
        const existingAgent = await AgentModel.findOne(cond)
        if (existingAgent){
            const updated = await AgentModel.updated(agent, cond)
            return updated ? AgentModel.findOne(cond) : existingAgent
        }
        const result = await AgentModel.create(agent)
        return result.toJSON()
    }
    function findById (id) {
        return AgentModel.findById(id)
    }
    function findByUuid (uuid) {
        return AgentModel.findOne({
            where: {
                uuid
            }
        })
    }
    function findAll() {
        return AgentModel.findAll()
    }
    function findConnected () {
        return AgentModel.findAll({
            where: {
                connected: true
            }
        })
    }
    function findByUsername (username) {
        return AgentModel.findAll({
            where:{
                username,
                connected: true
            }
        })
    }
    return{
        CreateOrUpdate,
        findById,
        findByUuid,
        findAll,
        findConnected,
        findByUsername
    }
}