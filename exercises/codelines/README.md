<div align="center">
  
<h1 align="center">Line-of-Code (LOC) Counter</h1>

<p align="center">
A command-line tool written in Java to count the lines of code in source files
</p>

</div>

</br>


### Productivity Metric

As required by the assignment guide, the productivity metric for this project is:
* **Total Time Spent:** 5.5 hours
* **Total Logical Lines of Code (LOC):** 164 
* **Productivity:** 29.8 LOC/h 


</br>
</br>


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software:
* Java Development Kit (JDK) 11 or higher.
* Apache Maven 3.6 or higher.

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1.  Clone the repository from GitHub:
    ```sh
    git clone ([https://github.com/tu-usuario/tu-repositorio.git](https://github.com/tu-usuario/tu-repositorio.git))
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

The program is a command line tool that takes two arguments: a count type and a file path/pattern.

#### Count Physical Lines (phy)

To count the total physical lines of a single file:

```sh
java -jar target/codelines-0.0.1-SNAPSHOT.jar phy src/main/java/edu/arsw/codelines/CountLines.java
```

#### Count Logical Lines (loc)

To count the logical lines of code (ignoring comments and blank lines):

```sh
java -jar target/codelines-0.0.1-SNAPSHOT.jar loc src/main/java/edu/arsw/codelines/CountLines.java
```


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


## About the project

### Class structure

The project's design is very direct and is based on the principle of separation of concerns. The work is divided into two main classes: CodelinesApplication, which acts as the entry point and is in charge of interpreting user commands, and CountLines, which contains all the business logic for counting lines, handling files, and processing comments.

This separation is effective because the CodelinesApplication class only worries about what the user wants, while the CountLines class handles how to do it. Thanks to this, the counting logic is independent, easy to test, and reusable, as it does not depend on the command-line interface.

![clases](/docs/class.png)

### Documentation

This repository contains all required documentation using Javadoc: The source code is fully documented using Javadoc. The generated documentation can be found in the target/site/apidocs directory after building the project.

![javadoc](/docs/javadoc.png)

![javadoc2](/docs/javadoc2.png)


</br>
</br>

## License
Distributed under the GPL-3.0 License. See `LICENSE.txt` for more information.
