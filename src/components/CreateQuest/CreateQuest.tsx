import React, { useState } from 'react';
import { MyDatePicker } from '../MyDatePicker';
import { ethers } from 'ethers';
import { useAccount, useProvider, useSigner, useChainId, usePrepareSendTransaction, usePrepareContractWrite, useContractWrite } from 'wagmi';
import './CreateQuest.css';

function CreateQuest() {
  const [title, setTitle] = useState('');
  const [bounty, setBounty] = useState(0);
  const [deadline, setDeadline] = useState(new Date());
  const [maxHelpers, setMaxHelpers] = useState(0);
  const chainId = useChainId();
  const provider = useProvider({ chainId });

  const date = new Date();
  const timestamp = Math.floor(date.getTime() / 1000); // Get the Unix timestamp in seconds
  const uint256Value = ethers.BigNumber.from(timestamp);

  const goalContractAddress = '0x7864c0d253f63430fdF28d75aa91af42AC9F2Ff3';
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
    args: [title, uint256Value]
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

  const abi = [
    'function createGoal(string title, uint256 deadline)'
  ];
  // const signer = new ethers.providers.Web3Provider(provider).getSigner();
  // const contract = new ethers.Contract(goalContractAddress, abi, signer);

  const handleSubmit = async (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    const provider = new ethers.providers.StaticJsonRpcProvider(`https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`, 'homestead');
    const ens = await provider.lookupAddress('0x08a7aD00DAc20aAAeB0612Ef3b96b737fE742d4F');
    const chain = await (await provider.getNetwork())?.chainId;
    console.log('woot', ens, chain, provider);
    write?.();
    console.log('foo foo foo');
  };

  // const foo = async () => {
  //   const latestBlock = await provider.getBlock('latest');
  //   const network = await provider.getNetwork();
  //   console.log(latestBlock, network?.chainId);
  // }

  // foo();

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