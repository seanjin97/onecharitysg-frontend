const nextEnv = require('next-env');
const dotenvLoad = require('dotenv-load');
 
dotenvLoad();
 
const withNextEnv = nextEnv();

module.exports = withNextEnv({
    distDir: 'build',
    async redirects() {
      return [
        {
          source: '/',
          destination: '/front',
          permanent: true,
        },
      ]
    },
    env: {
      CHANNEL_ID: process.env.CHANNEL_ID,
      TOKEN: process.env.TOKEN,
      PRIVATE_KEY: process.env.PRIVATE_KEY,
      MONGO_LOCAL_URI: process.env.MONGO_LOCAL_URI,
    },
  });