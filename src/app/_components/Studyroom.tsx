'use client';

import {
  Container,
  Center,
  Title,
  Table,
  TableThead,
  TableTr,
  TableTh,
  TableTbody,
  TableTd,
  Text,
  TableCaption,
} from '@mantine/core';
import {
  TodayStudyRoomAllocation,
  TodayStudyRoomAllocationFrame,
} from '../../firestore/model/today_study_room_allocation';
import { getTodayStudyRoomAllocation } from '@/firestore/collections/today_study_room_allocation';
import useSWR from 'swr';
import { nl2br } from '@/utils/nl2br';

const date = new Date().toLocaleDateString('ja-JP', {
  month: '2-digit',
  day: '2-digit',
});

export const Studyroom = () => {
  const { data, error, isLoading } = useSWR(
    'todayStudyRoomAllocation',
    async () => await getTodayStudyRoomAllocation(),
    { refreshInterval: 1000 * 60 * 10 },
  );

  const timetable = isLoading ? (
    <Text>読み込み中...</Text>
  ) : data == null ? (
    <Text>自習室情報の取得に失敗しました</Text>
  ) : (
    <StudyRoomTimetable allocation={data} />
  );

  return (
    <Container pt="md">
      <Center>
        <Title order={1}>本日の自習教室 {date}</Title>
      </Center>
      {timetable}
    </Container>
  );
};

export type StudyRoomTimetableProps = {
  allocation: TodayStudyRoomAllocation;
};

const StudyRoomTimetable = (props: StudyRoomTimetableProps) => {
  const { allocation } = props;

  const commitedRows: JSX.Element[] = [];
  let pendingFrames: TodayStudyRoomAllocationFrame[] = [];
  for (const frame of allocation.frames) {
    if (frame.type === 'continue') {
      pendingFrames.push(frame);
      continue;
    }

    commitPendingFrames(commitedRows, pendingFrames);
    pendingFrames = [frame];
  }

  commitPendingFrames(commitedRows, pendingFrames);

  return (
    <Table captionSide="top" verticalSpacing="md">
      <TableCaption>
        最終更新日時: {allocation.updatedAt.toDate().toLocaleString()}
      </TableCaption>
      <TableThead>
        <TableTr>
          <TableTh>時限</TableTh>
          <TableTh>教室</TableTh>
          <TableTh>備考</TableTh>
        </TableTr>
      </TableThead>
      <TableTbody>{commitedRows}</TableTbody>
    </Table>
  );
};

const commitPendingFrames = (
  commitedRows: JSX.Element[],
  pendingFrames: TodayStudyRoomAllocationFrame[],
) => {
  const [firstFrame, ...restFrames] = pendingFrames;
  if (firstFrame == null) return;

  if (firstFrame.type !== 'allocated') {
    const rows = pendingFrames.map((frame, i) => (
      <TableTr key={commitedRows.length + i}>
        <TableTd>{frame.label}</TableTd>
        <TableTd colSpan={2}>自習教室の割り当てはありません。</TableTd>
      </TableTr>
    ));

    commitedRows.push(...rows);
    return;
  }

  const rowspan = pendingFrames.length;
  commitedRows.push(
    <TableTr key={commitedRows.length}>
      <TableTd>{nl2br(firstFrame.label)}</TableTd>
      <TableTd rowSpan={rowspan}>{nl2br(firstFrame.room)}</TableTd>
      <TableTd rowSpan={rowspan}>{nl2br(firstFrame.description)}</TableTd>
    </TableTr>,
  );

  const rows = restFrames.map((frame, i) => (
    <TableTr key={commitedRows.length}>
      <TableTd>{frame.label}</TableTd>
    </TableTr>
  ));

  commitedRows.push(...rows);
};
