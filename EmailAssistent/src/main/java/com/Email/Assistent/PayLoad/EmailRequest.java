package com.Email.Assistent.PayLoad;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class EmailRequest {
    private String emailContent;
    private String tone;
}
