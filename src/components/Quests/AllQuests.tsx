import React from 'react';
import Quests from './Quests';

const questsData = [
  {
    id: 1,
    owner: 'John Doe',
    title: 'Quest 1',
    bounty: 5,
    deadline: new Date('2023-07-01'),
    currentHelpers: 2,
    maxHelpers: 5,
    canSendInvitation: true,
  },
  {
    id: 2,
    owner: 'Jane Smith',
    title: 'Quest 2',
    bounty: 10,
    deadline: new Date('2023-07-15'),
    currentHelpers: 3,
    maxHelpers: 8,
    canSendInvitation: true,
  },
  // Add more quests as needed
];

function AllQuests() {
  return (
    <div>
      <h1>All Quests</h1>
      <Quests quests={questsData} />
    </div>
  );
}

export default AllQuests;
