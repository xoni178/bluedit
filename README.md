# Bluedit (Laravel & ReactJS Web App)

Bluedit is a Reddit-like web application built with Laravel and ReactJS. It allows users to browse and interact with posts, create accounts, and engage in community discussions.

---

## Features
- **View Posts**: Browse images, videos, and text-based posts.
- **User Authentication**: Personal token-based authentication for secure login and account management.
- **Create Posts**: Users can create and share content.
- **Community Creation**: Ability to create and manage communities.
- **Comments & Discussions**: Engage in discussions by commenting on posts.
- **Voting System**: Upvote and downvote posts and comments to influence visibility.

## Screenshots & GIFs
> *(Replace with actual image & GIF paths)*

| Home Page | Post View | Community Page |
|-----------|----------|---------------|
| ![Home](path/to/home-image.gif) | ![Post](path/to/post-image.gif) | ![Community](path/to/community-image.gif) |

## Technologies Used
- **Backend:** Laravel 11
- **Frontend:** ReactJS
- **Authentication:** Personal Token-based Authentication
- **Database:** MySQL
- **Storage:** AWS S3 / Local Storage for media uploads

## Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/bluedit.git
   ```
2. **Mysql databse setup**
   ```sh
   CREATE DATABASE bluedit;
   ```
2. **Backend Setup:**
   ```sh
   cd backend
   composer install
   cp .env.example .env
   (On .env file): DB_USERNAME=(write your mysql username)
   (On .env file): DB_PASSWORD=(write your mysql user password)
   php artisan key:generate
   php artisan migrate --seed
   php artisan serve
   ```
3. **Frontend Setup:**
   ```sh
   cd frontend
   npm install
   npm start
   ```

## Roadmap
- [ ] Add real-time notifications
- [ ] Implement private messaging system
- [ ] Enhance moderation tools for communities

## Contributing
Contributions are welcome! Feel free to **fork** the repo and submit pull requests.

## License
This project is licensed under the **MIT License**.

---
