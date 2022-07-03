# Contributing

Below introduces & instructs you how to contribute to the project.

## Initialization

Fully initialize the project by running the following commands:

```bash
    npm install
    composer install
    php -r "file_exists('.env') || copy('.env.example', '.env');"
    php artisan key:generate
    php artisan migrate
    php artisan ide-helper:generate
    php artisan ide-helper:meta
    php artisan ide-helper:models --nowrite
```

## Development

```bash
    npm run dev
    php artisan serve
```

## Generating laravel-ide-helper files

```bash
    php artisan ide-helper:generate
    php artisan ide-helper:meta
    php artisan ide-helper:models --nowrite
```
