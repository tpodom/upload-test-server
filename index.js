#!/usr/bin/env node

const Hapi = require('@hapi/hapi');
const Path = require('path');

async function init(opt) {

	const server = new Hapi.Server({ 
		port: 8989, 
		host: '0.0.0.0',
		routes: {
		  timeout: {
			server: 60000 * 2,
			socket: 60000 * 5
		  }				
		}
	});

	server.route({
	  method: 'POST',
	  path: '/upload',
	  handler: require('./handler'),
	  config: {
		cors: {
		  origin: [ '*' ],
		  headers: [ 'x-access-token', 'Accept', 'Authorization', 'Content-Type', 'If-None-Match' ]
		},
		payload: {
		  maxBytes: 1024 * 1024 * 100,
		  allow: 'multipart/form-data',
		  output: 'stream',
		  parse: true,
		  multipart: true,
		}
	  }
	});

	await server.start();
	console.log(`Upload your files to ${server.info.uri}/upload`);
	console.log(`Files are saved in ${Path.resolve('.')}`);
	console.log();
}

init();