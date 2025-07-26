package edu.arsw.broker.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.data.redis.listener.PatternTopic;
import org.springframework.stereotype.Component;

import edu.arsw.broker.connection.PSRedisListenerContainer;
import edu.arsw.broker.connection.PSRedisTemplate;
import edu.arsw.broker.receiver.Receiver;

@Component
public class Producer implements CommandLineRunner {

    private static final Logger LOGGER = LoggerFactory.getLogger(Producer.class);

    @Autowired
    private ApplicationContext appContext;

    @Autowired
    PSRedisTemplate template;

    @Autowired
    PSRedisListenerContainer container;

    public void run(String... args) throws Exception {
        for (int i = 0; i < 7; i++) {
            Receiver receiver = appContext.getBean(Receiver.class);
            container.addMessageListener(receiver, new PatternTopic("PSChannel"));
        }
        Integer i = 0;
        Thread.sleep(500);
        while (i < 6) {
            i = i + 1;
            LOGGER.info("Sending message... " + i);
            template.convertAndSend("PSChannel", "Hello from Redis! Message " + i);
            Thread.sleep(500);
        }
        System.exit(0);
    }
}