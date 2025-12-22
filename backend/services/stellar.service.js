const StellarSdk = require("stellar-sdk");
const crypto = require("crypto");

const server = new StellarSdk.Horizon.Server(
  "https://horizon-testnet.stellar.org"
);
const networkPassphrase = StellarSdk.Networks.TESTNET;

async function anchorToBlockchain(cid) {
  const keypair = StellarSdk.Keypair.fromSecret(
    process.env.STELLAR_SECRET_KEY
  );

  const account = await server.loadAccount(keypair.publicKey());

  const cidHash = crypto
    .createHash("sha256")
    .update(cid)
    .digest("hex")
    .slice(0, 28); // Stellar memo size safe

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase
  })
    .addOperation(
      StellarSdk.Operation.manageData({
        name: "trustagent",
        value: cidHash
      })
    )
    .setTimeout(30)
    .build();

  tx.sign(keypair);

  const result = await server.submitTransaction(tx);
  return result.hash; // transaction hash
}

module.exports = anchorToBlockchain;
