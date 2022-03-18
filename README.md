```
pnpm i
pnpm build
docker build -t nginx-frontend-env-inject .
docker run -it -e NODE_ENV=production -p 8080:80 nginx-frontend-env-inject
```
