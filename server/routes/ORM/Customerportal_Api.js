import express from "express";
import Customerportal from "../../models/Customerportal_model.js";
const Customerportal_Api = express.Router();
 
 
 
 
Customerportal_Api.post("/create", async (req, res) => {
  // Expect an ID and an array of services from the request body
  const { ID, ServiceName } = req.body;
 
  // Validate input to ensure that services is an array
  if (!Array.isArray(ServiceName) || ServiceName.length === 0) {
      return res.status(400).json({ error: "Services must be a non-empty array." });
  }
 
  try {
      // Map each service name to an object suitable for database insertion
      const entries = ServiceName.map(serviceName => ({
          ID, // Same ID for all entries
          ServiceName: serviceName
      }));
 
      // Use Sequelize’s bulkCreate to insert all entries at once
      const createdEntries = await Customerportal.bulkCreate(entries);
      res.status(201).json({
          message: "ServiceName data created successfully",
          data: createdEntries
      });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
});
 
 
 
 
Customerportal_Api.get("/read", async (req, res) => {
  try {
    const customer = await Customerportal.findAll();
    res.json({
      message: "Services data retrieved successfully",
      data: customer,  
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
Customerportal_Api.get("/read/:ServiceName", async (req, res) => {
  try {
    const serviceName = req.params.ServiceName;
    const customer = await Services.findOne({
      where: { ServiceName: serviceName },
    });
 
    if (customer) {
      res.json({
        message: "Services data retrieved successfully",
        data: customer,
      });
    } else {
      res.status(404).json({ error: "Service Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
Customerportal_Api.put("/update/:ServiceName", async (req, res) => {
  try {
    const serviceName = req.params.ServiceName;
    const updatedServicename = req.body;
 
    const existingServicename = await Services.findOne({
      where: { ServiceName: serviceName },
    });
 
    if (existingServicename) {
      await existingServicename.update(updatedServicename);
      res.json({
        message: "Services Name updated successfully",
        data: existingServicename,
      });
    } else {
      res.status(404).json({ error: "Service Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
Customerportal_Api.delete("/delete/:ServiceName", async (req, res) => {
  try {
    const serviceName = req.params.ServiceName;
    const deletedServicename = await Services.findOne({
      where: { ServiceName: serviceName },
    });
 
    if (deletedServicename) {
      await deletedServicename.destroy();
      res.json({ message: "Service Name deleted successfully" });
    } else {
      res.status(404).json({ error: "Service Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
 
export default Customerportal_Api;
 
 
 