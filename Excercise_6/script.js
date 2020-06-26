var Tx = require("ethereumjs-tx");
const Web3 = require("web3");
const web3 = new Web3(
  "https://ropsten.infura.io/v3/6c44298c170443758737f9a4bdee027d"
);

const account1 = "0xe6001920C3a44f37781d3EdF656eaF15C4F612DB";

const privateKey1 =
  "350d9f4125e6c9164da7caba9f5f427518ce4c0aff4a726e7e1950267ef77b17";

const privateKey1Buffer = Buffer.from(privateKey1, "hex");

const contractAddress = "0x2100357C4D744440827Fdd067f14603B118bfC7f";

const abi = [
  {
    inputs: [],
    name: "doSomeWork",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "getAge",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_age",
        type: "uint256",
      },
    ],
    name: "setAge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const contract = new web3.eth.Contract(abi, contractAddress);

console.log("Buffer 1 = ", privateKey1Buffer);

web3.eth.getTransactionCount(account1, (err, txCount) => {
  const txObject = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(800000),
    gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
    to: contractAddress,
    data: contract.methods.setAge(12).encodeABI(),
  };

  const tx = new Tx.Transaction(txObject, { chain: "ropsten" });
  tx.sign(privateKey1Buffer);

  const serializedTx = tx.serialize();
  const raw = "0x" + serializedTx.toString("hex");
  web3.eth.sendSignedTransaction(raw, (err, txHash) => {
    console.log("txHash:", txHash);
  });
});

contract.methods.getAge().call(function (err, result) {
  console.log("Age = ", result);
});
