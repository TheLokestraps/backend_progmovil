import db from '../../firebase.config.js';
import { VEHICLES_COLLECTION } from '../constant/collections.js';
import HttpException from '../exceptions/HttpException.js';

const VehiclesService = () => {
  const VehiclesRef = db.collection(VEHICLES_COLLECTION);

  const findAllVehicles = async () => {
    const queryVehicles = await VehiclesRef.get();
    const Vehicles = queryVehicles.docs.map((Vehicle) => ({ id: Vehicle.id, ...Vehicle.data() }));

    return Vehicles;
  };

  const findAllVehiclesByUserId = async (userId) => {
    const queryVehicles = await VehiclesRef.where('userId', '==', userId).get();
    const Vehicles = queryVehicles.docs.map((Vehicle) => ({ id: Vehicle.id, ...Vehicle.data() }));
    return Vehicles;
  };

  const findVehicleByRegistration = async (registration) => {
    if (!registration) throw new HttpException(400, 'Registration not available.');

    const findVehicle = await VehiclesRef.where('registration', '==', registration).get();
    if (!findVehicle.exists) throw new HttpException(409, "Isn't a Vehicle.");

    return { id: findVehicle.id, ...findVehicle.data() };
  };

  const createVehicle = async (Vehicle) => {
    if (!Vehicle) throw new HttpException(400, 'Vehicle data not available.');

    const registeredVehicle = await VehiclesRef.where('registration', '==', Vehicle.registration).get();

    if (registeredVehicle.docs.length > 0) throw new HttpException(409, 'Vehicle already registered.');

    const createVehicleData = await (await VehiclesRef.add({ ...Vehicle })).get();
    return { id: createVehicleData.id, ...createVehicleData.data() };
  };

  const updateVehicle = async (VehicleId, Vehicle) => {
    if (!Vehicle) throw new HttpException(400, 'Vehicle data not available.');

    /* TODO: unique Vehicle validation. i.e.
    if (Vehicle.value && Vehicle.userId) {
      const findVehicle = await VehiclesRef
        .where('value', '==', Vehicle.value)
        .where('userId', '==', Vehicle.userId)
        .get();
      if (findVehicle.empty) throw new HttpException(409, "This Vehicle doesn't exists.");
    }
    */

    const updateVehicleById = await VehiclesRef.doc(VehicleId).update({ ...Vehicle });
    if (!updateVehicleById) throw new HttpException(409, 'Update not available now, try later.');

    const updatedVehicle = await VehiclesRef.doc(VehicleId).get();

    return { id: updatedVehicle.id, ...updatedVehicle.data() };
  };

  const deleteVehicle = async (VehicleId) => {
    const deleteVehicleById = await VehiclesRef.doc(VehicleId).delete();
    if (!deleteVehicleById) throw new HttpException(409, 'Delete not available now, try later.');

    return deleteVehicleById;
  };

  return {
    createVehicle,
    deleteVehicle,
    findAllVehicles,
    findVehicleByRegistration,
    findAllVehiclesByUserId,
    updateVehicle,
  };
};

export default VehiclesService;
