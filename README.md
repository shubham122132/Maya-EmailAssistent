# Maya - AI-Powered Email Assistant

An intelligent email assistant that generates professional email replies using AI. Maya consists of a Java Spring Boot backend, a React frontend, and a Chrome browser extension for seamless Gmail integration.

## Project Overview

Maya is a comprehensive email assistant solution with three main components:

- **Backend (EmailAssistent)**: Spring Boot REST API powered by Google's Gemini API
- **Frontend (MayaFrontend)**: React-based web interface with Material-UI
- **Browser Extension (MayaExtension)**: Chrome extension for Gmail integration

## Features

- 🤖 AI-powered email reply generation using Google Gemini API
- 📧 Support for multiple email tones (professional, casual, formal, etc.)
- 🌐 Browser extension for seamless Gmail integration
- ⚡ Real-time email generation
- 🎨 Modern, responsive user interface
- 🔄 Cross-platform compatibility

## Tech Stack

### Backend
- **Framework**: Spring Boot 3.5.10
- **Language**: Java 21
- **API**: Google Gemini API
- **Build Tool**: Maven
- **Additional Libraries**:
  - Spring WebFlux (reactive programming)
  - Lombok (code generation)
  - Spring Web

### Frontend
- **Framework**: React 19.2.0
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI) 7.3.7
- **HTTP Client**: Axios
- **Styling**: Emotion CSS-in-JS

### Browser Extension
- **Type**: Chrome Extension (Manifest v3)
- **Target**: Gmail (mail.google.com)
- **Language**: JavaScript

## Project Structure

```
MayaEmailAssistent/
├── EmailAssistent/          # Spring Boot Backend
│   ├── src/main/java/      # Java source files
│   ├── src/main/resources/ # Configuration files
│   ├── pom.xml             # Maven configuration
│   └── mvnw                # Maven wrapper
├── MayaFrontend/           # React Frontend
│   ├── src/                # React components
│   ├── package.json        # npm dependencies
│   └── vite.config.js      # Vite configuration
├── MayaExtension/          # Chrome Browser Extension
│   ├── manifest.json       # Extension configuration
│   ├── content.js          # Gmail page injection
│   └── content.css         # Extension styling
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Java 21 or higher
- Node.js 18+ and npm
- Maven (or use the included mvnw wrapper)
- Chrome browser (for browser extension)
- Google Gemini API key

### Backend Setup

1. **Navigate to the EmailAssistent directory:**
   ```bash
   cd EmailAssistent
   ```

2. **Configure API credentials:**
   - Copy `src/main/resources/application.example.properties` to `src/main/resources/application.properties`
   - Add your Google Gemini API configuration:
     ```properties
     spring.application.name=Assistent
     gemini.api.key=your-api-key-here
     gemini.api.path=/path/to/gemini/api
     ```

3. **Build the project:**
   ```bash
   mvn clean build
   ```

4. **Run the backend server:**
   ```bash
   mvn spring-boot:run
   ```
   The server will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to the MayaFrontend directory:**
   ```bash
   cd ../MayaFrontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The frontend will typically run on `http://localhost:5173`

4. **Build for production:**
   ```bash
   npm run build
   ```

### Browser Extension Setup

1. **Navigate to Chrome Extensions:**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)

2. **Load the extension:**
   - Click "Load unpacked"
   - Select the `MayaExtension` folder

3. **Configure the extension:**
   - The extension will inject a Maya assistant button into Gmail compose pages
   - Make sure the backend server is running on `https://localhost:8080`

## API Endpoints

### Email Generation
- **Endpoint**: `POST /api/email/generate`
- **Description**: Generates an AI-powered email reply
- **Request Body**:
  ```json
  {
    "emailContent": "Original email content here",
    "tone": "professional"
  }
  ```
- **Response**:
  ```json
  {
    "reply": "Generated email reply text"
  }
  ```

## Usage

### Using the Web Interface

1. Navigate to the frontend (typically `http://localhost:5173`)
2. Enter the email content you want to reply to
3. Select the desired tone for the reply
4. Click "Generate" to get an AI-powered response
5. Copy and use the generated email

### Using the Browser Extension

1. Open Gmail and click compose
2. The Maya assistant button will appear in the compose area
3. Paste or type the email you need to reply to
4. Select your preferred tone
5. Click the assistant button to generate a reply
6. The response will be inserted into your draft

## Configuration

### Backend Configuration

Environment variables and properties can be set in `application.properties`:

```properties
spring.application.name=Assistent
server.port=8080
gemini.api.key=your-gemini-api-key
gemini.api.path=/v1/models/gemini-pro:generateContent
```

### Frontend Configuration

Update API endpoints in your component files if the backend URL differs from the default `http://localhost:8080`.

## Development

### Running Tests

**Backend:**
```bash
cd EmailAssistent
mvn test
```

**Frontend:**
```bash
cd MayaFrontend
npm test
```

### Code Quality

**Frontend Linting:**
```bash
npm run lint
```

## Troubleshooting

### Backend Issues
- **Port already in use**: Change the port in `application.properties` with `server.port=8081`
- **API key errors**: Verify your Gemini API key is valid and configured correctly
- **CORS errors**: Check that CORS is enabled on the controller (`@CrossOrigin(origins = "*")`)

### Frontend Issues
- **Cannot connect to backend**: Ensure the backend server is running and accessible
- **API timeout**: Check network connectivity and backend health
- **Build errors**: Clear node_modules and npm cache: `rm -rf node_modules && npm cache clean --force`

### Extension Issues
- **Extension not appearing in Gmail**: Ensure you're logged into a valid Gmail account
- **API connection failed**: Verify HTTPS is properly configured (localhost:8080)
- **Manifest errors**: Check browser console for manifest validation issues

## Security Considerations

- Store API keys securely and never commit them to version control
- Use HTTPS in production environments
- Implement proper authentication and authorization
- Validate and sanitize email content before sending to the API
- Consider rate limiting for API endpoints

## Future Enhancements

- [ ] Support for multiple AI providers (OpenAI, Claude, etc.)
- [ ] Email template library
- [ ] Multi-language support
- [ ] User accounts and email history
- [ ] Advanced customization options
- [ ] Integration with other email services
- [ ] Performance optimization and caching

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is provided as-is for educational and development purposes.

## Support

For issues, questions, or suggestions, please create an issue in the repository.

---

**Happy Email Assisting! 📧✨**
