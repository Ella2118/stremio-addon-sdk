#!/usr/bin/env node

const { addonBuilder, serveHTTP } = require('../')

const addon = new addonBuilder({
	id: 'org.myexampleaddon',
	version: '1.0.0',

	name: 'simple example',

	// Properties that determine when Stremio picks this add-on
	// this means your add-on will be used for streams of the type movie
	catalogs: [],
	resources: ['stream'],
	types: ['movie'],
})

// takes function(type, id, cb)
addon.defineStreamHandler(function(args, cb) {
	if (args.type === 'movie' && args.id === 'tt1254207') {
		// serve one stream to big buck bunny
		const stream = { url: 'http://distribution.bbb3d.renderfarming.net/video/mp4/bbb_sunflower_1080p_30fps_normal.mp4' }
		cb(null, { streams: [stream] })
	} else {
		// otherwise return no streams
		cb(null, { streams: [] })
	}
})

serveHTTP(addon, {})
