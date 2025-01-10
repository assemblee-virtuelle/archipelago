require('dotenv-flow').config();

const getDefaultRights = (creatorUri) => {
  return {
    anon : {
      read: !(process.env.SEMAPPS_RESOURCESPERMISSIONS_ANON_READ === 'false'),
    },
    anyUser: {
      read: !(process.env.SEMAPPS_RESOURCESPERMISSIONS_ANYUSER_READ === 'false'),
      write: process.env.SEMAPPS_RESOURCESPERMISSIONS_ANYUSER_WRITE === 'true',
    },
    user: {
      uri: creatorUri,
      read: true,
      write: true,
      control : true
    }
  }
};

module.exports = {
  getDefaultRights,
};
