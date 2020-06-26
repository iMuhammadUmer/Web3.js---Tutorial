console.log(Web3);
const rpcURL = "https://mainnet.infura.io/v3/6c44298c170443758737f9a4bdee027d";
let web3 = new Web3(rpcURL);

let address = "0x0f6fDCdfa8017003D6D868ADA9c691183F26D5Ff";

web3.eth.getBalance(address, (err, wei) => {
  if (err) {
    console.log("There is an error ", err);
  } else {
    console.log("Wei ", wei);
    let balance = web3.utils.fromWei(wei, "ether");
    console.log("Balance ", balance);
  }
});
