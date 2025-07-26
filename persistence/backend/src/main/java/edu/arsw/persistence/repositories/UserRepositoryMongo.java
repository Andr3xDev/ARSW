package edu.arsw.persistence.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import edu.arsw.persistence.models.User;

@Repository
public interface UserRepositoryMongo extends MongoRepository<User, String> {
}