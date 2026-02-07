package com.Email.Assistent.Controller;

import com.Email.Assistent.PayLoad.EmailRequest;
import com.Email.Assistent.Service.EmailAssistentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/email")
@RequiredArgsConstructor
public class EmailAssistentController {

    private final EmailAssistentService emailService;
    @PostMapping("/generate")
    public ResponseEntity<String> generateEmail(@RequestBody EmailRequest emailRequest){
        String response = emailService.generateEmailReply(emailRequest);
        return ResponseEntity.ok(response);
    }
}
