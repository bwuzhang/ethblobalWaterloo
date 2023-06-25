import { ethers } from 'ethers';
import React, { useState } from 'react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { MyDatePicker } from '../MyDatePicker';
import './CreateQuest.css';

function CreateQuest() {
  const [title, setTitle] = useState('');
  const [bounty, setBounty] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [maxHelpers, setMaxHelpers] = useState(0);

  const timestamp = Math.floor(deadline.getTime() / 1000);
  const uint256Value = ethers.BigNumber.from(timestamp);
  const etherAmount = ethers.utils.parseEther('' + bounty);

  const goalContractAddress = '0xE4D16D89c1D8C92Af698F370c74982b381BD0FAE';
  const { config } = usePrepareContractWrite({
    address: goalContractAddress,
    abi: [
      {
        name: 'createGoal',
        type: 'function',
        stateMutability: 'payable',
        inputs: [{ internalType: 'string', name: '_title', type: 'string' }, { internalType: 'uint256', name: '_deadline', type: 'uint256' }],
        outputs: [],
      },
    ],
    functionName: 'createGoal',
    args: [title, uint256Value],
    // value: etherAmount,
  });

  const { write } = useContractWrite(config);
  
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

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log('submitting', title, bounty, deadline.toString(), etherAmount.toString(), uint256Value.toNumber());
    write?.();
  };

  return (
    <form onSubmit={handleSubmit} className="create-quest-form">
      <div className="form-row">
        <label className="form-label">
          Quest Title:
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