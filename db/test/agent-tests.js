'use strict'

const test = require('ava')
const proxyrequire = require('proxyquire')
const sinon = require('sinon')

let db = null
let AgentStub = null
let sandbox = null
let config = {
    loggin: function() {}
}
let MetricStub ={
    belongsTo: sinon.spy()
}

test.beforeEach(async () => {
    sandbox = sinon.createSandbox()
    AgentStub = {
        hasMany: sandbox.spy()
    }
    const setupDatabase = proxyrequire('../',{
        './models/agent' : () => AgentStub,
        './models/metric' : () => MetricStub
    })
    db = await setupDatabase(config)
})
test.afterEach(() => {
    sandbox && sandbox.restore()
  })
test('Agent', t => {
   t.truthy(db.Agent, 'Agent service should exist')
})
test.serial('Setup', t => {
    t.true(AgentStub.hasMany.called, 'AgentModel.hsMany was executed')
    t.true(AgentStub.hasMany.calledWith(MetricStub), 'Argument should be the MetricModel')
    t.true(MetricStub.belongsTo.called, 'Metric.Model.belongTo was executed')
    t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Argument should be the AgentModel')
})