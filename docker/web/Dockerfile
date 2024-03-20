# syntax=docker/dockerfile:1
FROM httpd:2.4

RUN apt-get update
RUN apt-get install -y vim
RUN echo "source /usr/share/vim/vim90/defaults.vim\nset mouse=" > ~/.vimrc

RUN sed -i 's|#LoadModule rewrite_module|LoadModule rewrite_module|' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's|#LoadModule proxy_module|LoadModule proxy_module|' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's|#LoadModule proxy_fcgi_module|LoadModule proxy_fcgi_module|' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's|DocumentRoot "/usr/local/apache2/htdocs"|DocumentRoot "/var/www/web"\n\n<IfModule proxy_module>\n    ProxyPassMatch ^/(.*\.php(/.*)?)$ fcgi://php:9000//var/www/web/\$1\n</IfModule>\n|' /usr/local/apache2/conf/httpd.conf
RUN sed -i 's|<Directory "/usr/local/apache2/htdocs">|<Directory "/var/www/web">\n    DirectoryIndex index.php\n|' /usr/local/apache2/conf/httpd.conf

RUN awk 'BEGIN {output=0} /Require all granted/ && !output {printf "%s\n","    Require all granted\n\n\
    RewriteEngine On\n\n\
    RewriteCond %{REQUEST_FILENAME} !-f\n\
    RewriteCond %{REQUEST_FILENAME} !-d\n\
    RewriteCond %{REQUEST_URI} !^/(favicon\.ico|apple-touch-icon.*\.png)$ [NC]\n\
    RewriteRule (.+) index.php?p=$1 [QSA,L]"; output=1; next} 1' /usr/local/apache2/conf/httpd.conf > temp.conf && mv temp.conf /usr/local/apache2/conf/httpd.conf
