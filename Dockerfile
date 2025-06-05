# 1. Etapa "builder": usar la imagen oficial de Maven con Java 17
FROM maven:3.9.4-eclipse-temurin-17 AS builder
WORKDIR /app

# Copiamos únicamente pom.xml y descargamos dependencias primero
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copiamos el resto del proyecto y empaquetamos
COPY src ./src
RUN mvn clean package -DskipTests -B

# 2. Etapa "runtime": usar una imagen más ligera con JRE 17
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copiamos el JAR generado desde la etapa "builder"
COPY --from=builder /app/target/appforpets-0.0.1-SNAPSHOT.jar ./app.jar

# Exponemos el puerto en el que corre WebFlux
EXPOSE 8080

# Entrypoint para arrancar la aplicación
ENTRYPOINT ["java","-jar","/app/app.jar"] 