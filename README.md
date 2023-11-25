# Customer Data REST API

This project is a simple Node.js RESTful API for managing customer data.

## Getting Started

### Installation

1. **Clone the repository:**

   git clone <https://github.com/girish-97/customersDataAPIs>
## Running the Server

To run the server locally, follow these steps:

1. **Ensure project dependencies are installed:**

   If you haven't installed project dependencies yet, navigate to the project directory and run:

   ```bash
   npm install
2. **Running the Server**
   ```bash
   npm start


## API Endpoints

### List Customers

- **GET** `/customers`

  Get a list of customers with pagination and search functionalities.

  **Query Parameters:**
  - `first_name`: Filter by customer's first name.
  - `last_name`: Filter by customer's last name.
  - `city`: Filter by customer's city.
  - `page`: Pagination - specify the page number (default: 1).
  - `limit`: Pagination - specify the number of results per page (default: 10).

### Get Single Customer

- **GET** `/customers/:id`

  Get data for a single customer by their ID.

### Unique Cities with Customer Counts

- **GET** `/unique-cities`

  Get a list of unique cities with the number of customers from each city.

### Add a Customer

- **POST** `/customers`

  Add a new customer with required validations for existing city and company.

  **Request Body:**
  ```json
  {
    "id": 4,
    "first_name": "New",
    "last_name": "Customer",
    "city": "ExistingCity",
    "company": "ExistingCompany"
  }
