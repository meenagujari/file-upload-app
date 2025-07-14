module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'supersecretjwtkey',
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/myapp',
  port: process.env.PORT || 5000,
};