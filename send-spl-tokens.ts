import "dotenv/config";
import{
    getExplorerLink,
    getKeypairFromEnvironment,
} from "@solana-developers/helpers";

import{ Connection, PublicKey, clusterApiUrl} from "@solana/web3.js";
import{
    getOrCreateAssociatedTokenAccount,
    TOKEN_2022_PROGRAM_ID,
    transfer,
}from "@solana/spl-token";
const connection = new Connection(clusterApiUrl("devnet"));

const sender = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    `Loaded keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

//add the recipient public key here
const recipient = new PublicKey("AMnoypVmk6PQJTjXQpwuCPt5Jwhg5gHrfT8HpWCLYRC2");

const tokenMintAccount = new PublicKey("CSY6HMYzjU2tVWeLU3nUFoCZrhMxZUZ9VVUnEg2VLs5h");

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10,2);

console.log(`Attempting to send 1 token to ${recipient.toBase58()}...`);

//get or create the source and destination token accounts to store this token
const sourceTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey,
    false, 
    "confirmed",
    {},
    TOKEN_2022_PROGRAM_ID
);

const destinationTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient,
    false,
    "confirmed",
    {},
    TOKEN_2022_PROGRAM_ID
);

//transfer the tokens
const signature = await transfer(
    connection, 
    sender, 
    sourceTokenAccount.address,
    destinationTokenAccount.address,
    sender,
    1 * MINOR_UNITS_PER_MAJOR_UNITS,
    [],
    {},
    TOKEN_2022_PROGRAM_ID
);

const explorerLink = getExplorerLink("transaction",signature, "devnet" );
console.log(`Transaction confirmed, explorer link is ${explorerLink}!`);