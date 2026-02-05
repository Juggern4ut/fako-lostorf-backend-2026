# fako-lostorf Backend (PocketBase)

PocketBase backend für den Fasnachtsverein Lostorf.

## Lokal starten

```bash
cd fako-lostorf-backend
./scripts/get-pocketbase.sh
./pocketbase serve --http 127.0.0.1:8090 --dir pb_data --migrationsDir pb_migrations
```

Admin UI: http://127.0.0.1:8090/_/

## Deployment (Dokploy)

- Builder: Dockerfile
- Port: 8090 (intern)
- Persistentes Volume: /pb/pb_data
