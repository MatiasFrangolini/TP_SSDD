import {
  getControlPoints,
  writeControlPoints,
} from "../repositories/PuntoControlRepository.js";
import { v4 as uuidv4 } from "uuid";

export const controlPointService = {
  addControlPoint: (controlPointData) => {
    if (
      !controlPointData.lat ||
      !controlPointData.lng ||
      !controlPointData.description
    ) {
      throw new Error("Invalid data");
    }
    const existingControlPoints = getControlPoints();

    const newControlPoint = {
      uid: uuidv4(),
      lat: controlPointData.lat,
      lng: controlPointData.lng,
      description: controlPointData.description,
    };
    console.log(newControlPoint);
    existingControlPoints.push(newControlPoint);
    writeControlPoints(existingControlPoints);

    return newControlPoint;
  },

  getAllControlPoints: () => {
    return getControlPoints();
  },

  deleteControlPoint: (uid) => {
    const existingControlPoints = getControlPoints();
    const updatedControlPoints = existingControlPoints.filter(
      (controlPoints) => controlPoints.uid !== uid
    );

    if (existingControlPoints.length === updatedControlPoints.length) {
      throw new Error("Control point not found");
    }

    writeControlPoints(updatedControlPoints);
  },
};
