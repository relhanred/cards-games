FROM tomcat:9.0-jdk8-openjdk

COPY /config/tomcat-users.xml /usr/local/tomcat/conf
COPY /config/context.xml /usr/local/tomcat/webapps.dist/manager/META-INF

CMD ["catalina.sh", "run"]

WORKDIR /usr/local/tomcat

RUN rm -rf webapps && mv webapps.dist webapps 





