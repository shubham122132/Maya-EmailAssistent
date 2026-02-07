package com.Email.Assistent.Service;

import com.Email.Assistent.PayLoad.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class EmailAssistentService {

    @Value("${gemini.api.path}")
    private String geminiApiPath;
    @Value("${gemini.api.key}")
    private String geminiApiKey;

    private final WebClient webClient;


//    to check the value of url anf key
//    public void test() {
//        System.out.println(geminiApiKey);
//        System.out.println(geminiApiUrl);
//    }

    public String generateEmailReply(EmailRequest emailRequest){
        // Build the Prompt
        String prompt = buildPrompt(emailRequest);
        //Craft a Request
        Map<String,Object> requestBody = Map.of(
                "contents",new Object[]{
                        Map.of("parts",new Object[]{
                            Map.of("text",prompt)
                        })
                }
        );

        //do request and get response
        String response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path(geminiApiPath)
                        .queryParam("key", geminiApiKey)
                        .build()
                )
                .header("Content-Type","application/json")
                .bodyValue(requestBody)
                .retrieve()
                .onStatus(HttpStatusCode::isError, r ->
                        r.bodyToMono(String.class)
                                .flatMap(err -> Mono.error(new RuntimeException(err)))
                )
                .bodyToMono(String.class)
                .block();

        //Extract and return the response
        return extractResponseContent(response);
    }

    private String extractResponseContent(String response) {
        try{
            ObjectMapper mapper = new ObjectMapper();
            JsonNode rootNode = mapper.readTree(response);
            return rootNode.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            return "Error processing request : "+ e.getMessage();
        }
    }

    private String buildPrompt(EmailRequest emailRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append("Generate a email reply for the following email content.please don't generate a subject line");
        if(emailRequest.getTone() != null && !emailRequest.getTone().isEmpty()){
            prompt.append("Use a ").append(emailRequest.getTone()).append("tone");
        }
        prompt.append("\nOriginal Email: \n").append(emailRequest.getEmailContent());
        return prompt.toString();
    }
}
