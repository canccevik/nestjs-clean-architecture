export const config = () => ({
  port: process.env.PORT || 3001,
  globalPrefix: process.env.GLOBAL_PREFIX || 'api',
  appName: process.env.APP_NAME,
  appDescription: process.env.APP_DESCRIPTION,
  apiVersion: process.env.API_VERSION,
  databaseURI: process.env.DATABASE_URI
})
