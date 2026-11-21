FROM eclipse-temurin:21-jdk AS build

WORKDIR /workspace

COPY .mvn/ .mvn/
COPY mvnw pom.xml ./
COPY src/ src/

RUN chmod +x mvnw
RUN ./mvnw -B package

FROM eclipse-temurin:21-jre-noble AS runtime

WORKDIR /app

RUN groupadd --gid 10001 frisco \
    && useradd --uid 10001 --gid frisco --no-create-home \
       --shell /usr/sbin/nologin frisco

COPY --from=build /workspace/target/backend-java-0.0.1-SNAPSHOT.jar /app/app.jar

USER frisco

ENV SERVER_ADDRESS=0.0.0.0
ENV JAVA_TOOL_OPTIONS="-Xms128m -Xmx384m"

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]