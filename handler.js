const Fs = require('fs');
const Boom = require('@hapi/boom');

module.exports = function(request, h) {
  return new Promise((resolve, reject) => {
	try {
	  const fileObj = request.payload.data;
	  const fileStream = Fs.createWriteStream(fileObj.hapi.filename);
	  fileStream.on('finish', function () {
		const info = { filename: fileObj.hapi.filename };

		info.size = Fs.statSync(fileObj.hapi.filename).size;

		console.log(`Saved file: "${fileObj.hapi.filename}"`);
		resolve(h.response(info));
	  });

	  fileObj.pipe(fileStream);
	} catch (err) {
	  console.log(err);
	  resolve(h.response(Boom.badRequest(err.message)).code(500));
	}
  });
};
