# PocketBase backend for fako-lostorf

FROM alpine:3.20

ARG PB_VERSION=0.36.2

RUN apk add --no-cache ca-certificates tzdata curl unzip su-exec \
  && adduser -D -h /pb pb

WORKDIR /pb

# Download PocketBase at build time
RUN curl -fL "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" -o /tmp/pb.zip \
  && unzip -q /tmp/pb.zip -d /pb \
  && rm -f /tmp/pb.zip \
  && chmod +x /pb/pocketbase

COPY pb_migrations ./pb_migrations
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

VOLUME ["/pb/pb_data"]

EXPOSE 8090

ENV PB_DATA_DIR=/pb/pb_data

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/pb/pocketbase", "serve", "--http", "0.0.0.0:8090", "--dir", "/pb/pb_data", "--migrationsDir", "/pb/pb_migrations"]
