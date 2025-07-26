package edu.arsw.broker.connection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

@Component
public class PSRedisTemplate extends StringRedisTemplate {

    @Autowired
    public PSRedisTemplate(RedisConnectionFactory connectionFactory) {
        super(connectionFactory);
    }

}