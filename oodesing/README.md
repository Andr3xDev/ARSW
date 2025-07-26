<div align="center">
  
<h1 align="center">OO Desing </h1>

<p align="center">
A command-line tool written in Java to calculate statistical metrics from a set of numbers in a file.
</p>

</div>

</br>


## Project Overview

This program calculates the mean and standard deviation for a series of real numbers provided in a text file. As a core requirement of the assignment, the application uses a custom-built linked list to store and process the data, ensuring it is compliant with Java's Collections API.


</br>
</br>

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What you need to install the software:
- Java Development Kit (JDK) 11 or higher.
- Apache Maven 3.6 or higher.

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  Clone the repository from GitHub:
    ```sh
    git clone https://github.com/tu-usuario/tu-repositorio.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd (tu-repositorio)
    ```
3.  Compile and package the application using Maven:
    ```sh
    mvn clean package
    ```

</br>
</br>


## Usage
The program is a command line tool that takes only one argument: the objetive file: 

```sh
java -jar target/oodesing-0.0.1-SNAPSHOT.jar <file.txt>    
```

![example](/docs/example.png)

</br>
</br>


## Running the Tests

The project includes a suite of unit tests built with JUnit 5 to ensure the logic is correct.

To run the tests, execute the following Maven command:

```sh
mvn test
```

A detailed test report is also included in the repository.


</br>
</br>


## Documentation

This repository contains all required documentation using Javadoc: The source code is fully documented using Javadoc. The generated documentation can be found in the target/site/apidocs directory after building the project.

![javadoc](/docs/javadoc.png)

</br>
</br>

## License
Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.
