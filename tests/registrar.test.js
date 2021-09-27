require("@nomiclabs/hardhat-waffle");
const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const MIN_COMMITMENT_AGE = 13; // seconds--one ethereum block
const MAX_COMMITMENT_AGE = 26; // Seconds--two ethereum blocks
const namehash = require('eth-ens-namehash');
let owner;
let Registrar;
let ENSRegistry;
let ensRegistry;

describe("registrar", () => {
    beforeEach(async function () {

        [owner] = await ethers.getSigners();

        // Deploy ENSRegistry
        
        ENSRegistry = await ethers.getContractFactory("ENSRegistry");
        ensRegistry = await ENSRegistry.deploy();
        await ensRegistry.deployed();

        // Deploy Registrar
        
        Registrar = await ethers.getContractFactory("Registrar");
        registrar = await Registrar.deploy(ensRegistry.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE);
        await registrar.deployed();

    });

    describe("Register name", () => {

        // Event: emit NameRegistered(name, label, owner, cost, expires);
        // function registerWithConfig(string memory name, address owner, uint duration, bytes32 secret, address resolver, address addr) public payable {}

        it('emits a NameRegistered event on successful registration', async () => {
            let _name = namehash.hash("kato.com");
            let duration = BigNumber.from("28");
            let secret = ethers.utils.keccak256("secret");
            let resolverAddress = ethers.utils.getAddress("0x0");
            let nameAddress = owner.address;
            let _cost = BigNumber.from("100");
            const receipt = await registrar.connect(owner.address).registerWithConfig(name,owner.address,duration,secret,resolverAddress,nameAddress
            );
        
            expectEvent(receipt, 'NameRegistered',{
            name: _name,
            label: _name,
            owner: owner.address,
            cost: _cost,
            expires:28
            });
        });

});
