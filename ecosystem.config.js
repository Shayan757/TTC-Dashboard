module.exports = {
  apps: [
    {
      name: 'dash-thetradecore',        // Name of the application
      script: 'node_modules/next/dist/bin/next', // Path to the Next.js executable
      args: 'start',             // Command to start Next.js in production mode
      env: {
        NODE_ENV: 'production',  // Set the environment to production
        PORT: 3001               // Set the port (you can change it)
      }
    }
  ]
};

