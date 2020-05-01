module.exports = {
  title: 'passSchema',
  type: 'object',
  propertaries: {
    email: {
      typeof: 'string',
    },

    password: {
      typeof: 'string',
    },
    newPassword: {
      typeof: 'string',
    },
  },
  required: ['email', 'password', 'newPassword'],
};
