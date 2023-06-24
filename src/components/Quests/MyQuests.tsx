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
  },
];

function MyQuests() {
  return (
    <div>
      <h1>My Quests</h1>
      <Quests quests={questsData} />
    </div>
  );
}

export default MyQuests;
