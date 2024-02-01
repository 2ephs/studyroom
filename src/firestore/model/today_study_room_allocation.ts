import { z } from 'zod';
import { firestoreTimestampSchema } from '../common_schemas';

const studyRoomAllocationFrameAllocatedSchema = z.object({
  label: z.string(),
  type: z.literal('allocated'),
  room: z.string(),
  description: z.string(),
});

const studyRoomAllocationFrameContinueSchema = z.object({
  label: z.string(),
  type: z.literal('continue'),
});

const studyRoomAllocationFrameNoneSchema = z.object({
  label: z.string(),
  type: z.literal('none'),
});

const studyRoomAllocationFrameSchema = z.union([
  studyRoomAllocationFrameAllocatedSchema,
  studyRoomAllocationFrameContinueSchema,
  studyRoomAllocationFrameNoneSchema,
]);

export type TodayStudyRoomAllocationFrame = z.infer<
  typeof studyRoomAllocationFrameSchema
>;

export const todayStudyRoomAllocationSchema = z.object({
  frames: z.array(studyRoomAllocationFrameSchema),
  createdAt: firestoreTimestampSchema,
  updatedAt: firestoreTimestampSchema,
});

export type TodayStudyRoomAllocation = z.infer<
  typeof todayStudyRoomAllocationSchema
>;
