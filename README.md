# BlackTiger - E-commerce Next.js

E-commerce headless para BlackTiger (productos para cuidado de tatuajes). Next.js 14 + WooCommerce API + MercadoPago.

## Desarrollo local

```bash
npm install
npm run dev
```

Crear `.env.local`:
```
WC_URL=https://blacktiger.pe
WC_CONSUMER_KEY=ck_xxx
WC_CONSUMER_SECRET=cs_xxx
NEXT_PUBLIC_SITE_URL=https://blacktiger.pe
MERCADOPAGO_PUBLIC_KEY=APP_USR_xxx
MERCADOPAGO_ACCESS_TOKEN=APP_USR_xxx
```

## Servidor de produccion

**IP:** 37.187.151.76
**Usuario:** debian
**Llave SSH:** `~/.ssh/serverenigma.pem`

```bash
ssh -i ~/.ssh/serverenigma.pem debian@37.187.151.76
```

**Ruta:** `/home/blacktiger/app/`
**Container:** `blacktiger-web`
**Puerto:** `127.0.0.1:4070 -> 3000`

### Deploy

```bash
cd /home/blacktiger/app
sudo git pull origin main
sudo docker compose build --no-cache && sudo docker compose up -d
```

### Logs

```bash
sudo docker logs -f blacktiger-web
```

### WordPress

WordPress sigue en `/home/blacktiger/public_html/`. Apache enruta:
- `/wp-admin`, `/wp-json`, `/wp-content`, `/wp-login.php` → WordPress (PHP)
- Todo lo demas → Next.js (Docker container)

Config Apache: `/etc/apache2/sites-available/blacktiger.pe.conf`
