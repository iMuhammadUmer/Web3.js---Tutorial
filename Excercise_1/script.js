console.log(Web3);
const rpcURL = "HTTP://127.0.0.1:7545";
let web3 = new Web3(rpcURL);

let address = "0xe6001920C3a44f37781d3EdF656eaF15C4F612DB";

web3.eth.getBalance(address, (err, wei) => {
  if (err) {
    alert("There is an error ", err);
  } else {
    let balance = web3.utils.fromWei(wei, "ether");
    alert("Wei: " + wei + " Ether: " + balance);
  }
});
