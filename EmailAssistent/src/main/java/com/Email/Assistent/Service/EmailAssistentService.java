package com.Email.Assistent.Service;

import com.Email.Assistent.PayLoad.EmailRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.prompt.ChatOptions;
import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.ai.ollama.api.OllamaOptions;
import org.springframework.stereotype.Service;

import static org.springframework.ai.ollama.api.OllamaModel.CODELLAMA;

@Service
public class EmailAssistentService {

    private final OllamaChatModel chatModel;

    public EmailAssistentService(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }


    public String generateEmailReply(EmailRequest emailRequest){
        // Build the Prompt
        String prompt = buildPrompt(emailRequest);
        ChatOptions options = ChatOptions.builder()
                .model("llama3.1")
                .temperature(0.4)
                .build();

        String response = chatModel.call(prompt);

        return response;

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
