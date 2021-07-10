// Servidor Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');


class Server {

	constructor (){

		this.app  = express() ; 
    this.port = process.env.PORT;
		/// this.port = 3000;
		
		/// Http Server 
		this.server = http.createServer( this.app );

		/// Configuracion de Sockets 
		this.io = socketio( this.server, { /* Configuraciones */} );

	}

	middlewares(){
		this.app.use( express.static ( path.resolve( __dirname , '../public') ) );
    this.app.use( cors() );		
	}

	configurarSockets(){

		new Sockets( this.io ); 

	}

	execute(){

		// inicializar middlewares
		this.middlewares();

		// Inicializar Sockets
		this.configurarSockets();
		// Inicializar Server 
		this.server.listen(this.port, ()=>{
			console.log('Server Configurado en Puerto :', this.port );
		});
	}



}

module.exports  = Server ;