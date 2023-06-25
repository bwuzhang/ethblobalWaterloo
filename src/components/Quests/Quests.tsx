import React from 'react';
import Quest from '../Quest/Quest';

interface QuestData {
  id: number;
  owner: string;
  title: string;
  bounty: number;
  deadline: Date;
  currentHelpers: number;
  maxHelpers: number;
}

interface QuestsProps {
  quests: QuestData[];
}

const Quests: React.FC<QuestsProps> = ({ quests }) => {
  return (
    <div className="quests">
      {quests.map((quest) => (
        <Quest key={quest.id} {...quest} />
      ))}
    </div>
  );
};

export default Quests;
