import { Address } from 'viem';

type ConfigCollateral = {
  collateralIndex: number;
  collateral: Address;
  isActive: boolean;
  precision: string;
  precisionDelta: string;
  __placeholder: string;
};

export const collateralConfigs: Record<number, ConfigCollateral[]> = {
  '137': [
    {
      collateral: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 1,
    },
    {
      collateral: '0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 2,
    },
    {
      collateral: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
      isActive: true,
      __placeholder: '0',
      precision: '1000000',
      precisionDelta: '1000000000000',
      collateralIndex: 3,
    },
  ],
  '8453': [
    {
      collateral: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
      isActive: true,
      __placeholder: '0',
      precision: '1000000',
      precisionDelta: '1000000000000',
      collateralIndex: 1,
    },
    {
      collateral: '0xe4b20925D9E9a62F1E492e15a81dC0de62804dd4',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 2,
    },
  ],
  '33139': [
    {
      collateral: '0x00000000000f7e000644657dC9417b185962645a',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 1,
    },
  ],
  '42161': [
    {
      collateral: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 1,
    },
    {
      collateral: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 2,
    },
    {
      collateral: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
      isActive: true,
      __placeholder: '0',
      precision: '1000000',
      precisionDelta: '1000000000000',
      collateralIndex: 3,
    },
    {
      collateral: '0x18c11FD286C5EC11c3b683Caa813B77f5163A122',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 4,
    },
  ],
  '421614': [
    {
      collateral: '0xfBb7E7FEE1525958bf5a4F04ed8D7be547AB6d27',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 1,
    },
    {
      collateral: '0x980B62Da83eFf3D4576C647993b0c1D7faf17c73',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 2,
    },
    {
      collateral: '0x4cC7EbEeD5EA3adf3978F19833d2E1f3e8980cD6',
      isActive: true,
      __placeholder: '0',
      precision: '1000000',
      precisionDelta: '1000000000000',
      collateralIndex: 3,
    },
    {
      collateral: '0xA5a0eB8710f9a949ad5F4501C3494F2FdA58FFe3',
      isActive: true,
      __placeholder: '0',
      precision: '1000000000000000000',
      precisionDelta: '1',
      collateralIndex: 4,
    },
  ],
};
