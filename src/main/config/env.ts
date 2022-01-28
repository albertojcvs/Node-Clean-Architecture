export default {
  port: process.env.PORT || 3333,
  mongoUrl: process.env.MONGO_URL || 'mongodb://db:27017/clean-node-api',
  jwtSecret: process.env.JWT_SECRET || '=t56As-0'
}
