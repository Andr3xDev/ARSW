package edu.arsw.board.controllers;

import jakarta.websocket.*;
import jakarta.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;
import java.io.IOException;
import java.util.List;
import java.util.Queue;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;

@Component
@ServerEndpoint("/board")
public class BBEndpoint {

    private static final Logger logger = Logger.getLogger(BBEndpoint.class.getName());

    public static Queue<Session> queue = new ConcurrentLinkedQueue<>();
    public static List<String> messages = new CopyOnWriteArrayList<>();

    public static void broadcast(String msg) {
        if ("CLEAR".equals(msg)) {
            messages.clear();
            msg = "{\"type\":\"CLEAR\"}";
        } else {
            messages.add(msg);
        }

        for (Session session : queue) {
            try {
                session.getBasicRemote().sendText(msg);
                logger.log(Level.INFO, "Broadcasted to session {0}: {1}", new Object[] { session.getId(), msg });
            } catch (IOException e) {
                logger.log(Level.SEVERE, "Error broadcasting to session " + session.getId(), e);
            }
        }
    }

    @OnMessage
    public void processPoint(String message, Session session) {
        logger.log(Level.INFO, "Message received from {0}: {1}", new Object[] { session.getId(), message });
        broadcast(message);
    }

    @OnOpen
    public void openConnection(Session session) {
        queue.add(session);
        logger.log(Level.INFO, "Connection opened: {0}, current connections: {1}",
                new Object[] { session.getId(), queue.size() });

        try {
            session.getBasicRemote().sendText("{\"type\":\"INFO\", \"content\":\"Connection established.\"}");

            for (String msg : messages) {
                session.getBasicRemote().sendText(msg);
            }
        } catch (IOException ex) {
            logger.log(Level.SEVERE, "Error on open connection for session " + session.getId(), ex);
        }
    }

    @OnClose
    public void closedConnection(Session session) {
        queue.remove(session);
        logger.log(Level.INFO, "Connection closed: {0}, current connections: {1}",
                new Object[] { session.getId(), queue.size() });
    }

    @OnError
    public void error(Session session, Throwable t) {
        queue.remove(session);
        logger.log(Level.SEVERE, "Connection error on session " + session.getId(), t);
    }

}