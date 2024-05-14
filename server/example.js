import express from 'express';
import Services from '../../models/Services_Model.js';

const bodyParser = require('body-parser');
const mysql = require('mysql2');
 
const app = express();
 
// Middleware
app.use(bodyParser.json());
 
// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'S@avic',
  database: 'customerservice_cp',
});
 
// Backend endpoint to handle saving options
app.post('/saveOptions', (req, res) => {
  const { options } = req.body;
  connection.query('INSERT INTO options (option_value) VALUES ?', [options.map(option => [option])], (error, results) => {
    if (error) {
      console.error('Error saving options to MySQL:', error);
      res.status(500).json({ error: 'Failed to save options' });
    } else {
      console.log('Options saved to MySQL successfully');
      res.status(200).json({ message: 'Options saved successfully' });
    }
  });
});
 
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});