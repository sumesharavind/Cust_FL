import express from "express";
const Services_API = express.Router();
import Services from "../../models/Services_Model.js";

Services_API.post("/create", async (req, res) => {
  try {
    const services = await Services.create(req.body);
    res.status(201).json({
      message: "Services data create d successfully",
      data: services,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Services_API.get("/read", async (req, res) => {
  try {
    const services = await Services.findAll();
    res.json({
      message: "Services data retrieved successfully",
      data: services,
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Services_API.get("/read/:ServiceName", async (req, res) => {
  try {
    const serviceName = req.params.ServiceName;
    const services = await Services.findOne({
      where: { ServiceName: serviceName },
    });

    if (services) {
      res.json({
        message: "Services data retrieved successfully",
        data: services,
      });
    } else {
      res.status(404).json({ error: "Service Name not found" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Services_API.put("/update/:ServiceName", async (req, res) => {
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

Services_API.delete("/delete/:ServiceName", async (req, res) => {
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

export default Services_API;
