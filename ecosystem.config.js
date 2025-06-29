module.exports = {
  apps: [
    {
      name: "attend-smart-frontend",
      script: "pnpm start",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
