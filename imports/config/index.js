const mainnet = {
  infura: "https://mainnet.infura.io/v3/31c192c263a645a29518b87bfa46ab1f",
  etherscan: "https://etherscan.io/",
  fundAddr: "0x203D290196081738efAF988801ea85b47184e1a4",
  memberAddrs: [
    "0xDc19464589c1cfdD10AEdcC1d09336622b282652", // outprog
    "0x82ee9EFc6d35FbFa0342FA00C0dd12b39Ab528bA", // haibin
    "0xbf85870b162B2A25a17d68e66eaC31a82F459B36", // Yiqun
    "0x670AB48968A5dA83221beBDd04667E603d0dFF5f", // Weli
    "0x006016cED2484bdc1E78bbdC0Ca95fA021cA5ba6", // 郭涛，童在！
    "0xE5B8988C90Ca60D5f2A913cb3BD35A781aE7F242", // Simon
    "0x865eADB12Bf29CD141A0De88FD29716e2c169a86", // longhai
  ],
}

const kovan = {
  infura: "https://kovan.infura.io/",
  etherscan: "https://kovan.etherscan.io/",
  fundAddr: "0xC9905dD9e5a4ac023e0f59F59B209F55bCcF1F91",
  memberAddrs: [
    "0xDc19464589c1cfdD10AEdcC1d09336622b282652", // outprog
    "0x82ee9EFc6d35FbFa0342FA00C0dd12b39Ab528bA", // haibin
    "0xbf85870b162B2A25a17d68e66eaC31a82F459B36", // Yiqun
    "0x670AB48968A5dA83221beBDd04667E603d0dFF5f", // Weli
    "0x006016cED2484bdc1E78bbdC0Ca95fA021cA5ba6", // 郭涛，童在！
    "0xE5B8988C90Ca60D5f2A913cb3BD35A781aE7F242", // Simon
    "0x865eADB12Bf29CD141A0De88FD29716e2c169a86", // longhai
  ],
}

export const getNetworkConfigs = (networkType) => {
  switch (networkType) {
    case "main": 
      return mainnet;
    case "kovan":
      return kovan;
  }
}

export const fundAbi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"member","type":"address"},{"indexed":false,"internalType":"uint256","name":"addKm","type":"uint256"}],"name":"AddKm","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"addReward","type":"uint256"}],"name":"AdditionalReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"member","type":"address"},{"indexed":false,"internalType":"uint256","name":"activityKm","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"Claim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"member","type":"address"}],"name":"DeregisterMember","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"surplus","type":"uint256"}],"name":"EndActivity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"member","type":"address"},{"indexed":false,"internalType":"string","name":"name","type":"string"}],"name":"RegisterMember","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"reward","type":"uint256"}],"name":"StartActivity","type":"event"},{"anonymous":false,"inputs":[],"name":"StartClaim","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"id","type":"uint256"},{"indexed":false,"internalType":"address","name":"member","type":"address"},{"indexed":false,"internalType":"uint256","name":"subKm","type":"uint256"}],"name":"SubKm","type":"event"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"constant":true,"inputs":[],"name":"activityID","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"activityStatus","outputs":[{"internalType":"enum Fund.ActivityStatus","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"activityTotalKm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_members","type":"address[]"},{"internalType":"uint256[]","name":"_kms","type":"uint256[]"}],"name":"addKm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_members","type":"address[]"}],"name":"deregisterMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"endActivity","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isMember","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isOwner","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"members","outputs":[{"internalType":"string","name":"name","type":"string"},{"internalType":"uint256","name":"usedKm","type":"uint256"},{"internalType":"uint256","name":"activityKm","type":"uint256"},{"internalType":"uint256","name":"updatedActivityID","type":"uint256"},{"internalType":"bool","name":"isClaimed","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_members","type":"address[]"},{"internalType":"string[]","name":"_names","type":"string[]"}],"name":"registerMembers","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"renounceOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"startActivity","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":false,"inputs":[],"name":"startClaim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_members","type":"address[]"},{"internalType":"uint256[]","name":"_kms","type":"uint256[]"}],"name":"subKm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalKm","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"usedReward","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}];