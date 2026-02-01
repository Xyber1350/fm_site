// Passenger entry point for Next.js standalone
process.env.NODE_ENV = 'production';
process.env.HOSTNAME = '0.0.0.0';

require('./server.js');
