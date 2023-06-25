import { BigNumber } from "ethers";
import { useState } from "react";
import { useContractRead } from "wagmi";
import { Goal } from "../../Goal";
import Quests from "./Quests";

const questsData = [
  {
    id: 1,
    owner: "John Doe",
    title: "Quest 1",
    bounty: 5,
    deadline: new Date("2023-07-01"),
    currentHelpers: 2,
    maxHelpers: 5,
    canSendInvitation: true,
  },
  {
    id: 2,
    owner: "Jane Smith",
    title: "Quest 2",
    bounty: 10,
    deadline: new Date("2023-07-15"),
    currentHelpers: 3,
    maxHelpers: 8,
    canSendInvitation: true,
  },
  // Add more quests as needed
];

// type RawQuestData = any[];

interface Goal {
  id: BigNumber;
  poster: string;
  amount: BigNumber;
  title: string;
  deadline: BigNumber;
  supporters: string[];
  approvedSupporters: string[];
  achieved: boolean;
}

interface QuestData {
  id: number;
  owner: string;
  title: string;
  bounty: number;
  deadline: Date;
  currentHelpers: number;
  maxHelpers: number;
  canSendInvitation: boolean;
}

type GoalResponse = Goal[];

function AllQuests() {
  // const goalContractAddress = "0x7864c0d253f63430fdF28d75aa91af42AC9F2Ff3";
  const goalContractAddress = "0xE4D16D89c1D8C92Af698F370c74982b381BD0FAE";
  const [quests, setQuests] = useState<QuestData[]>([]);
  const { data, isError, isLoading } = useContractRead({
    address: goalContractAddress,
    abi: [
      {
        "inputs": [],
        "name": "getGoals",
        "outputs": [
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256",
              },
              {
                "internalType": "address payable",
                "name": "poster",
                "type": "address",
              },
              {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256",
              },
              {
                "internalType": "string",
                "name": "title",
                "type": "string",
              },
              {
                "internalType": "uint256",
                "name": "deadline",
                "type": "uint256",
              },
              {
                "internalType": "address[]",
                "name": "supporters",
                "type": "address[]",
              },
              {
                "internalType": "address[]",
                "name": "approvedSupporters",
                "type": "address[]",
              },
              {
                "internalType": "bool",
                "name": "achieved",
                "type": "bool",
              },
            ],
            "internalType": "struct GoalAccountable.Goal[]",
            "name": "",
            "type": "tuple[]",
          },
        ],
        "stateMutability": "view",
        "type": "function",
      },
    ],
    functionName: "getGoals",
    onSuccess: (data: GoalResponse) => {
      console.log(data);
      setQuests(
        data.map((quest: Goal) => {
          return {
            id: quest.id.toNumber(), // convert BigNumber to string
            owner: quest.poster, // poster
            title: quest.title,
            bounty: quest.amount.toNumber(), // convert BigNumber to string
            deadline: new Date(quest.deadline.toNumber() * 1000), // convert BigNumber to number and then to Date
            currentHelpers: quest.approvedSupporters.length,
            maxHelpers: 5,
            canSendInvitation: true,
          };
        })
      );
    },
    onError: (error) => {
      console.log(error);
    },
    onSettled: (data, error) => {
      console.log(data, error);
    },
  });

  return (
    <div>
      <h1>All Quests</h1>
      <Quests quests={quests} />
    </div>
  );
}

export default AllQuests;
