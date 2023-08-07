import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import config from '../config';

export const app = initializeApp(config.firebase);

export const auth = getAuth(app);

export const database = getDatabase(app);

export const firestore = getFirestore(app);
