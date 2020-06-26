var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/6c44298c170443758737f9a4bdee027d"
);

const account1 = "0xe6001920C3a44f37781d3EdF656eaF15C4F612DB"; // account 2 in my wallet
const account2 = "0x9FDE6681Ba369dD9d4BEF9F40AC5b9CA02a8e67F"; // account 1 in my wallet

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
    value: web3.utils.toHex(web3.utils.toWei("1", "ether")),
    gasLimit: web3.utils.toHex(21000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
  };

  const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
  tx.sign(privateKey1Buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");

  //console.log("tx = ",tx);
  //console.log("serializedTx = ",serializedTx);
  //console.log("raw = ",raw);

  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});
