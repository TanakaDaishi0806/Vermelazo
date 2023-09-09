# デプロイ用コンテナに含めるバイナリを作成するコンテナ
#FROM golang:1.18.2-bullseye as deploy-builder

#WORKDIR /app

#COPY go.mod go.sum ./
#RUN go mod download

#ENV DB_USER=${DB_USER}
#ENV DB_PASSWORD=${DB_PASSWORD}

#COPY . .
#RUN go build -trimpath -ldflags "-w -s" -o app

# ---------------------------------------------------

#FROM debian:bullseye-slim as deploy

#RUN apt-get update

#COPY --from=deploy-builder /app/app .

#CMD ["./app"]

# ---------------------------------------------------

#FROM golang:1.18.2 as dev
#WORKDIR /app
#RUN go install github.com/cosmtrek/air@latest
#CMD ["air"]

FROM golang:1.20.4-alpine3.18

WORKDIR /app

COPY ./ ./
RUN go mod download

# バイナリファイルにビルド
RUN GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o server

EXPOSE 8080

# バイナリファイルを実行
CMD ./server