package edu.arsw.board;

import jakarta.websocket.RemoteEndpoint;
import jakarta.websocket.Session;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import edu.arsw.board.controllers.BBEndpoint;

import java.io.IOException;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

class ControllerTest {

    private BBEndpoint bbEndpoint;
    private Session mockSession;
    private RemoteEndpoint.Basic mockRemote;

    @BeforeEach
    void setUp() {
        BBEndpoint.queue.clear();
        BBEndpoint.messages.clear();
        bbEndpoint = new BBEndpoint();
        mockSession = Mockito.mock(Session.class);
        mockRemote = Mockito.mock(RemoteEndpoint.Basic.class);
        when(mockSession.getBasicRemote()).thenReturn(mockRemote);
        when(mockSession.getId()).thenReturn("testSessionId");
    }

    @Test
    @DisplayName("Debería agregar la sesión a la cola y enviar mensaje inicial al abrir la conexión")
    void openConnectionShouldAddSessionAndSendInitialMessage() throws IOException {
        bbEndpoint.openConnection(mockSession);

        assertTrue(BBEndpoint.queue.contains(mockSession));
        assertEquals(1, BBEndpoint.queue.size());
        verify(mockRemote, times(1)).sendText("{\"type\":\"INFO\", \"content\":\"Connection established.\"}");
    }

    @Test
    @DisplayName("Debería enviar mensajes existentes a la nueva sesión al abrir la conexión")
    void openConnectionShouldSendExistingMessagesToNewSession() throws IOException {
        BBEndpoint.messages.add("{\"x\":10,\"y\":20}");
        BBEndpoint.messages.add("{\"x\":30,\"y\":40}");

        bbEndpoint.openConnection(mockSession);

        verify(mockRemote, times(1)).sendText("{\"type\":\"INFO\", \"content\":\"Connection established.\"}");
        verify(mockRemote, times(1)).sendText("{\"x\":10,\"y\":20}");
        verify(mockRemote, times(1)).sendText("{\"x\":30,\"y\":40}");
    }

    @Test
    @DisplayName("Debería remover la sesión de la cola al cerrar la conexión")
    void closedConnectionShouldRemoveSession() {
        BBEndpoint.queue.add(mockSession);
        assertEquals(1, BBEndpoint.queue.size());

        bbEndpoint.closedConnection(mockSession);

        assertTrue(BBEndpoint.queue.isEmpty());
    }

    @Test
    @DisplayName("Debería remover la sesión de la cola al producirse un error")
    void errorShouldRemoveSession() {
        BBEndpoint.queue.add(mockSession);
        assertEquals(1, BBEndpoint.queue.size());

        Throwable mockThrowable = new RuntimeException("Test error");
        bbEndpoint.error(mockSession, mockThrowable);

        assertTrue(BBEndpoint.queue.isEmpty());
    }

    @Test
    @DisplayName("Debería procesar el mensaje y hacer broadcast a todas las sesiones")
    void processPointShouldBroadcastMessage() throws IOException {
        Session mockSession2 = Mockito.mock(Session.class);
        RemoteEndpoint.Basic mockRemote2 = Mockito.mock(RemoteEndpoint.Basic.class);
        when(mockSession2.getBasicRemote()).thenReturn(mockRemote2);
        when(mockSession2.getId()).thenReturn("testSessionId2");

        BBEndpoint.queue.add(mockSession);
        BBEndpoint.queue.add(mockSession2);

        String testMessage = "{\"x\":50,\"y\":60}";
        bbEndpoint.processPoint(testMessage, mockSession);

        assertTrue(BBEndpoint.messages.contains(testMessage));
        verify(mockRemote, times(1)).sendText(testMessage);
        verify(mockRemote2, times(1)).sendText(testMessage);
    }

    @Test
    @DisplayName("Debería limpiar los mensajes y enviar el mensaje CLEAR a todas las sesiones si el mensaje es 'CLEAR'")
    void processPointShouldClearMessagesAndBroadcastClear() throws IOException {
        BBEndpoint.messages.add("{\"x\":1,\"y\":2}");
        BBEndpoint.queue.add(mockSession);

        bbEndpoint.processPoint("CLEAR", mockSession);

        assertTrue(BBEndpoint.messages.isEmpty());
        verify(mockRemote, times(1)).sendText("{\"type\":\"CLEAR\"}");
    }

    @Test
    @DisplayName("Broadcast debería enviar el mensaje a todas las sesiones en la cola")
    void broadcastShouldSendToAllSessions() throws IOException {
        Session mockSession2 = Mockito.mock(Session.class);
        RemoteEndpoint.Basic mockRemote2 = Mockito.mock(RemoteEndpoint.Basic.class);
        when(mockSession2.getBasicRemote()).thenReturn(mockRemote2);
        when(mockSession2.getId()).thenReturn("testSessionId2");

        BBEndpoint.queue.add(mockSession);
        BBEndpoint.queue.add(mockSession2);

        String messageToBroadcast = "test message";
        BBEndpoint.broadcast(messageToBroadcast);

        assertTrue(BBEndpoint.messages.contains(messageToBroadcast));
        verify(mockRemote, times(1)).sendText(messageToBroadcast);
        verify(mockRemote2, times(1)).sendText(messageToBroadcast);
    }

    @Test
    @DisplayName("Broadcast debería manejar IOException sin romper el ciclo")
    void broadcastShouldHandleIOException() throws IOException {
        Session mockSession2 = Mockito.mock(Session.class);
        RemoteEndpoint.Basic mockRemote2 = Mockito.mock(RemoteEndpoint.Basic.class);
        when(mockSession2.getBasicRemote()).thenReturn(mockRemote2);
        when(mockSession2.getId()).thenReturn("testSessionId2");

        BBEndpoint.queue.add(mockSession);
        BBEndpoint.queue.add(mockSession2);

        // Simula un IOException para la primera sesión
        doThrow(new IOException("Simulated IO error")).when(mockRemote).sendText(anyString());

        String messageToBroadcast = "error message";
        BBEndpoint.broadcast(messageToBroadcast);

        // La primera sesión debería haber intentado enviar y fallado, la segunda
        // debería haber tenido éxito.
        assertTrue(BBEndpoint.messages.contains(messageToBroadcast));
        verify(mockRemote, times(1)).sendText(messageToBroadcast);
        verify(mockRemote2, times(1)).sendText(messageToBroadcast); // Asegura que la segunda sesión recibió el mensaje
    }
}