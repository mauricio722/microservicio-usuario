
module.exports = {
  title: 'AuthSchema',
  type: 'object',
  properties: {

    email: {
      typeof: 'string',
    },
    password: {
      typeof: 'string',
    },
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
  required: ['email', 'password', 'name', 'lastName', 'numDocument', 'cellPhone', 'address'],
};
