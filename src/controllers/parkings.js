import ParkingsService from '../services/parkings.js';

const ParkingsController = () => {
  const parkingsService = ParkingsService();

  const getParkings = async (_req, res, next) => {
    try {
      const findAllParkingsData = await parkingsService.findAllParkings();

      res.status(200).json({ data: findAllParkingsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const getParkingById = async (req, res, next) => {
    try {
      const parkingId = req.params.id;
      const findParkingData = await parkingsService.findParkingById(parkingId);

      res.status(200).json({ data: findParkingData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const createParking = async (req, res, next) => {
    try {
      const parkingData = req.body;
      const createParkingData = await parkingsService.createParking(parkingData);

      res.status(201).json({ data: createParkingData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  const updateParking = async (req, res, next) => {
    try {
      const parkingId = req.params.id;
      const parkingData = req.body;
      const updateParkingData = await parkingsService.updateParking(parkingId, parkingData);

      res.status(200).json({ data: updateParkingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deleteParking = async (req, res, next) => {
    try {
      const parkingId = req.params.id;
      const deleteParkingData = await parkingsService.deleteParking(parkingId);

      res.status(200).json({ data: deleteParkingData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  const addVehicleToParking = async (req, res, next) => {
    try {
      const { parkingId, vehicleId } = req.body;
      const addVehicleToParkingData = await parkingsService
        .addVehicleToParking(parkingId, vehicleId);

      res.status(200).json({ data: addVehicleToParkingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deleteVehicleFromParking = async (req, res, next) => {
    try {
      const { parkingId, vehicleId } = req.body;
      const deleteVehicleFromParkingData = await parkingsService
        .deleteVehicleFromParking(parkingId, vehicleId);

      res.status(200).json({ data: deleteVehicleFromParkingData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  return {
    createParking,
    deleteParking,
    getParkingById,
    getParkings,
    updateParking,
    addVehicleToParking,
    deleteVehicleFromParking,
  };
};

export default ParkingsController;
