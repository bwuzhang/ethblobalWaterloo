import axios, { AxiosRequestConfig } from "axios";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import { ethers } from "ethers";
import invariant from "tiny-invariant";
import type {
  Attestation,
  AttestationResult,
  EASChainConfig,
  EnsNamesResult,
  MyAttestationResult,
} from "./types";

export const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY;

export const CUSTOM_SCHEMAS = {
  MET_IRL_SCHEMA:
    // "0xc59265615401143689cbfe73046a922c975c99d97e4c248070435b1104b2dea7",
    "0xc796becc80d9ed6dbcbb9b22faa6429a2889f2144a117dcf9dfcee5951e7d005",
  MOTIVATE_ME_SCHEMA:
    "0xc796becc80d9ed6dbcbb9b22faa6429a2889f2144a117dcf9dfcee5951e7d005",
};

dayjs.extend(duration);
dayjs.extend(relativeTime);

function getChainId() {
  return Number(process.env.REACT_APP_CHAIN_ID);
}

export const CHAINID = getChainId();
invariant(CHAINID, "No chain ID env found");

export const EAS_CHAIN_CONFIGS: EASChainConfig[] = [
  {
    chainId: 11155111,
    chainName: "sepolia",
    subdomain: "sepolia.",
    version: "0.26",
    contractAddress: "0xC2679fBD37d54388Ce493F1DB75320D236e1815e",
    schemaRegistryAddress: "0x0a7E2Ff54e76B8E6659aedc9103FB21c038050D0",
    etherscanURL: "https://sepolia.etherscan.io",
    contractStartBlock: 2958570,
    rpcProvider: `https://sepolia.infura.io/v3/`,
  },
];

export const activeChainConfig = EAS_CHAIN_CONFIGS.find(
  (config) => config.chainId === CHAINID
);

invariant(activeChainConfig, "No chain config found for chain ID");

export const EASContractAddress = activeChainConfig.contractAddress;
export const EASVersion = activeChainConfig.version;

export const EAS_CONFIG = {
  address: EASContractAddress,
  version: EASVersion,
  chainId: CHAINID,
};

export const timeFormatString = "MM/DD/YYYY h:mm:ss a";

export async function getAddressForENS(name: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    "mainnet"
  );
  return await provider.resolveName(name);
}

export async function getENSName(address: string) {
  const provider = new ethers.providers.StaticJsonRpcProvider(
    `https://eth-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
    "mainnet"
  );
  console.log('debug ens error', provider, address);
  return await provider.lookupAddress(address);
}

const config: AxiosRequestConfig<any> = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export async function getAttestation(uid: string): Promise<Attestation | null> {
  const response = await axios.post<AttestationResult>(
    "https://sepolia.easscan.org/graphql",
    {
      query:
        "query Query($where: AttestationWhereUniqueInput!) {\n  attestation(where: $where) {\n    id\n    attester\n    recipient\n    revocationTime\n    expirationTime\n    time\n    txid\n    data\n decodedDataJson\n refUID\n }\n}",
      variables: {
        where: {
          id: uid,
        },
      },
    },
    config
  );

  return response.data.data.attestation;
}

export async function getAttestationsForAddress(address: string) {
  const response = await axios.post<MyAttestationResult>(
    "https://sepolia.easscan.org/graphql",
    {
      query:
        "query Attestations($where: AttestationWhereInput) {\n  attestations(where: $where) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n decodedDataJson\n refUID\n }\n}",
      variables: {
        where: {
          schemaId: {
            equals: CUSTOM_SCHEMAS.MET_IRL_SCHEMA,
          },
          OR: [
            {
              attester: {
                equals: address,
              },
            },
            {
              recipient: {
                equals: address,
              },
            },
          ],
        },
      },
    },
    config
  );

  return response.data.data.attestations;
}

export async function getENSNames(addresses: string[]) {
  const response = await axios.post<EnsNamesResult>(
    "https://sepolia.easscan.org/graphql",
    {
      query:
        "query Query($where: EnsNameWhereInput) {\n  ensNames(where: $where) {\n    id\n    name\n  }\n}",
      variables: {
        where: {
          id: {
            in: addresses,
            mode: "insensitive",
          },
        },
      },
    },
    config
  );

  return response.data.data.ensNames;
}

export async function getAttestationsForSchema() {
  const response = await axios.post<MyAttestationResult>(
    "https://sepolia.easscan.org/graphql",
    {
      query:
        "query Attestations($where: AttestationWhereInput) {\n  attestations(where: $where) {\n    attester\n    revocationTime\n    expirationTime\n    time\n    recipient\n    id\n    data\n decodedDataJson\n refUID\n }\n}",
      variables: {
        where: {
          schemaId: {
            equals: CUSTOM_SCHEMAS.MET_IRL_SCHEMA,
          },
        },
      },
    },
    config
  );

  return response.data.data.attestations;
}
