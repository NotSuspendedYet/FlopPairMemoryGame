/**
 * CORS configuration options
 */
const corsOptions = {
  origin: ['https://floppairmemorygameclient.onrender.com', 'http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200 // some legacy browsers (IE11) choke on 204
};

module.exports = corsOptions; 