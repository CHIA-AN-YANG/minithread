### Run in Visual Studio Code
1. Install Extension Pack for Java from Microsoft and Spring Boot Extension Pack
2. Please check and make sure you have the correct Java version (23)
3. start docker desktop app
4. On the left tool bar, a hexgon Spring Boot icon will appear. Select Spring Boot Icon and Hit Play button

### To run in command line, we recommend using the following steps

1. Download mvn 下載maven (cli tool)
2. Download sdk 下載Java版本管理器 sdk
3. start docker desktop app

```bash
sdk install java 23.0.1-amzn
sdk use java 23.0.1-amzn
cd minithread/minithread-be
mvn spring-boot:run
```

### Check Swagger
go to `http://localhost:8080/swagger-ui.html`
