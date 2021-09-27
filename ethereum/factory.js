import web3 from "./web3.js";
import CampaignFactory from "./build/CampaignFactory.json";

const CAMPAING_FACTORY_ADDRESS = "0x1609A5320819ad87b8A4606dB42D4Da0C8081516";

const instance = new web3.eth.Contract(
  CampaignFactory.abi,
  CAMPAING_FACTORY_ADDRESS
);

export default instance;
