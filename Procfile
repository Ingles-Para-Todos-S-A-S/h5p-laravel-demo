web: vendor/bin/heroku-php-apache2 public/
release: cp .env.heroku .env && php artisan migrate:fresh --seed && php artisan storage:link && php artisan h5p:storage-link 
