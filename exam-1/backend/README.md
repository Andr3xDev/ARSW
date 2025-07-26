<div align="center">
    <h1 align="center">Java</h1>
    <p align="center">
api to get market values as historic data
    </p>
</div>

</br>

## ✨ Features

- Obtaining historical data by day, month and year.
- Using AI to generate complex responses that attempt to advise which company is better off financially based on the data obtained.
- Ease of use of filters and patterns that allow limiting the use of APIs for security reasons.
- Using the facade pattern to simulate the behavior of an apigateway.
- Complete deployment and integrating CI/CD

</br>
</br>

## 🛠️ Tech Stack

- Java 21: Core programming language.
- Spring Boot 3: Framework for building the application and the REST API.
- Maven: Dependency management and project build tool.

</br>
</br>

## 🚀 Getting Started

Follow these steps to run the project in your local environment.

Installation and Execution

```sh
Clone the repository:
git clone https://github.com/Andr3xDev/ARSW-Parcial1
cd ARSW-Parcial1
```

Build the project with Maven:

```sh
mvn clean varify
```

Run the application:
```sh
mvn spring-boot:run
```

The application will be available at the following URL: http://localhost:8080

</br>
</br>

## 📝 API Endpoints

The API has mainly 2 endpoints that reference a different mode, with the following options:

- intraday
- day
- month
- year


Normal: In this mode, only historical data is obtained according to the period chosen by the user, with the following structure and it's result:

```json
{
  function: <string>
  symbol: <string>
}
```

![get1](docs/get1.png)

GPT mode: uses an AI to assess which historical data is best in terms of performance and returns a message stating its opinion, with the following structure and it's result:

```json
{
  function: <string>
  symbol: <string>
}
```

![get2](docs/get2.png)
