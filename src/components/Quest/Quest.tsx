import React from 'react';
import './Quest.css';

interface QuestProps {
  title: string;
  owner?: string;
  bounty: number;
  deadline: Date;
  currentHelpers: number;
  maxHelpers: number;
}

const Quest: React.FC<QuestProps> = ({
  title,
  owner,
  bounty,
  deadline,
  currentHelpers,
  maxHelpers,
}) => {
  return (
    <div className="quest">
      <div className="quest-row">
        <div className="quest-column">
          <h3>{title}</h3>
          {owner && <p className="owner">{owner}</p>}
        </div>
        <div className="quest-column">
          <p>{deadline.toDateString()}</p>
        </div>
        <div className="quest-column">
          <p>{bounty} ETH</p>
          <p>
            {currentHelpers} / {maxHelpers}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quest;
