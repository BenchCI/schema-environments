const { join } = require('path')
const { readFileSync } = require('fs')
const { safeLoad } = require('js-yaml')
const { test } = require('tap')
const Ajv = require('ajv')
const json = require('./fixtures/environments.json')
const schema = require('../spec/latest/schema.json')

const yaml = readFileSync(join(__dirname, 'fixtures', 'environments.yml'), 'utf8')

const ajv = new Ajv()

test('schema compiles successfully', assert => {
  assert.plan(2)

  assert.doesNotThrow(() => ajv.addSchema(schema))
  assert.type(ajv.compile(schema), 'function')
})

test('valid json file', assert => {
  assert.plan(1)

  assert.ok(ajv.validate(schema, json))
})

test('valid yaml file', assert => {
  assert.plan(1)

  assert.ok(ajv.validate(schema, safeLoad(yaml)))
})
