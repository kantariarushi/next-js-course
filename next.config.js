const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'rushiadmin',
        mongodb_password: 'kzv1vM60Q79MWtIe',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-dev',
      },
      images: {
        domains: ['i.pinimg.com'],
      },
    };
  }
  

  return {
    env: {
      mongodb_username: 'rushiadmin',
      mongodb_password: 'kzv1vM60Q79MWtIe',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site',
    },
    images: {
      domains: ['i.pinimg.com'],
    },
  };
};
