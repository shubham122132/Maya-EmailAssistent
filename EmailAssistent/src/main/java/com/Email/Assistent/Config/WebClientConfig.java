package com.Email.Assistent.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Value("${gemini.api.base.url}")
    private String geminiBaseUrl;
    @Bean
    public WebClient webClient() {
        return WebClient.builder()
                .baseUrl(geminiBaseUrl)
                .build();
    }
}
