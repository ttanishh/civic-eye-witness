
const fs = require('fs');
const path = require('path');
const { Web3 } = require('web3');
const ganache = require('ganache');

// Connect to Ganache
const ganacheProvider = ganache.provider({
  logging: {
    quiet: false
  }
});
const web3 = new Web3(ganacheProvider);

async function deployContract() {
  try {
    console.log('Deploying contract to Ganache...');
    
    // Get contract binary and ABI
    const contractPath = path.resolve(__dirname, '../src/contracts/build');
    
    // Make sure the build directory exists
    if (!fs.existsSync(contractPath)) {
      fs.mkdirSync(contractPath, { recursive: true });
    }
    
    // Assuming the contract has been compiled with solc
    const binary = fs.readFileSync(path.resolve(contractPath, 'KavachReporting_sol_KavachReporting.bin')).toString();
    const abi = JSON.parse(fs.readFileSync(path.resolve(contractPath, 'KavachReporting_sol_KavachReporting.abi')).toString());
    
    // Get accounts
    const accounts = await web3.eth.getAccounts();
    console.log('Using account:', accounts[0]);
    
    // Deploy contract
    console.log('Deploying contract...');
    const deployedContract = await new web3.eth.Contract(abi)
      .deploy({ data: '0x' + binary })
      .send({ from: accounts[0], gas: 6000000 });
    
    console.log('Contract deployed at address:', deployedContract.options.address);
    
    // Save contract address to a file
    const envContent = `NEXT_PUBLIC_CONTRACT_ADDRESS=${deployedContract.options.address}`;
    fs.writeFileSync(path.resolve(__dirname, '../.env.local'), envContent);
    
    console.log('Contract address saved to .env.local file');
    console.log('Contract deployment successful!');
    
    // Save ABI to a file for easier imports
    fs.writeFileSync(
      path.resolve(contractPath, 'KavachReporting.abi.json'),
      JSON.stringify(abi, null, 2)
    );
    
    console.log('Contract ABI saved to build directory');
  } catch (error) {
    console.error('Error deploying contract:', error);
  }
}

deployContract();
