const cloudinary = require('cloudinary').v2;

// Set up your Cloudinary configuration
cloudinary.config({
    cloud_name: 'dr3buczbc',
    api_key: '831329449195399',
    api_secret: 'btaBipINGy-1682Mzut_cMwr9qk'
});
module.exports = cloudinary;