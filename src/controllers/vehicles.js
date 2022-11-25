import VehiclesService from '../services/vehicle.js';

const VehicleController = () => {
  const vehiclesService = VehiclesService();

  const getVehicles = async (_req, res, next) => {
    try {
      const findAllvehiclesData = await vehiclesService.findAllVehicles();

      res.status(200).json({ data: findAllvehiclesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const getVehicleByRegistration = async (req, res, next) => {
    try {
      const { registration } = req.params;
      const findvehicleData = await vehiclesService.findVehicleByRegistration(registration);

      res.status(200).json({ data: findvehicleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const getAllVehicleByUserId = async (req, res, next) => {
    try {
      const { email } = req.body;
      const findvehicleData = await vehiclesService.findAllVehiclesByUserId(email);

      res.status(200).json({ data: findvehicleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const createVehicle = async (req, res, next) => {
    try {
      const vehicleData = req.body;
      const createvehicleData = await vehiclesService.createVehicle(vehicleData);

      res.status(201).json({ data: createvehicleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  const getVehicleById = async (req, res, next) => {
    try {
      const vehicleId = req.params.id;
      const findUserData = await vehiclesService.findVehicleById(vehicleId);

      res.status(200).json({ data: findUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const updateVehicle = async (req, res, next) => {
    try {
      const vehicleId = req.params.id;
      const vehicleData = req.body;
      const updatevehicleData = await vehiclesService.updateVehicle(vehicleId, vehicleData);

      res.status(200).json({ data: updatevehicleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deleteVehicle = async (req, res, next) => {
    try {
      const vehicleId = req.params.id;
      const deletevehicleData = await vehiclesService.deleteVehicle(vehicleId);

      res.status(200).json({ data: deletevehicleData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  return {
    createVehicle,
    deleteVehicle,
    getVehicleByRegistration,
    getVehicles,
    getVehicleById,
    updateVehicle,
    getAllVehicleByUserId,
  };
};

export default VehicleController;
