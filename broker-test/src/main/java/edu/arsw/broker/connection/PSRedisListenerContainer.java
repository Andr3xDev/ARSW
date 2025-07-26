package edu.arsw.broker.connection;

import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;

@Component
public class PSRedisListenerContainer extends RedisMessageListenerContainer {
    @Autowired
    PSRedisListenerContainer(RedisConnectionFactory connectionFactory) {
        this.setConnectionFactory(connectionFactory);
    }
}