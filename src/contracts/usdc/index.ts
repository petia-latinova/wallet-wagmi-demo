import { USDC_ADDRESS, USDC_DECIMALS } from './constants';
import { erc20Abi } from './abi';

export const usdcContract = {
  address: USDC_ADDRESS,
  abi: erc20Abi,
};

export { USDC_ADDRESS, USDC_DECIMALS, erc20Abi };
