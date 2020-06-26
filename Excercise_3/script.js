console.log(Web3);
const rpcURL = "https://mainnet.infura.io/v3/6c44298c170443758737f9a4bdee027d";
let web3 = new Web3(rpcURL);

let address = "0x0f6fDCdfa8017003D6D868ADA9c691183F26D5Ff";

let abi = [
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
];

const contract = new web3.eth.Contract(abi, address);

contract.methods.getAge().call(function (err, result) {
  alert("Age = ", result);
});

contract.methods.doSomeWork().call(function (err, result) {
  alert("work = ", result);
});
