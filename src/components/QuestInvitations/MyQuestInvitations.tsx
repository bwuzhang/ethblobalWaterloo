import React from 'react';
import QuestInvitation from '../QuestInvitation/QuestInvitation';
import QuestInvitations, { QuestInvitationData } from './QuestInvitations';

const onAccept = () => {
  console.log('accept invite');
}

const onReject = () => {
  console.log('reject invite');
}

const questInvitationsData = [
  {
    onAccept,
    onReject,
    id: 1,
    questId: 1,
    joiner: 'Joiner 1',
    questTitle: 'Quest 1',
    donationAmount: 5,
  },
  {
    onAccept,
    onReject,
    id: 2,
    questId: 2,
    joiner: 'Joiner 1',
    questTitle: 'Quest 2',
    donationAmount: 10,
  },
  {
    onAccept,
    onReject,
    id: 3,
    questId: 2,
    joiner: 'Joiner 1',
    questTitle: 'Quest 2',
    donationAmount: 15,
  },
];

function MyQuestInvitations() {
  return (
    <div>
      <h1>All Quests</h1>
      <QuestInvitations questInvitations={questInvitationsData} />
    </div>
  );
};

export default MyQuestInvitations;
