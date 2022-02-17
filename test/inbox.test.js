const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const { interface, bytecode } = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts that have
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['hello boi'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('it deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
});

// class Car {
//   park() {
//     return 'stop';
//   }

//   drive() {
//     return 'go';
//   }
// }

// let car;
// beforeEach(() => {
//   car = new Car();
// });

// describe('Car', () => {
//   it('it has  a park fn', () => {
//     assert.equal(car.park(), 'stop');
//   });

//   it('It can drive the car', () => {
//     assert.equal(car.drive(), 'go');
//   });
// });
