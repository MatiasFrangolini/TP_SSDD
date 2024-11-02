import {
  getCheckPoints as getCheckPoints,
  writeCheckPoints as writeCheckPoints,
} from "../repositories/checkPointRepository.js";
import { v4 as uuidv4 } from "uuid";

export const checkPointService = {
  addCheckPoint: (checkPointData) => {
    if (
      !checkPointData.lat ||
      !checkPointData.lng ||
      !checkPointData.description
    ) {
      throw new Error("Invalid data");
    }
    const existingCheckPoints = getCheckPoints();

    const newCheckPoint = {
      uid: uuidv4(),
      lat: checkPointData.lat,
      lng: checkPointData.lng,
      description: checkPointData.description,
    };
    console.log(newCheckPoint);
    existingCheckPoints.push(newCheckPoint);
    writeCheckPoints(existingCheckPoints);

    return newCheckPoint;
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

  deleteCheckPoint: (uid) => {
    const existingCheckPoints = getCheckPoints();
    const updatedCheckPoints = existingCheckPoints.filter(
      (checkPoints) => checkPoints.uid !== uid
    );

    if (existingCheckPoints.length === updatedCheckPoints.length) {
      throw new Error("Checkpoint not found");
    }

    writeCheckPoints(updatedCheckPoints);
  },
};
