import { checkPointService } from "../services/checkPointService.js";

export const addCheckPoint = (req, res) => {
    try {
      const newCheckPoint = checkPointService.addCheckPoint(req.body);
      res.status(201).json(newCheckPoint);
    }
    catch (error) {
      res.status(400).send("Check Point could not be added");
    }
};

export const getAllCheckPoints = (req, res) => {
  try {
    let checkPoints;
    const { id } = req.params;  
    if (id){
      checkPoints = checkPointService.getSpecificCheckPoint(id);
    } else {
      checkPoints = checkPointService.getAllCheckPoints();
    }
    res.status(201).json(checkPoints);
  } catch (error) {
    res.status(400).send("Invalid request!");
  }
};


export const deleteCheckPoint = (req, res) => {
  try {
      const { id } = req.params;
      checkPointService.deleteCheckPoint(id);
      res.status(201).json({ message: "Check Point deleted successfully" });
    } catch (error) {
      res.status(400).send("Invalid request!");
    }
};

export const patchCheckPoint = (req, res) => {
    try {
      const { id } = req.params;
      checkPointService.patchCheckPoint(id,req.body);
      res.status(201).json({ message: "Check Point updated successfully" });
    } catch (error) {
      res.status(400).send("Invalid request!");
    }
};
