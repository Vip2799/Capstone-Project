FROM openjdk
WORKDIR user/lib
ADD ./target/User-Service-0.0.1-SNAPSHOT.jar /user/lib/User-Service-0.0.1-SNAPSHOT.jar
ENTRYPOINT ["java","-jar","User-Service-0.0.1-SNAPSHOT.jar"]