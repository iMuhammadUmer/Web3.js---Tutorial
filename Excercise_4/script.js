var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");

const account1 = "0xe6001920C3a44f37781d3EdF656eaF15C4F612DB";
const account2 = "0x9FDE6681Ba369dD9d4BEF9F40AC5b9CA02a8e67F";

const privateKey1 =
  "350d9f4125e6c9164da7caba9f5f427518ce4c0aff4a726e7e1950267ef77b17";
const privateKey2 =
  "60072a6a7ff209f98334a48d7d2ff3ca6088e4a1211fb57f20737bd6eb3e4f3c";

const privateKey1Buffer = Buffer.from(privateKey1, "hex");
const privateKey2Buffer = Buffer.from(privateKey2, "hex");

console.log("Buffer 1 = ", privateKey1Buffer);
console.log("Buffer 2 = ", privateKey2Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    to: account2,
    value: web3.utils.toHex(web3.utils.toWei("3", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  const tx = new Tx.Transaction(txObject);
  tx.sign(privateKey1Buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
