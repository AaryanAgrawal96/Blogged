# Blogged

**Blogged** is a dedicated blogging platform designed for literary enthusiasts to share their written work. While currently focusing on core blogging functionality, the platform is evolving to include specialized features tailored specifically for poets, essayists, and storytellers.

---

## 🚀 Live Demo
The application is currently deployed on AWS Elastic Beanstalk:
**[View Blogged Live](http://blogged-env.eba-g23rp5yu.ap-south-1.elasticbeanstalk.com/)**

> **Note:** The site currently uses HTTP due to domain constraints. For the best experience, please ensure your browser allows non-HTTPS connections for this specific URL.

---

## ✨ Features
* **Secure Authentication:** Implemented JWT (JSON Web Tokens) stored in cookies.
* **Role-Based Access:** * *Guests:* Can browse and read blogs and comments.
    * *Logged-in Users:* Can create original blogs and participate in the comment section.
* **Full Blog Lifecycle:** Users can create, read, and view detailed blog posts.
* **Interactive Comments:** Community engagement through a structured comment system.
* **Server-Side Rendering (SSR):** Powered by EJS for efficient page delivery.
* **Responsive Design:** Styled with Bootstrap for a clean, mobile-friendly interface.
* **RESTful Architecture:** Clean and organized API endpoints.

---

## 🛠 Tech Stack
* **Backend:** Node.js, Express.js
* **Frontend:** EJS (Embedded JavaScript templates), Bootstrap
* **Database:** MongoDB Atlas (Cloud)
* **Deployment:** AWS Elastic Beanstalk
* **API Testing:** Postman

---

## 📂 API Endpoints

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | Home page / List all blogs | Public |
| `GET` | `/user/signup` | Signup page | Public |
| `POST` | `/user/signup` | Register a new user | Public |
| `POST` | `/user/signin` | Authenticate user | Public |
| `GET` | `/blog/add-new` | Form to create a blog | Private (Auth) |
| `POST` | `/blog` | Submit a new blog | Private (Auth) |
| `GET` | `/blog/:id` | View a specific blog & comments | Public |
| `POST` | `/blog/comment/:blogId` | Post a comment | Private (Auth) |

---

## 💻 Getting Started

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn
* MongoDB Atlas Account

### Local Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AaryanAgrawal96/blogged.git](https://github.com/AaryanAgrawal96/blogged.git)
    cd blogged
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your credentials:
    ```env
    PORT=8000
    MONGO_URL=your_mongodb_atlas_connection_string
    JWT_SECRET=your_random_secret_key
    ```

4.  **Run the application:**
    ```bash
    npm start
    ```
    The server will start at `http://localhost:8000`.

---

## 📈 Future Improvements
- [ ] **Custom UI:** Tailor the aesthetic specifically for literary readers and writers.
- [ ] **Search Functionality:** Implement a search bar for blogs and authors.
- [ ] **Engagement Features:** Add "Like" and "Share" capabilities.
- [ ] **Literary Bifurcation:** Add tags (Poem, Story, Essay, Haiku) and store them in the DB for filtered querying.
- [ ] **Security:** Transition from HTTP to HTTPS.

---

## 👤 Author
**Aaryan Agrawal**
* CSE Undergraduate at **IIT Jodhpur**

---

## 📄 License
This project is licensed under the MIT License.