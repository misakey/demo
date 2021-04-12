const dotenv = require("dotenv");

dotenv.config();

module.exports = [
  {
    name: "demo",
    script: "dist/index.js",
    instances: 2,
    exec_mode: 'cluster',
    env: {
      "NODE_ENV": "production",
      "MISAKEY_SDK_BASE_TARGET_DOMAIN": process.env.MISAKEY_SDK_BASE_TARGET_DOMAIN,
    }
  }
];
