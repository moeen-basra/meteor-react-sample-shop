//this is our import 'manifest' of what files we'll load on the client on startup. Use this file to control which files are loaded and the order in which they load, while leaving the import file in your client directory that points to this file untouched
//note that we need to include './' when pointing to a file in the same directory
module.exports = require('./routes.jsx')