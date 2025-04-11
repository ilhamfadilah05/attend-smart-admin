module.exports = {
  apps: [
    {
      name: "benefis2-frontend",
      script: "pnpm start -p 3004",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
