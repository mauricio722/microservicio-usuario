module.exports = {
  title: 'UpdateSchema',
  type: 'object',
  properties: {
    name: {
      typeof: 'string',
    },
    lastName: {
      typeof: 'string',
    },
    numDocument: {
      typeof: 'string',
    },
    cellPhone: {
      typeof: 'string',
    },
    address: {
      typeof: 'string',
    },
  },
  required: ['name', 'lastName', 'numDocument', 'cellPhone', 'address'],
};
