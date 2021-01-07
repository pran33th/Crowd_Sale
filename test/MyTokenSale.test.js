const Token = artifacts.require("MYToken")
const TokenSale = artifacts.require("MyTokenSale")
const KycContract = artifacts.require("KycContract")

const chai = require('./setUp')
const BN = web3.utils.BN
const expect = chai.expect

require('dotenv').config({path: "../.env"})


contract("TokenSale Test",async (accounts)=> {

    const [ deployer,recipient,anotherAccount] = accounts;

    it("should not have any tokens in my deployerAccount",async ()=> {
        let instance = await Token.deployed()
        expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(new BN(0))
    })

    it("all tokens should be in the smart contract by default",async () => {
        let instance = await Token.deployed()
        let balanceOfSmartContract = await instance.balanceOf(TokenSale.address)
        let totalSupply = await instance.totalSupply()
        expect(balanceOfSmartContract).to.be.a.bignumber.equal(totalSupply)

    })

    it("should be possible to buy tokens",async ()=> {
        let tokeninstance = await Token.deployed()
        let tokenSaleInstance = await TokenSale.deployed()
        let kycInstance = await KycContract.deployed()
        let balanceBefore = await tokeninstance.balanceOf(deployer)
        await kycInstance.setKycCompleted((deployer), {from:deployer})
        expect(tokenSaleInstance.sendTransaction({from: deployer, value: web3.utils.toWei("1","wei")})).to.eventually.be.fulfilled
        return expect(tokeninstance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)))
    })

})