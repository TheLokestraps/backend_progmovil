/* eslint-disable import/no-unresolved */
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

import require from './module-utils.js';

const serviceAccount = require('./firebase-service-account-key');

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export default db;
