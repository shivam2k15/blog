# 🚀 **Blog API**

A RESTful API built with **Node.js, Express, MongoDB**, and **Cloudinary** for handling blog posts.  
Supports **image uploads**, tagging, sorting, pagination, and filtering with validation for **known query parameters**.  
Deployed live at: [**Express Blog API**](https://express-blog-api-kep4.onrender.com/post) 🌐

---

## 🛠️ **Tech Stack**
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ORM)
- **File Upload:** Multer + Cloudinary
- **Hosting:** Render

---

## 🚀 **Live Demo**
- **Base URL:** [https://express-blog-api-kep4.onrender.com/post](https://express-blog-api-kep4.onrender.com/post)

---

## 🔥 **API Endpoints**

### 1️⃣ **Create a New Post**
Uploads an image, creates a blog post with `title`, `description`, and `tags`.

- **Endpoint:** `POST /post`
- **Content-Type:** `multipart/form-data`
- **Required Fields:**
  - `title` → (String) Title of the post.
  - `desc` → (String) Description of the post.
  - `tags` → (Comma-separated string) List of tags for the post.
  - `image` → (File) Image to upload.
- **Response:** 
  - `201 Created` → Returns the newly created post.

### 2️⃣ **Get Posts with Filtering, Sorting, and Pagination**
Retrieves blog posts with support for:

- **Sorting**
- **Pagination**
- **Filtering by keyword or tag**
- **Validation:** Returns `400 Bad Request` if invalid query keys are used. 
- **Endpoint:** `GET /get`
- **Response:** 
  - `200 ok` → Returns all the posts.

## ⚡ **API Design Highlights**

- **Modular Code Structure** → Organized into routes, models, and controllers.
- **Cloudinary Integration** → For image upload and storage.
- **Mongoose Schema Validation** → Ensures data integrity.
- **Error Handling** → Proper error messages for unknown query parameters.
- **Pagination & Sorting** → Supports efficient data retrieval.

