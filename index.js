const express = require('express');
const bodyParser = require('body-parser');
const customers = require('./customers.json'); 

const app = express();
app.use(bodyParser.json());




//List API with search and pagination
app.get('/customers', (req, res) => {
  const { first_name, last_name, city, page = 1, limit = 10 } = req.query;
  let results = customers;

  if (first_name) {
    results = results.filter(customer => customer.first_name.toLowerCase().includes(first_name.toLowerCase()));
  }
  if (last_name) {
    results = results.filter(customer => customer.last_name.toLowerCase().includes(last_name.toLowerCase()));
  }
  if (city) {
    results = results.filter(customer => customer.city.toLowerCase() === city.toLowerCase());
  }

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedResults = results.slice(startIndex, endIndex);

  res.json(paginatedResults);
});


//API to get single customer data by its id
app.get('/customers/:id', (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find(customer => customer.id === customerId);

  if (!customer) {
    res.status(404).send('Customer not found');
  } else {
    res.json(customer);
  }
});


// API to list all unique cities with the number of customers
app.get('/uniqueCities', (req, res) => {
  const cities = {};
  
  customers.forEach(c => {
    if(cities[c.city]) {
      cities[c.city]++;
    } else {
      cities[c.city] = 1;
    }
  });
  
  res.json(cities); 
});

// API to add a customer with validations

app.post('/customers', (req, res) => {
  const {first_name, last_name, city, company} = req.body;

  if(!first_name || !last_name || !city || !company) {
    return res.status(400).send('All fields are required');
  }

  const existingCity = customers.some(c => c.city === city); 
  const existingCompany = customers.some(c => c.company === company);

  if(!existingCity || !existingCompany) {
    return res.status(400).send('City should exist'); 
  }

  if(!existingCompany) {
    return res.status(400).send('Company should exist'); 
  }

  const newCustomer = {
    id: customers.length + 1,
    first_name,
    last_name,
    city,
    company
  };

  customers.push(newCustomer);

  res.status(201).json(newCustomer);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
