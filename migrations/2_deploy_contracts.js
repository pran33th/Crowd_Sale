let MYToken = artifacts.require("MYToken.sol")
let MyTokenSale = artifacts.require("MyTokenSale.sol")
let KycContract = artifacts.require("KycContract.sol")
require("dotenv").config({path:"../.env"}) 

module.exports = async (deployer) => {
     let addr = await web3.eth.getAccounts()
    await deployer.deploy(MYToken,process.env.INITIAL_TOKENS)
    await deployer.deploy(KycContract)
    await deployer.deploy(MyTokenSale,1,addr[0],MYToken.address,KycContract.address)
    let instance = await MYToken.deployed()
    await instance.transfer(MyTokenSale.address,process.env.INITIAL_TOKENS)
}