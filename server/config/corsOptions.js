/**
 * CORS configuration options
 */
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11) choke on 204
};

module.exports = corsOptions; 