import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

export const firestoreTimestampSchema = z.instanceof(Timestamp);
