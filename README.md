### Frontend 
for frontend development, please see the readme in `./frontend`.

### Set up rsa keys
Go to `certs` folder in `resources`
Run the following script

```bash
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem
```


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

### VS code 環境問題 新手上路 - Debug for set up
後端
---
**1.**
- 檢查Java版本是不是23
- 檢查方法是在執行的cli打上 `java -version` 應該會顯示 23... 的版本

範例：
```bash
java -version
openjdk version "23.0.1" 2024-10-15
OpenJDK Runtime Environment Corretto-23.0.1.8.1 (build 23.0.1+8-FR)
OpenJDK 64-Bit Server VM Corretto-23.0.1.8.1 (build 23.0.1+8-FR, mixed mode, sharing)
```

**2.**
- 如果一直出現問題 可能是Cache的關係
- Lombok是簡化code的工具 但在build的時候不會跑 所以如果出現找不到@annotation的錯誤的話可以試著清掉cache
- 用cli `mvn clean`就可以清掉。如果跑起來有問題請參考以下做法。

**2-1**
- 按 `Ctrl+Shift+P` 打開上面的指令面板
- 輸入以下指令，然後按Enter
`Java: Clean Java Language Server Workspace`

**2-2**
- 在`pom.xml`
```xml
		<dependency>
			<groupId>org.projectlombok</groupId>
			<artifactId>lombok</artifactId>
			<!--加入這兩行-->
			<version>1.18.28</version>
			<scope>provided</scope>
			<!--加入這兩行-->
		</dependency>
```
前端
---
1. 檢查command line有沒有進到 `./frontend` 再執行
2. dependency有問題的話 -> `npm install --force`
3. install有問題的話可以清掉dependency再安裝: `rm -r node_modules`
4. run的時候有問題的話檢查有沒有裝 next, cross-env


### Check Swagger
- Navigate to `http://localhost:8080/swagger-ui/index.html`
