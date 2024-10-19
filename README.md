# Rule Engine Next.js Application

## Overview

This project is a simple 3-tier rule engine application built with Next.js. It allows users to create, store, and evaluate complex conditional rules based on attributes like age, department, income, and experience. The system uses an Abstract Syntax Tree (AST) to represent and evaluate these rules.

## Features

- Create and store rules with a user-friendly interface
- Evaluate rules against provided data
- RESTful API for rule management and evaluation
- MongoDB integration for data persistence
- Responsive web interface built with React and Tailwind CSS

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB Atlas account (for database)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Harshiths1/Rule_Engine_1.git
   cd Rule_Engine_1
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string_here
   ```

## Usage

To run the development server:

```
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Creating a Rule

1. Navigate to the home page
2. Fill in the "Rule Name", "Description", and "Rule String" fields
3. Click "Add Rule"

Example rule string:
```
((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)
```

### Evaluating a Rule

1. Scroll to the rule you want to evaluate
2. Fill in the input fields (age, department, salary, experience)
3. Click "Evaluate"
4. The result (True or False) will be displayed

## API Routes

- `GET /api/rules`: Fetch all rules
- `POST /api/rules`: Create a new rule
- `PUT /api/rules`: Evaluate a rule

## Project Structure

```
/rule-engine-app
├── /pages
│   ├── /api
│   │   └── rules.js
│   ├── index.js
│   └── _app.js
├── /components
│   ├── RuleForm.js
│   └── RuleList.js
├── /lib
│   ├── ruleEngine.js
│   └── database.js
├── /styles
│   └── globals.css
├── .env.local
├── package.json
└── README.md
```

## License

This project is licensed under the MIT License.
