package org.dojo.webapp.handler;

import java.io.IOException;
import java.io.OutputStream;
import java.net.URI;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;

public class FileHandler implements HttpHandler {

    private final Path SRC_MAIN_RESOURCES;

    public FileHandler(Path root) {
        SRC_MAIN_RESOURCES = root;
    }

    @Override
    public void handle(HttpExchange he) throws IOException {
        URI requestURI = he.getRequestURI();
        Path fileToLoad = SRC_MAIN_RESOURCES.resolve(requestURI.toString().substring(1));
        System.out.println("File handler:"  + fileToLoad);

        Stream<String> lines = Files.lines(fileToLoad);
        String response = lines.collect(Collectors.joining("\n"));

        he.sendResponseHeaders(200, response.length());
        OutputStream os = he.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}