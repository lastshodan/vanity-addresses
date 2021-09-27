async function main() {
  
  const [deployer] = await ethers.getSigners();
  const node = "0xbdf2412b26ec1e09365e24cda597b19cbb366a31fecab53e4aafd1b33f1b37a9"; //kato.com
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  const MIN_COMMITMENT_AGE = 13;
  const MAX_COMMITMENT_AGE = 26;

  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  
    // Deploy ENSRegistry

    const ENSRegistry = await ethers.getContractFactory("ENSRegistry");
    console.log("Deploying ENSRegistry....");
    const ensRegistry = await ENSRegistry.deploy();
    await ensRegistry.deployed();
    console.log("ENSRegistry address:", ensRegistry.address); 

    // Deploy Resolver

    const PublicResolver = await ethers.getContractFactory("PublicResolver");
    console.log("Deploying PublicResolver....");
    const publicResolver = await PublicResolver.deploy(ensRegistry.address,ZERO_ADDRESS);
    await publicResolver.deployed();
    console.log("PublicResolver address:", publicResolver.address); 


    // Deploy Registrar
    const Registrar = await ethers.getContractFactory("Registrar");
    console.log("Deploying Registrar....");
    const registrar = await Registrar.deploy(ensRegistry.address,MIN_COMMITMENT_AGE,MAX_COMMITMENT_AGE);
    await registrar.deployed();
    console.log("Registrar address:", registrar.address); 

  } 

  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
