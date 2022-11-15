import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import require from './module-utils.js';

const serviceAccount = require('./firebase-service-account-key.json');

initializeApp({
  credential: cert(serviceAccount )
});

const db = getFirestore();

export default db;
