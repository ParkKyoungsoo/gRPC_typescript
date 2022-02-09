패키지 설치

```
npm i
```



proto 빌드

```
./node_modules/.bin/proto-loader-gen-types --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=proto/proto/*.proto
```



컴파일

```
npx tsc
```



서버 코드 실행

```
node dist/route_guide_server.js --db_path=./route_guide_db.json
```



클라이언트 코드 실행

```
node dist/route_guide_client.js --db_path=./route_guide_db.json
```

