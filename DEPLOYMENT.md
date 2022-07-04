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
-   **Openswoole PHP Extension**

```shell
# Example
sudo apt-get install software-properties-common
sudo add-apt-repository ppa:ondrej/php
sudo apt install php8.1 php8.1-cli php8.1-common php8.1-mysql php8.1-cgi php8.1-curl php8.1-zip php8.1-mbstring php8.1-gd php8.1-xml php8.1-xsl php8.1-dev php8.1-bz2  php8.1-sqlite php8.1-sqlite3 php8.1-memcached php8.1-fpm php8.1-xdebug php8.1-bcmath php8.1-intl php8.1-openswoole
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

### `php artisan octane:start`

-   Require run this command in background.
-   Main endpoint to access website

```shell
#Supervisor
[program:laravel-octane-worker]
process_name=%(program_name)s_%(process_num)02d
command=php path_of_laravel_project/artisan octane:start --max-requests=1000 --workers=4 --task-workers=12 --port=8000
autostart=true
autorestart=true
user=www-data
redirect_stderr=true
stdout_logfile=any_existing_path/laravel-octane-worker.log​
stopwaitsecs=3600
```

-   Optional

```nginx
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    listen 80;
    listen [::]:80;
    server_name domain.com;
    server_tokens off;
    root /home/forge/domain.com/public;

    index index.php;

    charset utf-8;

    location /index.php {
        try_files /not_exists @octane;
    }

    location / {
        try_files $uri $uri/ @octane;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    access_log off;
    error_log  /var/log/nginx/domain.com-error.log error;

    error_page 404 /index.php;

    location @octane {
        set $suffix "";

        if ($uri = /index.php) {
            set $suffix ?$query_string;
        }

        proxy_http_version 1.1;
        proxy_set_header Host $http_host;
        proxy_set_header Scheme $scheme;
        proxy_set_header SERVER_PORT $server_port;
        proxy_set_header REMOTE_ADDR $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        proxy_pass http://127.0.0.1:8000$suffix;
    }
}
```
