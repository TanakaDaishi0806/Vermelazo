# # デプロイ用コンテナに含めるバイナリを作成するコンテナ
# FROM golang:1.18.2-bullseye as deploy-builder

# WORKDIR /app

# COPY go.mod go.sum ./
# RUN go mod download

# COPY . .
# RUN go build -trimpath -ldflags "-w -s" -o app

# # ---------------------------------------------------

# FROM debian:bullseye-slim as deploy

# RUN apt-get update

# COPY --from=deploy-builder /app/app .

# CMD ["./app"]

# # ---------------------------------------------------

# FROM golang:1.18.2 as dev
# WORKDIR /app
# RUN go install github.com/cosmtrek/air@latest
# CMD ["air"]

FROM golang:1.20.4-alpine3.18

ARG DB_USER
ARG DB_PASSWORD

ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}

WORKDIR /app

COPY ./ ./
RUN go mod download

RUN GOOS=linux GOARCH=amd64 go build -mod=readonly -v -o server

EXPOSE 8080

CMD DB_USER=${DB_USER} DB_PASSWORD=${DB_PASSWORD} ./server