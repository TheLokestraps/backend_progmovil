import VehiclesService from '../services/vehicle.js';

const VehicleController = () => {
  const vehiclesService = VehiclesService();

  const getVehicles = async (_req, res, next) => {
    try {
      const findAllvehiclesData = await vehiclesService.findAllvehicles();

      res.status(200).json({ data: findAllvehiclesData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  const getVehicleByRegistration = async (req, res, next) => {
    try {
      const { registration } = req.body;
      const findvehicleData = await vehiclesService.getvehicleByRegistration(registration);

      res.status(200).json({ data: findvehicleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const getVehicleByUserId = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const findvehicleData = await vehiclesService.findvehicleByUserId(userId);

      res.status(200).json({ data: findvehicleData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  const createVehicle = async (req, res, next) => {
    try {
      const vehicleData = req.body;
      const createvehicleData = await vehiclesService.createvehicle(vehicleData);

      res.status(201).json({ data: createvehicleData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  const updateVehicle = async (req, res, next) => {
    try {
      const vehicleId = req.params.id;
      const vehicleData = req.body;
      const updatevehicleData = await vehiclesService.updatevehicle(vehicleId, vehicleData);

      res.status(200).json({ data: updatevehicleData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  const deleteVehicle = async (req, res, next) => {
    try {
      const vehicleId = req.params.id;
      const deletevehicleData = await vehiclesService.deletevehicle(vehicleId);

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
    updateVehicle,
    getVehicleByUserId,
  };
};

export default VehicleController;
