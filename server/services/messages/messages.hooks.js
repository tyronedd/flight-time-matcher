const { authenticate } = require('feathers-authentication').hooks;
const { populate } = require('feathers-hooks-common');

const processMessage = require('../../hooks/process-message');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [processMessage()],
    update: [processMessage()],
    patch: [processMessage()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [
      populate({
        schema: {
          include: [{
            service: 'users',
            nameAs: 'sentBy',
            parentField: 'userId',
            childField: '_id'
          }]
        }
      })
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};