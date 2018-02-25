import Ajv from 'ajv'
import fs from 'fs'
import test from 'ava'
import yaml from 'js-yaml'

// options can be passed, e.g. {allErrors: true}
const ajv = new Ajv()
const schema = JSON.parse(fs.readFileSync('schema.json'))
const validate = ajv.compile(schema)

const loadDocument = (filename) => {
    const data = fs.readFileSync(filename, 'utf8')
    const doc = yaml.safeLoad(data)
    return doc
}

test('linux-amd64', t => {
    const doc = loadDocument('examples/linux-amd64.yaml')
    const isValid = validate(doc)
    if (!isValid) {
        t.log(validate.errors)
    }
    t.true(isValid)
})
