# CLAUDE.md - Board Project Documentation

**Last Updated:** 2025-11-17
**Project:** Simple Board Application
**Version:** 0.0.1-SNAPSHOT

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Architecture & Directory Structure](#architecture--directory-structure)
4. [Development Workflows](#development-workflows)
5. [Code Conventions](#code-conventions)
6. [API Documentation](#api-documentation)
7. [Database Schema](#database-schema)
8. [Common Tasks](#common-tasks)
9. [Known Issues & Considerations](#known-issues--considerations)
10. [Testing](#testing)

---

## Project Overview

This is a **full-stack bulletin board (게시판) application** combining:
- **Backend:** Spring Boot 2.6.2 (Java 8) REST API
- **Frontend:** React 18.3.1 SPA with React Router

The application allows users to create, read, update, and delete board posts with basic CRUD operations.

**Project Metadata:**
- Group: `com.board`
- Artifact: `simple-borad` (note: contains typo "borad" instead of "board")
- Package: `com.board.simpleborad`

**Key Features:**
- RESTful API for board operations
- React-based UI with routing
- H2 in-memory database (TCP mode)
- JPA/Hibernate ORM with auto-schema generation
- Lombok for boilerplate reduction

---

## Technology Stack

### Backend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | Spring Boot | 2.6.2 |
| Language | Java | 1.8 |
| Build Tool | Gradle | 6.8 |
| ORM | Spring Data JPA | (via Spring Boot) |
| Database | H2 Database | (runtime) |
| DB Driver | MariaDB JDBC | (available, not used) |
| Code Generation | Lombok | 1.18.32 |
| Testing | JUnit 5 + Spring Boot Test | (via Spring Boot) |

### Frontend
| Component | Technology | Version |
|-----------|-----------|---------|
| Framework | React | 18.3.1 |
| Routing | react-router-dom | 6.23.1 |
| HTTP Client | axios | 1.7.2 |
| Build Tool | react-scripts (CRA) | 5.0.1 |
| Testing | Jest + React Testing Library | (via CRA) |

### Database
- **Active:** H2 Database (TCP mode, file-based)
- **Connection:** `jdbc:h2:tcp://localhost/~/board`
- **Credentials:** username: `sa`, password: `1111`
- **Console:** Enabled at `/h2-console`
- **Schema Management:** Hibernate DDL auto-update

---

## Architecture & Directory Structure

```
/home/user/Board-Project/
│
├── build.gradle                    # Gradle build configuration
├── settings.gradle                 # Gradle project settings
├── gradlew / gradlew.bat          # Gradle wrapper scripts
├── .gitignore                      # Version control ignore rules
│
├── gradle/
│   └── wrapper/                    # Gradle wrapper files
│
├── src/
│   ├── main/
│   │   ├── java/com/board/simpleborad/
│   │   │   ├── SimpleBoradApplication.java    # Spring Boot entry point
│   │   │   │
│   │   │   ├── controller/                     # REST API Controllers
│   │   │   │   ├── BoardController.java        # CRUD endpoints (@RestController)
│   │   │   │   └── ReactTestController.java    # Test endpoint for React integration
│   │   │   │
│   │   │   ├── model/                          # JPA Entities
│   │   │   │   └── Board.java                  # Board entity with Lombok
│   │   │   │
│   │   │   ├── service/                        # Business Logic Layer
│   │   │   │   └── BoardService.java           # Board service operations
│   │   │   │
│   │   │   └── reposistory/                    # Data Access Layer (note: typo)
│   │   │       └── BoardRepository.java        # JPA Repository interface
│   │   │
│   │   ├── react-app/                          # React Frontend Application
│   │   │   ├── public/                         # Static assets
│   │   │   │   ├── index.html
│   │   │   │   ├── manifest.json
│   │   │   │   └── robots.txt
│   │   │   │
│   │   │   ├── src/
│   │   │   │   ├── index.js                    # React entry point
│   │   │   │   ├── App.js                      # Initial test component (unused)
│   │   │   │   ├── Board.js                    # Main routing component
│   │   │   │   │
│   │   │   │   ├── components/                 # React Components
│   │   │   │   │   ├── BoardList.js            # Board list view
│   │   │   │   │   └── BoardDetail.js          # Board detail view
│   │   │   │   │
│   │   │   │   └── style/                      # CSS Stylesheets
│   │   │   │       ├── Board.css
│   │   │   │       └── BoardDetail.css
│   │   │   │
│   │   │   ├── package.json                    # React dependencies
│   │   │   └── package-lock.json
│   │   │
│   │   └── resources/
│   │       └── application.properties          # Spring Boot configuration
│   │
│   └── test/
│       └── java/com/board/simpleborad/
│           └── SimpleBoradApplicationTests.java # Basic context test
│
└── node_modules/ (in react-app/)              # NPM dependencies
```

### Layer Responsibilities

**Controller Layer** (`controller/`)
- Handle HTTP requests/responses
- Input validation (minimal currently)
- Delegate to service layer
- Return JSON responses

**Service Layer** (`service/`)
- Business logic implementation
- Transaction management
- Data transformation
- Error handling

**Repository Layer** (`reposistory/`)
- Data access abstraction
- JPA query methods
- Database operations

**Model Layer** (`model/`)
- JPA entity definitions
- Database table mappings
- Relationships and constraints

---

## Development Workflows

### Backend Development

#### Running the Backend Server
```bash
# Using Gradle wrapper (recommended)
./gradlew bootRun

# Or build and run JAR
./gradlew build
java -jar build/libs/simple-borad-0.0.1-SNAPSHOT.jar

# Default port: 8080
# Access: http://localhost:8080
# H2 Console: http://localhost:8080/h2-console
```

#### Backend Development Cycle
1. Modify Java files in `src/main/java/`
2. Spring Boot DevTools (if added) will auto-reload
3. Otherwise, restart with `./gradlew bootRun`
4. Test API endpoints via browser/Postman/curl
5. Check H2 console for database state

### Frontend Development

#### Running the React Dev Server
```bash
cd src/main/react-app
npm install          # First time only
npm start            # Starts dev server on port 3000

# Access: http://localhost:3000
# API calls proxy to http://localhost:8080 (configured in package.json)
```

#### Frontend Development Cycle
1. Modify React files in `src/main/react-app/src/`
2. Hot reload automatically updates browser
3. Components use axios to call backend APIs
4. React Router handles client-side navigation

#### Building for Production
```bash
cd src/main/react-app
npm run build        # Creates optimized build/ directory
```

**Note:** React build integration with Gradle is currently **commented out** in `build.gradle` (lines 38-77). To enable full-stack builds, uncomment those tasks.

### Full-Stack Development

**Current Setup (Development):**
1. Start backend: `./gradlew bootRun` (port 8080)
2. Start frontend: `cd src/main/react-app && npm start` (port 3000)
3. Frontend proxies API calls to backend
4. Develop both independently

**Future Production Setup:**
1. Uncomment React build tasks in `build.gradle`
2. Run `./gradlew build` to bundle React into JAR
3. Deploy single JAR file with embedded frontend

---

## Code Conventions

### Java Backend Conventions

**Naming:**
- Classes: `PascalCase` (e.g., `BoardController`, `BoardService`)
- Methods: `camelCase` (e.g., `getAllBoardModel()`, `createBoard()`)
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Packages: lowercase (e.g., `com.board.simpleborad`)

**Annotations:**
- `@RestController` - REST API controllers (returns JSON)
- `@Service` - Business logic layer
- `@Repository` - Data access layer (not explicitly used, inherited from JpaRepository)
- `@Entity` - JPA entities
- `@Data` - Lombok: generates getters, setters, toString, equals, hashCode
- `@AllArgsConstructor` - Lombok: generates constructor with all fields
- `@Table(name = "BOARD")` - Explicit table naming
- `@CreationTimestamp` / `@UpdateTimestamp` - Auto-timestamp management

**Dependency Injection:**
```java
// Using Lombok @AllArgsConstructor for constructor injection
@Service
@AllArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
}
```

**Error Handling:**
```java
// Current pattern: throw RuntimeException
board.orElseThrow(() -> new RuntimeException("Board not found" + id));
```

**JPA Update Pattern:**
```java
// Using JPA Dirty Checking (no explicit save needed in transaction)
board.setTitle(boardDetails.getTitle());
board.setAuthor(boardDetails.getAuthor());
board.setContent(boardDetails.getContent());
return board;
```

### React Frontend Conventions

**Naming:**
- Components: `PascalCase` (e.g., `BoardList`, `BoardDetail`)
- Functions: `camelCase` (e.g., `handleSubmit`, `fetchData`)
- CSS files: Match component name (e.g., `Board.css`, `BoardDetail.css`)

**Component Structure:**
```javascript
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style/ComponentName.css';

function ComponentName() {
    const [state, setState] = useState(initialValue);

    useEffect(() => {
        // Side effects
    }, [dependencies]);

    return (
        <div>
            {/* JSX */}
        </div>
    );
}

export default ComponentName;
```

**API Calls:**
```javascript
// Using axios with async/await
const response = await axios.get('/board');
const data = response.data;

// Or with .then()
axios.get('/board').then(response => {
    setBoards(response.data);
});
```

**Routing:**
```javascript
// Using react-router-dom v6
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

<Routes>
    <Route path="/" element={<BoardList />} />
    <Route path="/board/:id" element={<BoardDetail />} />
</Routes>
```

### Comments
- Mix of **Korean** and **English** comments throughout codebase
- Korean comments typically for UI/business logic descriptions
- English comments for technical details

---

## API Documentation

### Base URL
- Development: `http://localhost:8080`
- All endpoints return JSON

### Endpoints

#### 1. Get All Boards
```
GET /board
```
**Response:**
```json
[
    {
        "id": 1,
        "title": "Example Title",
        "author": "Author Name",
        "content": "Post content...",
        "regDate": "2025-11-17T10:30:00",
        "updateDate": "2025-11-17T10:30:00"
    }
]
```

#### 2. Get Board by ID
```
GET /board/{id}
```
**Parameters:**
- `id` (path) - Board ID (Long)

**Response:**
```json
{
    "id": 1,
    "title": "Example Title",
    "author": "Author Name",
    "content": "Post content...",
    "regDate": "2025-11-17T10:30:00",
    "updateDate": "2025-11-17T10:30:00"
}
```

**Error:** Returns 500 with RuntimeException if not found

#### 3. Create Board
```
POST /board
Content-Type: application/json
```
**Request Body:**
```json
{
    "title": "New Post Title",
    "author": "Author Name",
    "content": "Post content..."
}
```

**Response:** Created Board object (201 status could be added)

#### 4. Update Board
```
PUT /board/{id}
Content-Type: application/json
```
**Parameters:**
- `id` (path) - Board ID to update

**Request Body:**
```json
{
    "title": "Updated Title",
    "author": "Updated Author",
    "content": "Updated content..."
}
```

**Response:** Updated Board object
**Note:** Uses JPA Dirty Checking, updateDate automatically updated

#### 5. Delete Board
```
DELETE /board/{id}
```
**Parameters:**
- `id` (path) - Board ID to delete

**Response:** 200 OK (no content)

#### 6. Test Endpoint (React Integration)
```
POST /testData
```
**Response:**
```json
{
    "status": "OK",
    "message": "Test data"
}
```

---

## Database Schema

### Table: BOARD

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PRIMARY KEY, AUTO_INCREMENT | Unique identifier |
| title | VARCHAR | | Post title |
| author | VARCHAR | | Author name |
| content | VARCHAR/CLOB | | Post content |
| reg_date | TIMESTAMP | AUTO (CreationTimestamp) | Creation timestamp |
| update_date | TIMESTAMP | AUTO (UpdateTimestamp) | Last update timestamp |

### Database Configuration
```properties
# application.properties
spring.application.name=simple-borad
spring.datasource.url=jdbc:h2:tcp://localhost/~/board
spring.datasource.username=sa
spring.datasource.password=1111
spring.datasource.driver-class-name=org.h2.Driver
spring.jpa.hibernate.ddl-auto=update
spring.h2.console.enabled=true
```

**H2 Console Access:**
1. Navigate to `http://localhost:8080/h2-console`
2. JDBC URL: `jdbc:h2:tcp://localhost/~/board`
3. Username: `sa`
4. Password: `1111`

**Schema Management:**
- Auto-created/updated via `hibernate.ddl-auto=update`
- No migration scripts (Flyway/Liquibase not configured)
- Schema changes apply automatically on entity modifications

---

## Common Tasks

### Adding a New API Endpoint

1. **Add method to `BoardController.java`:**
```java
@GetMapping("/board/search")
public List<Board> searchBoards(@RequestParam String keyword) {
    return boardService.searchBoards(keyword);
}
```

2. **Add service method to `BoardService.java`:**
```java
public List<Board> searchBoards(String keyword) {
    return boardRepository.findByTitleContaining(keyword);
}
```

3. **Add repository method to `BoardRepository.java`:**
```java
List<Board> findByTitleContaining(String keyword);
```

4. **Test endpoint:** `curl http://localhost:8080/board/search?keyword=test`

### Adding a New React Component

1. **Create component file:**
```bash
cd src/main/react-app/src/components
touch NewComponent.js
```

2. **Implement component:**
```javascript
import React from 'react';

function NewComponent() {
    return <div>New Component</div>;
}

export default NewComponent;
```

3. **Add route in `Board.js`:**
```javascript
<Route path="/new" element={<NewComponent />} />
```

4. **Add navigation link:**
```javascript
<Link to="/new">New Page</Link>
```

### Adding a Database Field

1. **Update `Board.java` entity:**
```java
@Column(name = "view_count")
private Long viewCount = 0L;
```

2. **Restart application** - Hibernate auto-updates schema

3. **Update API responses** - Field automatically included in JSON

4. **Update React components** to display new field

### Running Tests

**Backend:**
```bash
./gradlew test
# or
./gradlew clean test --info
```

**Frontend:**
```bash
cd src/main/react-app
npm test
```

### Building for Production

**Backend only:**
```bash
./gradlew clean build
# Output: build/libs/simple-borad-0.0.1-SNAPSHOT.jar
```

**Frontend only:**
```bash
cd src/main/react-app
npm run build
# Output: build/ directory with optimized static files
```

**Full-stack (when React build tasks are enabled):**
```bash
./gradlew clean build
# Would bundle React build into JAR resources
```

---

## Known Issues & Considerations

### Critical Issues

1. **Package Name Typo**
   - Directory: `reposistory/` should be `repository/`
   - Package: `com.board.simpleborad` contains "borad" typo
   - **Impact:** Inconsistent naming, not a functional issue
   - **Fix:** Requires refactoring package names and imports

2. **Security Vulnerabilities**
   - No authentication/authorization implemented
   - Database credentials hardcoded in plaintext
   - H2 console exposed without authentication
   - **Recommendation:** Add Spring Security, environment variables for credentials

3. **Error Handling**
   - Basic `RuntimeException` thrown on errors
   - No proper HTTP status codes (404, 400, etc.)
   - No validation on API inputs
   - **Recommendation:** Add `@ControllerAdvice` for global exception handling

4. **CORS Configuration**
   - Not explicitly configured
   - May cause issues in production deployments
   - Currently works due to proxy in development
   - **Recommendation:** Add `@CrossOrigin` or CORS configuration

### Development Considerations

1. **React Build Integration**
   - Build tasks commented out in `build.gradle`
   - Frontend and backend must be deployed separately
   - **Action Required:** Uncomment lines 38-77 in `build.gradle` for production builds

2. **Database Setup**
   - H2 TCP mode requires H2 server running separately
   - Data persists in `~/board` file
   - MariaDB driver present but not configured
   - **Recommendation:** Document H2 server startup or switch to embedded mode for development

3. **Testing Coverage**
   - Minimal test coverage (only context load test)
   - No integration tests for API endpoints
   - No React component tests implemented
   - **Recommendation:** Add comprehensive test suites

4. **Dependency Versions**
   - Spring Boot 2.6.2 (consider upgrading to 3.x)
   - Java 8 (consider upgrading to Java 17 LTS)
   - Some dependencies may have security vulnerabilities
   - **Recommendation:** Regular dependency updates

### Code Quality Issues

1. **No Input Validation**
   - API endpoints don't validate request bodies
   - No null checks on required fields
   - **Recommendation:** Add `@Valid` and Bean Validation annotations

2. **Transaction Management**
   - Implicit transaction boundaries
   - No explicit `@Transactional` annotations
   - **Recommendation:** Add explicit transaction management

3. **Logging**
   - No logging framework configured
   - No request/response logging
   - **Recommendation:** Add SLF4J with Logback

4. **Code Comments**
   - Mix of Korean and English
   - Inconsistent commenting style
   - **Recommendation:** Establish consistent documentation standards

---

## Testing

### Backend Testing

**Test Framework:** JUnit 5 (Jupiter) with Spring Boot Test

**Current Tests:**
- `SimpleBoradApplicationTests.java` - Basic context load test only

**Test Execution:**
```bash
./gradlew test
./gradlew test --info  # Verbose output
./gradlew clean test   # Clean build before testing
```

**Adding Tests:**
```java
@SpringBootTest
class BoardServiceTest {

    @Autowired
    private BoardService boardService;

    @Test
    void testGetAllBoards() {
        List<Board> boards = boardService.getAllBoardModel();
        assertNotNull(boards);
    }
}
```

### Frontend Testing

**Test Framework:** Jest + React Testing Library

**Current Tests:**
- `App.test.js` - Basic render test

**Test Execution:**
```bash
cd src/main/react-app
npm test              # Interactive watch mode
npm test -- --coverage  # With coverage report
```

**Adding Tests:**
```javascript
import { render, screen } from '@testing-library/react';
import BoardList from './components/BoardList';

test('renders board list', () => {
    render(<BoardList />);
    const element = screen.getByText(/Board List/i);
    expect(element).toBeInTheDocument();
});
```

---

## Git Workflow

### Branch Strategy
- **Main Branch:** `main` (or `master`)
- **Feature Branches:** `claude/*` prefix for AI-assisted development
- **Current Branch:** `claude/claude-md-mi2ehsvvrozs5u9u-01RTaNzdiaGNJDUChdmXgCgZ`

### Commit Message Format
- Korean and English mixed
- Examples from history:
  - `ADD: 게시판 상세화면 컴포넌트 개발(BoardDetail.js)`
  - `FIX: BoardController 어노테이션 @RestController로 변경`
  - `feat: React 게시판 메인화면 추가`

### Git Commands
```bash
# Check status
git status

# Create feature branch
git checkout -b feature/your-feature

# Commit changes
git add .
git commit -m "ADD: descriptive message"

# Push to remote
git push -u origin branch-name
```

---

## Quick Reference

### Essential Commands

```bash
# Backend
./gradlew bootRun              # Run Spring Boot app
./gradlew build                # Build JAR
./gradlew test                 # Run tests
./gradlew clean                # Clean build directory

# Frontend
cd src/main/react-app
npm install                    # Install dependencies
npm start                      # Start dev server
npm run build                  # Production build
npm test                       # Run tests

# Database
# H2 Console: http://localhost:8080/h2-console
# JDBC URL: jdbc:h2:tcp://localhost/~/board
# User: sa, Password: 1111
```

### Key URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend Dev | http://localhost:3000 | React development server |
| Backend API | http://localhost:8080 | Spring Boot REST API |
| H2 Console | http://localhost:8080/h2-console | Database admin interface |
| API Docs | N/A | No Swagger/OpenAPI configured |

---

## For AI Assistants

### Working with This Codebase

**When asked to add features:**
1. Identify the layer (Controller > Service > Repository)
2. Follow existing patterns (Lombok annotations, REST conventions)
3. Update all layers consistently
4. Consider adding corresponding React components
5. Test endpoints manually (no automated tests currently)

**When debugging:**
1. Check H2 console for database state
2. Verify API responses using browser/curl
3. Check browser console for React errors
4. Verify proxy configuration in package.json

**When refactoring:**
1. Be aware of package name typos (reposistory, simpleborad)
2. Maintain consistency with existing code style
3. Update both backend and frontend if changing API contracts
4. Consider adding tests for new functionality

**Code Style Preferences:**
- Use Lombok annotations to reduce boilerplate
- Follow Spring Boot best practices
- Use React Hooks (not class components)
- Keep components small and focused
- Add comments in Korean for business logic (following existing pattern)

**Important Files to Understand:**
- `SimpleBoradApplication.java` - Application entry point
- `BoardController.java` - API endpoints
- `Board.java` - Data model
- `Board.js` - React routing
- `application.properties` - Backend configuration
- `package.json` - Frontend configuration and proxy

---

**End of CLAUDE.md**

This documentation is maintained for AI assistants working with this codebase. Update this file when significant architectural changes occur.
