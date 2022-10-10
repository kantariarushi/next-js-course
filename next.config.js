const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        mongodb_username: 'rushiadmin',
        mongodb_password: 'RYNcFwzwuhZWEdVz',
        mongodb_clustername: 'cluster0',
        mongodb_database: 'my-site-dev',
      },
      images: {
        domains: ['m.media-amazon.com', 'encrypted-tbn0.gstatic.com'],
      },
    };
  }
  

  return {
    env: {
      mongodb_username: 'rushiadmin',
      mongodb_password: 'RYNcFwzwuhZWEdVz',
      mongodb_clustername: 'cluster0',
      mongodb_database: 'my-site',
    },
    images: {
      domains: ['m.media-amazon.com', 'encrypted-tbn0.gstatic.com'],
    },
  };
};
