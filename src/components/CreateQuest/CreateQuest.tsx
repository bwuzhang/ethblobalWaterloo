import React, { useState } from 'react';
import { MyDatePicker } from '../MyDatePicker';
import './CreateQuest.css';

function CreateQuest() {
  const [title, setTitle] = useState('');
  const [bounty, setBounty] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [maxHelpers, setMaxHelpers] = useState(0);

  const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
  };

  const handleBountyChange = (event: any) => {
    setBounty(Number(event.target.value));
  };

  const handleDeadlineChange = (date: any) => {
    setDeadline(date);
  };

  const handleMaxHelpersChange = (event: any) => {
    setMaxHelpers(Number(event.target.value));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // Interact with Ethereum contract using Web3.js
    // Call the createQuest function with form data
    // Handle the contract interaction logic here
  };

  return (
    <form onSubmit={handleSubmit} className="create-quest-form">
      <div className="form-row">
        <label className="form-label">
          Title:
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-row">
        <label className="form-label">
          Bounty (ETH):
          <input
            type="number"
            value={bounty}
            onChange={handleBountyChange}
            className="form-input"
          />
        </label>
      </div>

      <div className="form-row">
        <label className="form-label">
          Deadline:
          <div className="datetime-inputs">
            <MyDatePicker
              selected={deadline}
              onChange={handleDeadlineChange}
              dateFormat="yyyy-MM-dd"
              className="form-input date-input"
            />
          </div>
        </label>
      </div>

      <div className="form-row">
        <label className="form-label">
          Maximum Helpers:
          <input
            type="number"
            value={maxHelpers}
            onChange={handleMaxHelpersChange}
            className="form-input"
          />
        </label>
      </div>

      <button type="submit" className="submit-button">Create Quest</button>
    </form>
  );
}

export default CreateQuest;