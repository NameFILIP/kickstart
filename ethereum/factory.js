import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const CAMPAING_FACTORY_ADDRESS = "0x9F902E8517f4F13172a68427e973B99aBb119783";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  CAMPAING_FACTORY_ADDRESS
);

export default instance;
