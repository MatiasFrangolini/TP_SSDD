import { patchCheckPoint } from "../controllers/checkPointController.js";
import {
  getCheckPoints as getCheckPoints,
  writeCheckPoints as writeCheckPoints,
} from "../repositories/checkPointRepository.js";
import { v4 as uuidv4 } from "uuid";

export const checkPointService = {
  addCheckPoint: (checkPointData) => {
    if (
      !checkPointData.id ||
      !checkPointData.lat ||
      !checkPointData.long ||
      !checkPointData.description
    ) {
      throw new Error("Invalid data");
    }
    else{
    var existingCheckPoints = getCheckPoints().data?.checkPoints;
    console.log(existingCheckPoints);
    const newCheckPoint = {
      id: checkPointData.id,
      lat: checkPointData.lat,
      long: checkPointData.long,
      description: checkPointData.description,
    };
    existingCheckPoints.push(newCheckPoint);
    writeCheckPoints(existingCheckPoints);

    return newCheckPoint;
  }
  },

  getAllCheckPoints: () => {
    return getCheckPoints();
  },

  getSpecificCheckPoint: (id) => {
    var ver = 0;
    const arch = getCheckPoints();
    var existingCheckPoints = arch.data.checkPoints;
    var SpecificCheckPoint;
    existingCheckPoints.forEach((checkPoint) => {
      if ((checkPoint.id === id)) {
        ver = 1;
        SpecificCheckPoint = checkPoint;
      }
    });
    if (ver == 0) {
      throw new Error("Animal not found");
    }
    return SpecificCheckPoint;
  },

  deleteCheckPoint: (id) => {
    const arch = getCheckPoints();
    const existingCheckPoints = arch.data.checkPoints;
    const updatedCheckPoints = existingCheckPoints.filter(
      (checkPoints) => checkPoints.id !== id
    );

    if (existingCheckPoints.length === updatedCheckPoints.length) {
      throw new Error("Checkpoint not found");
    }

    writeCheckPoints(updatedCheckPoints);
  },

  patchCheckPoint: (id, checkPointData) => {
    if (!checkPointData.lat && !checkPointData.long && !checkPointData.description){
      throw new Error("Body is empty");
    } else {
    var ver = 0;
    const arch = getCheckPoints();
    var existingCheckPoints = arch.data.checkPoints;
    existingCheckPoints.forEach((checkPoint) => {
      if ((checkPoint.id === id)) {
        ver = 1;
        if (checkPointData.lat)
          checkPoint.lat = checkPointData.lat;
        if (checkPointData.long)
          checkPoint.long = checkPointData.long;
        if (checkPointData.description)
          checkPoint.description = checkPointData.description;
      }
    });
    if (ver == 0) {
      throw new Error("Checkpoint not found");
    }
  }
  writeCheckPoints(existingCheckPoints);
  },
};



