# InclusioMap BCN

Welcome to the InclusioMap BCN repository! InclusioMap BCN is a platform designed to promote educational inclusion and analyze socioeconomic factors in the city of Barcelona. The application combines educational data, digital access insights, employment information, and income distribution to provide a comprehensive view of inequality and inclusion within the city. This repository contains both the frontend (built with Angular and Tailwind CSS) and the backend (built with Node.js, Express.js, and MongoDB) of the project.

## 📑 Table of Contents
1. [Overview](#-overview)
2. [Technologies](#-technologies)
3. [Getting Started](#-getting-started)
4. [Features](#-features)
5. [API Endpoints](#-api-endpoints)
6. [Contributing](#-contributing)
7. [Team](#-team)

## 🧭 Overview
InclusioMap BCN is a data-driven tool that aims to enhance educational inclusivity in Barcelona by utilizing open data. The project uses datasets that include information on educational centers, digital gaps, labor markets, and income distribution across different districts. By combining these datasets, the platform offers users insights into how different factors impact access to education and opportunities.

The backend is responsible for managing and processing data, while the frontend provides an interactive user interface to explore and visualize the data.

## 🛠️ Technologies

### Backend
- **Node.js**: JavaScript runtime environment for building scalable server-side applications.
- **Express.js**: A web framework for Node.js, providing a set of robust features for web applications.
- **MongoDB**: NoSQL database used for managing the application's data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB in Node.js.
- **Knex.js**: SQL query builder (optional if integrated with any SQL-based data sources).

### Frontend
- **Angular**: A platform and framework for building client-side applications using HTML, CSS, and TypeScript.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without leaving your HTML.

## 🚀 Getting Started

### Prerequisites
To run this project locally, you will need:
- Node.js (v16 or higher)
- npm (Node package manager)
- MongoDB (local or cloud instance)

### Backend Setup
1. **Clone the repository**:
    ```bash
   git clone https://github.com/yourusername/inclusiomap-bcn.git
2. **Navigate to the Backend directory**:
    ```bash
    cd inclusiomap-bcn/backend
3. **Install dependencies**:
    ```bash
    npm install
4. **Configure MongoDB**:
Create a .env file at the root of the backend directory and add your MongoDB URI:

MONGO_URI=your_connection_string

5. **Run the backend server**:
    ```bash
    npm install
The backend API will be available at http://localhost:3000.



### Frontend Setup
1. **Navigate to the Frontend directory**:
    ```bash
    cd inclusiomap-bcn/frontend
2. **Install dependencies**:
    ```bash
    npm install
3. **Run the frontend server**:
    ```bash
    ng serve
The frontend application will be available at http://localhost:4200.

## 📄 Features
- **Educational Data**: Analyze data from educational centers (regulated and unregulated) in Barcelona.
- **Digital Access**: Study the digital gap across different districts, including access to technology and devices.
- **Employment Insights**: Analyze the employment status and types of jobs in the districts.
- **Income Data**: Review income distribution and its correlation with education and employment.

## 🌐 API Endpoints

### Districts
- **GET** `/api/districts`: Get all districts.
- **GET** `/api/district/:id`: Get a specific district by ID.
- **POST** `/api/district/create`: Create a new district.
- **PATCH** `/api/district/edit/:id`: Edit a specific district by ID.
- **DELETE** `/api/district/delete/:id`: Delete a specific district by ID.

### Specific District Data
- **GET** `/api/district/:id/digitalGap`: Get data about the digital gap in the district.
- **GET** `/api/district/:id/educationCentre`: Get information about educational centers in the district.
- **GET** `/api/district/:id/employmentSituation`: Get information about the employment situation in the district.
- **GET** `/api/district/:id/incomePerPerson`: Get data about income per person in the district.

## 🤝 Contributing
We welcome contributions! Feel free to fork the project, submit pull requests, or open issues for any bugs or suggestions.

## 🧑‍🤝‍🧑 Team
This project was developed by the InclusioMap BCN team:
- [Claudio](https://github.com/ClaudioMartinH/ClaudioMartinH) - Backend Developer
- [Carol](https://github.com/Calonsogon) - Backend Developer
- [Gonzalo](https://github.com/ghOdisea/ghOdisea) - Backend Developer
- [Ivan](https://github.com/ivanetierra/ivanetierra) - Frontend Developer
- [Miriam](https://github.com/mmartincasas) - Frontend Developer
- [Guifré](https://github.com/guifreribas) - Frontend Developer
- [Silvia](https://github.com/SilviaEzra) - Frontend Developer
- [Harold](https://github.com/haroldavis) - Data Analyst
- [Eva](https://github.com/EvaCamachoM) - Data Analyst
