FROM mysql:latest

ADD ./my.cnf /etc/mysql/conf.d/my.cnf

ENV MYSQL_USER ${DB_USERNAME}
ENV MYSQL_PASSWORD ${DB_PASSWORD}
ENV MYSQL_ROOT_PASSWORD ${DB_PASSWORD}
ENV MYSQL_DATABASE ${DB_DATABASE}

