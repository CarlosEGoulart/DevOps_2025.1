apt-get update && apt-get install -y libapache2-mod-php

a2enmod php*

docker-php-ext-install mysqli pdo_mysql

chown -R www-data:www-data /var/www/html

exec apache2-foreground

