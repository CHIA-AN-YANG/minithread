## 1. Frontend Set Up
To run the frontend of this project, please see the readme in [./frontend/README.md](./frontend/README.md).

## 2. Backend Set up
### Set up rsa keys
Go to `certs` folder in `resources`
Run the following script

```bash
openssl genrsa -out keypair.pem 2048
openssl rsa -in keypair.pem -pubout -out public.pem
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in keypair.pem -out private.pem
```

### Run in Visual Studio Code
1. Install **Extension Pack for Java** from Microsoft and **Spring Boot Extension Pack**
2. Please check and make sure you have the correct Java version (**17**)
3. start docker desktop app
4. On the left tool bar, a hexgon Spring Boot icon will appear. Select Spring Boot Icon and Hit Play button

### To run in command line, we recommend using the following steps

1. Download mvn 下載maven (cli tool)
2. Download sdk 下載Java版本管理器 sdk
3. start docker desktop app

```bash
sdk install java 17.0.11-amzn
sdk use java 17.0.11-amzn
cd minithread/minithread-be
mvn spring-boot:run
```
You will only be able to check swagger and DBeaver postgreSQL after you have started the application

## 3. Install and use DBeaver
**What's DBeaver?**
DBeaver is a powerful, open-source database management tool that supports various databases, including PostgreSQL. 
With DBeaver, you will be able to check your database status.
This guide will walk you through the steps to download and install DBeaver on Windows and connect it to a PostgreSQL database.

**Tutorial Resources**
- [How to Install DBeaver on Windows (2025)](https://www.youtube.com/watch?v=XFsCjiut11U)
- [How to Download & Install DBeaver for PostgreSQL](https://www.youtube.com/watch?v=6IhuHVMoUMU)

**Troubleshooting**
Refer to [DBeaver Documentation](https://dbeaver.com/docs/dbeaver/Database-driver-PostgreSQL/) for issues.

**Installation Steps**
1. Download DBeaver from dbeaver.io/download.
2. Run the installer and follow on-screen instructions.
3. Launch DBeaver.

**Connecting to PostgreSQL**
1. Create a new connection in DBeaver.
2. Choose PostgreSQL and enter information for connection
- host (localhost)
- port (5432)
- database name (thread_db)
- username (root)
- password (secret).

Test the connection.

## 4. Data migration
In your rootfolder, start bash terminal

Do the following
```bash
docker ps # check container names

docker cp ./database/latest/db_backup_<date>.dump <container_name>:/tmp/db_backup.dump

docker exec -t <container_name> pg_restore -U <db_user> -d <db_name> -v /tmp/db_backup.dump
```
For example, try this:
```bash
docker cp ./database/latest/db_backup_20250302.dump minithread-be-postgres-1:/tmp/db_backup.dump
docker exec -t minithread-be-postgres-1 pg_restore -U root -h localhost -p 5432 -d thread_db -F c -f /tmp/db_backup.dump

```
If the change does not show in DBeaver, restart DBeaver connection to check the result.

## 5. Check Swagger
- Navigate to `http://localhost:8080/swagger-ui/index.html`

## VS code 環境問題 新手上路 - Debug for set up

### 後端無法開啟
**1. 檢查Java版本是不是17**
- 檢查方法是在執行的cli打上 `java -version` 應該會顯示 17... 的版本

範例：
```bash
java -version
openjdk version "17.0.11" 2024-04-16 LTS
OpenJDK Runtime Environment Corretto-17.0.11.9.1 (build 17.0.11+9-LTS)
OpenJDK 64-Bit Server VM Corretto-17.0.11.9.1 (build 17.0.11+9-LTS, mixed mode, sharing)
```

**2. 承上，如果後端還是沒辦法開**
- 如果一直出現問題 可能是Cache的關係
- Lombok是簡化code的工具 但在build的時候不會跑 所以如果出現找不到@annotation的錯誤的話可以試著清掉cache
- 用cli `mvn clean`就可以清掉。如果跑起來有問題請參考2-1。

**2-1**
- 按 `Ctrl+Shift+P` 打開上面的指令面板
- 輸入以下指令，然後按Enter
`Java: Clean Java Language Server Workspace`

### 前端
1. 檢查command line有沒有進到 `./frontend` 再執行
2. dependency有問題的話 -> `npm install --force`
3. install有問題的話可以清掉dependency再安裝: `rm -r node_modules`
4. run的時候有問題的話檢查有沒有裝 next, cross-env

### DBeaver
1. 沒辦法連線到PostgreSQL:

後端要先開起來才有辦法連線。檢查後端有沒有開，docker有沒有在跑

官方文件有圖文教學：https://dbeaver.com/docs/dbeaver/Database-driver-PostgreSQL/

2. Migration之前，請確認目前所在的分支 schema 和 dump 的版本完全一致


