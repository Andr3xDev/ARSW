
const WebSocket = require('ws');

// Inicializa el servidor de WebSocket en el puerto 8080
const wss = new WebSocket.Server({ port: 8080 });

// Almacena todos los clientes conectados
const clients = new Set();

// Almacenamos el último estado conocido del juego.
// Esto es crucial para que los nuevos jugadores se pongan al día inmediatamente.
let lastGameState = JSON.stringify({
    history: [Array(9).fill(null)],
    currentMove: 0,
});

console.log('Servidor WebSocket iniciado en el puerto 8080');

wss.on('connection', (ws) => {
    // Añade el nuevo cliente al conjunto de clientes
    clients.add(ws);
    console.log('Nuevo cliente conectado. Total:', clients.size);

    // Envía inmediatamente el último estado del juego al nuevo cliente
    // para que se sincronice al conectarse.
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(lastGameState);
    }

    // Escucha los mensajes del cliente
    ws.on('message', (message) => {
        const messageString = message.toString();
        console.log('Mensaje recibido, retransmitiendo a todos los clientes:', messageString);

        // Actualiza el último estado conocido del juego con el mensaje recibido.
        lastGameState = messageString;

        // Retransmite el mensaje a TODOS los clientes, incluido el que lo envió.
        // Esto asegura que todos los tableros estén sincronizados.
        for (const client of clients) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(messageString);
            }
        }
    });

    // Gestiona la desconexión del cliente
    ws.on('close', () => {
        clients.delete(ws);
        console.log('Cliente desconectado. Total:', clients.size);
    });

    // Gestiona errores de conexión
    ws.on('error', (error) => {
        console.error('Error en WebSocket:', error);
        clients.delete(ws);
    });
});
