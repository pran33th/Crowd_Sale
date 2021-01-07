const Token = artifacts.require("MYToken")

const chai = require('./setUp')
const BN = web3.utils.BN
const expect = chai.expect

require('dotenv').config({path: "../.env"})


contract("Token Test",async (accounts)=> {

    const [ deployer,recipient,anotherAccount] = accounts;

    beforeEach(async()=> {
        this.myToken = await Token.new(process.env.INITIAL_TOKENS)
    })

    it("all tokens should be in my account",async ()=> {
        let instance = this.myToken
        let totalSupply = await instance.totalSupply()
        // let balance = await instance.balanceOf(accounts[0])

        // assert.equal(totalSupply.valueOf(),balance.valueOf(),"the balance is not the same")

       return expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply)
    })

    it("it is possible to send tokens between accounts",async()=> {
        const sendTokens = 1
        let instance = this.myToken
        let totalSupply = await instance.totalSupply()
        // console.log(instance.balanceOf(deployer,totalSupply))
        expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply)
        expect(instance.transfer(recipient,sendTokens)).to.eventually.be.fulfilled
        expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)))
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens))
       return expect(instance.transfer(recipient,totalSupply + 1)).to.eventually.be.rejected 

    })

    it("it is n0t possible to send more tokens than the totalsupply ",async()=>{
        let instance = this.myToken
        let balanceOfDeployer = await instance.balanceOf(deployer)
        let totalSupply = await instance.totalSupply()

        expect(instance.transfer(recipient,totalSupply + 1)).to.eventually.be.rejected 
        return expect(instance.balanceOf(deployer)).to.eventually.be.a.bignumber.equal(balanceOfDeployer)
    })
})