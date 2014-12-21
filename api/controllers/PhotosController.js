/**
 * PhotosController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	details: function(req, res) {
		Photos.findOne(req.params.all(), function(err, photo){
			if (err) return res.serverError(err);
			res.json(photo.dimensions);
		});
	}
};

