const express = require("express");
const router = express.Router();

const Web3 = require("web3");
const Tx = require("ethereumjs-tx").Transactions;

const web3 = new Web3(
  new Web3.providers.HttpProvider(
    "ropsten.infura.io/v3/7fcdaea3a1c740c2be397cb7c46f1665"
  )
);

const account = "0x8B5B29709145CEfd829b403A8Feee3a1C78f24BB";
const privateKey = Buffer.from(
  "AF31661BB9B9DD0FC411155B9887157687CC389947CF68A7E15EA867729B0973",
  "hex"
);
const contractAddress = "0x9049Ef600b60b8790A19d2F29B8153A85A499B4b";
const abi = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "tokens", type: "uint256" }
    ],
    name: "approve",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "from", type: "address" },
      { name: "to", type: "address" },
      { name: "tokens", type: "uint256" }
    ],
    name: "transferFrom",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "tokenOwner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [],
    name: "acceptOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "owner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "to", type: "address" },
      { name: "tokens", type: "uint256" }
    ],
    name: "transfer",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "tokens", type: "uint256" },
      { name: "data", type: "bytes" }
    ],
    name: "approveAndCall",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "newOwner",
    outputs: [{ name: "", type: "address" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [
      { name: "tokenAddress", type: "address" },
      { name: "tokens", type: "uint256" }
    ],
    name: "transferAnyERC20Token",
    outputs: [{ name: "success", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "tokenOwner", type: "address" },
      { name: "spender", type: "address" }
    ],
    name: "allowance",
    outputs: [{ name: "remaining", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function"
  },
  {
    constant: false,
    inputs: [{ name: "_newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor"
  },
  { payable: true, stateMutability: "payable", type: "fallback" },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "_from", type: "address" },
      { indexed: true, name: "_to", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "from", type: "address" },
      { indexed: true, name: "to", type: "address" },
      { indexed: false, name: "tokens", type: "uint256" }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, name: "tokenOwner", type: "address" },
      { indexed: true, name: "spender", type: "address" },
      { indexed: false, name: "tokens", type: "uint256" }
    ],
    name: "Approval",
    type: "event"
  }
];

const contract = new web3.eth.Contract(abi, contractAddress, {
  from: account,
  gasLimit: 3000000
});

const contractFunction = contract.methods.balanceOf(account);
const functionAbi = contractFunction.encodeABI();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling get requests to /products"
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  if (id === "special") {
    res.status(200).json({
      message: `You discovered the special id: '${id}'`,
      id: id
    });
  } else {
    res.status(200).json({
      message: "You passed an id"
    });
  }
});

router.patch("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Updated product ${id} !!!`,
    id: id
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  res.status(200).json({
    message: `Deleted product: '${id}' !!!`,
    id: id
  });
});

router.get("/balanceOf/:address", (req, res, next) => {
  res.status(200).json({
    message: "Getting balance of " + req.params.address
  });
});

router.post("/", (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(200).json({
    message: "Handling post requests to /products",
    product: product
  });
});

module.exports = router;
