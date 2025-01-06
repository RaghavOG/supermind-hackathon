# Social Media Analytics

## Overview
It is a comprehensive engagement analysis platform designed to provide insights into social media interaction patterns. By leveraging advanced tools like **DataStax Astra DB**, **Langflow**, and the **Groq API**, the platform offers seamless data storage, querying, and analytics to enhance user experience.

This project was developed by **Neural Nitwits**, a team of passionate developers:
- Abhishek
- Raghav
- Anubhav
- Anshul


## Key Features
- **Data Storage**:
  - Utilizes **DataStax Astra DB** for efficient and scalable storage and querying of engagement data.
  
- **Integration Workflow**:
  - Implements **Langflow** for streamlined integration of analytics workflows.

- **Analytics API**:
  - Powered by the **Groq - llama.3.1 8b instant**, providing robust querying capabilities for data insights.

- **Dataset**:
  - Supports importing and analyzing the provided `instagram_dataset.csv` for engagement insights.

- **Custom Analytics**:
  - Supports advanced querying and filtering options to customize data analysis.


## Installation and Run
Follow these steps to set up and run the project locally:

### Prerequisites
1. **DataStax Astra DB Account**:
   - Create an account on [DataStax Astra DB](https://www.datastax.com/astra).
   - Set up a new database and note the credentials.
   - Upload the `instagram_dataset.csv` from the repository to your database.

2. **API Keys**:
   - Obtain a **Groq API Key** by signing up at [Groq](https://groq.com).
   - Note the **Langflow API Token** for integration.

3. **Node.js & npm**:
   - Ensure you have [Node.js](https://nodejs.org/) installed on your system.

4. **Next.js**:
   - Set up Next.js for the frontend.

### Steps to Run

#### Clone the Repository
```bash
$ git clone https://github.com/RaghavOG/supermind-hackathon.git
$ cd supermind-hackathon
```

#### Set Up Astra DB
1. Log in to your Astra DB account.
2. Create a database and upload the `instagram_dataset.csv`.
3. Note the **Astra DB API Endpoint** and **Application Token**, and add them to your environment variables.

#### Configure Environment Variables
Create a `.env` file in the root folder and add the following:
```
LANGFLOW_API_TOKEN=""
ABHISHEK_ASTRA_DB_API_ENDPOINT=""
ABHISHEK_ASTRA_DB_APPLICATION_TOKEN=""
```

#### Install Dependencies
```bash
$ npm install
```

#### Run the Application
```bash
$ npm run dev
```

#### Langflow Integration
1. Use the Langflow interface to design and test workflows.
2. Integrate the workflows into the application using the Langflow API.



---
**Contact**: For questions or support, contact [RaghavOG](https://github.com/RaghavOG).
