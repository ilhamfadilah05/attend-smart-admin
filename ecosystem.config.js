module.exports = {
  apps: [
    {
      name: "attend-smart-frontend",
      script: "pnpm start -p 3004",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
