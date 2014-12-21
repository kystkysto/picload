/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	upload: function  (req, res) {
		if(req.method === 'GET')
			return res.json({'status':'GET not allowed'});						
			//	Call to /upload via GET is error

		req.file('file').upload({ dirname: '../../assets/images'}, function onUploadComplete (err, files) {

			if (err) return res.serverError(err);

			var element = files[0];

			var photo = {};

			photo.size = element.size;
			photo.name = element.filename;
			photo.file = sails.path.basename(element.fd);

			var dimensions = sails.sizeof(element.fd);
			photo.dimensions = dimensions;

			Photos.create(photo, function(err, ph) {
				if (err) return res.serverError(err);
				res.json(ph);
			});
		});
	},
};

