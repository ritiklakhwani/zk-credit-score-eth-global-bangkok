import { createVlayerClient } from "@vlayer/sdk";
import proverSpec from "../out/SimpleTeleportProver.sol/SimpleTeleportProver";
import verifierSpec from "../out/SimpleTeleportVerifier.sol/SimpleTeleportVerifier";
import whaleBadgeNFTSpec from "../out/WhaleBadgeNFT.sol/WhaleBadgeNFT";
import {
  createContext,
  deployVlayerContracts,
  getConfig,
  waitForContractDeploy,
} from "@vlayer/sdk/config";

const config = getConfig();
const { chain, ethClient, account, proverUrl, confirmations } =
  await createContext(config);
const vlayer = createVlayerClient({
  url: proverUrl,
});

const deployWhaleBadgeHash = await ethClient.deployContract({
  abi: whaleBadgeNFTSpec.abi,
  bytecode: whaleBadgeNFTSpec.bytecode.object,
  account,
});

const whaleBadgeNFTAddress = await waitForContractDeploy({
  hash: deployWhaleBadgeHash,
});

const { prover, verifier } = await deployVlayerContracts({
  proverSpec,
  verifierSpec,
  proverArgs: [],
  verifierArgs: [whaleBadgeNFTAddress],
});

// console.log("Proving...");
// const proofHash = await vlayer.prove({
//   address: '0x7d298b1cd236a534f59b2e5ee61295ddb95e6bcb',
//   proverAbi: proverSpec.abi,
//   functionName: "crossChainBalanceOf",
//   args: [account.address],
//   chainId: chain.id,
// });
// const result = await vlayer.waitForProvingResult(proofHash);
// console.log("Proof:", result[0]);
// console.log("Verifying...");

// const verificationHash = await ethClient.writeContract({
//   address: '0x2b68ba95c0c1d4a00b716ba3be808dfcdfb1b1ef',
//   abi: verifierSpec.abi,
//   functionName: "claim",
//   args: result,
//   account,
// });

// const receipt = await ethClient.waitForTransactionReceipt({
//   hash: verificationHash,
//   confirmations,
//   retryCount: 60,
//   retryDelay: 1000,
// });

// console.log(`Verification result: ${receipt.status}`);
