import { firestore } from '@/firebase/app';
import { FirestoreDataConverter, doc, getDoc } from 'firebase/firestore';
import {
  TodayStudyRoomAllocation,
  todayStudyRoomAllocationSchema,
} from '../model/today_study_room_allocation';

const converter: FirestoreDataConverter<TodayStudyRoomAllocation> = {
  fromFirestore: (snapshot) =>
    todayStudyRoomAllocationSchema.parse(snapshot.data()),
  toFirestore: (v) => v,
};

// const today = new Date()
//   .toLocaleDateString('ja-JP', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   })
//   .replace(/\//g, '');

export const todayStudyRoomAllocationDoc = doc(
  firestore,
  'todayStudyRoomAllocation',
  'singleton',
).withConverter(converter);

export const getTodayStudyRoomAllocation = async (): Promise<
  TodayStudyRoomAllocation | undefined
> => {
  const snapshot = await getDoc(todayStudyRoomAllocationDoc);
  return snapshot.data();
};
