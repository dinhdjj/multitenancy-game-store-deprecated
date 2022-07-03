# Deployment

This document will help you deploy this project to real servers.
[More info](https://laravel.com/docs/9.x/deployment)

## Requirements

-   **Php 8.1+**
-   **Composer 2+**
-   **Nodejs 16+**
-   **BCMath PHP Extension**
-   **Ctype PHP Extension**
-   **Fileinfo PHP extension**
-   **JSON PHP Extension**
-   **Mbstring PHP Extension**
-   **OpenSSL PHP Extension**
-   **bPDO PHP Extension**
-   **Tokenizer PHP Extension**
-   **XML PHP Extension**

```shell
# Example
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt install php8.1 php8.1-cli php8.1-common php8.1-mysql php8.1-cgi php8.1-curl php8.1-zip php8.1-mbstring php8.1-gd php8.1-xml php8.1-xsl php8.1-dev php8.1-bz2  php8.1-sqlite php8.1-sqlite3 php8.1-memcached php8.1-fpm php8.1-xdebug php8.1-bcmath php8.1-intl
```

### `php artisan queue:work` command

-   Require run this command in background.

```ini
; Supervisor
[program:laravel-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /home/forge/app.com/artisan queue:work sqs --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=forge
numprocs=8
redirect_stderr=true
stdout_logfile=/home/forge/app.com/worker.log
stopwaitsecs=3600
```

### `php artisan schedule:run` command

-   Require run this command per minute.

```shell
# Cron job
* * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
```

### Nginx

-   Optional

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com;
    root /srv/example.com/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
