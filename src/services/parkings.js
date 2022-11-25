import VehiclesService from './vehicle.js';
import db from '../../firebase.config.js';
import { PARKINGS_COLLECTION } from '../constant/collections.js';
import HttpException from '../exceptions/HttpException.js';

const ParkingsService = () => {
  const parkingsRef = db.collection(PARKINGS_COLLECTION);
  const vehiclesService = VehiclesService();

  const findAllParkings = async () => {
    const queryParkings = await parkingsRef.get();
    const parkings = queryParkings.docs.map((parking) => ({ id: parking.id, ...parking.data() }));

    return parkings;
  };

  const findParkingById = async (parkingId) => {
    if (!parkingId) throw new HttpException(400, 'ParkingId not available.');

    const findParking = await parkingsRef.doc(parkingId).get();
    if (!findParking.exists) throw new HttpException(409, "Isn't a parking.");

    return { id: findParking.id, ...findParking.data() };
  };

  const addVehicleToParking = async (parkingId, vehicleId) => {
    if (!parkingId) throw new HttpException(400, 'ParkingId not available.');
    if (!vehicleId) throw new HttpException(400, 'VehicleId not available.');

    const parking = await findParkingById(parkingId);
    if (!parking) throw new HttpException(409, "Isn't a parking.");

    const vehicle = await vehiclesService.findVehicleByRegistration(vehicleId);
    if (!vehicle) throw new HttpException(409, "Isn't a vehicle.");

    // eslint-disable-next-line max-len
    if (parking.vehicles.length >= parking.maxParking) throw new HttpException(409, 'Parking is full.');

    if (parking.vehicles.includes(vehicleId)) throw new HttpException(409, 'Vehicle already in parking.');

    const updateParkingById = await parkingsRef.doc(parkingId)
      .update({ vehicles: [...parking.vehicles, vehicleId] });

    if (!updateParkingById) throw new HttpException(409, 'Update not available now, try later.');

    const updatedParking = await parkingsRef.doc(parkingId).get();

    return { id: updatedParking.id, ...updatedParking.data() };
  };

  const createParking = async (parkingData) => {
    if (!parkingData) throw new HttpException(400, 'Parking data not available.');

    /* TODO: unique parking validation. i.e.
    const findParking = await parkingsRef
      .where('lat', '==', parkingData.lat)
      .where('lng', '==', parkingData.lng)
      .get();
      if (!findParking.empty)
        throw new HttpException(409, `This parking already exists.`);
    */

    const createParkingData = await (await parkingsRef.add({ ...parkingData })).get();

    return { id: createParkingData.id, ...createParkingData.data() };
  };

  const updateParking = async (parkingId, parkingData) => {
    if (!parkingData) throw new HttpException(400, 'Parking data not available.');

    /* TODO: unique parking validation. i.e.
    if (parkingData.lat && parkingData.lng) {
      const findParking = await parkingsRef
        .where('lat', '==', parkingData.lat)
        .where('lng', '==', parkingData.lng)
        .get();
      if (findParking.empty) throw new HttpException(409, "This parking doesn't exists.");
    }
    */

    const updateParkingById = await parkingsRef.doc(parkingId).update({ ...parkingData });
    if (!updateParkingById) throw new HttpException(409, 'Update not available now, try later.');

    const updatedParking = await parkingsRef.doc(parkingId).get();

    return { id: updatedParking.id, ...updatedParking.data() };
  };

  const deleteParking = async (parkingId) => {
    const deleteParkingById = await parkingsRef.doc(parkingId).delete();
    if (!deleteParkingById) throw new HttpException(409, 'Delete not available now, try later.');

    return deleteParkingById;
  };

  const deleteVehicleFromParking = async (parkingId, vehicleId) => {
    if (!parkingId) throw new HttpException(400, 'ParkingId not available.');
    if (!vehicleId) throw new HttpException(400, 'VehicleId not available.');

    const parking = await findParkingById(parkingId);
    if (!parking) throw new HttpException(409, "Isn't a parking.");

    const vehicle = await vehiclesService.findVehicleByRegistration(vehicleId);
    if (!vehicle) throw new HttpException(409, "Isn't a vehicle.");

    const updated = await parkingsRef.doc(parkingId)
      .update({ vehicles: parking.vehicles.filter((v) => v !== vehicleId) });

    if (!updated) throw new HttpException(409, 'Update not available now, try later.');

    const updatedParking = await parkingsRef.doc(parkingId).get();

    return { id: updatedParking.id, ...updatedParking.data() };
  };

  return {
    createParking,
    deleteParking,
    addVehicleToParking,
    findAllParkings,
    findParkingById,
    updateParking,
    deleteVehicleFromParking,
  };
};

export default ParkingsService;
