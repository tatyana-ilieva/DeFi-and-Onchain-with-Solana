import "dotenv/config";
import { createMemoInstruction } from "@solana/spl-memo";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction, 
    clusterApiUrl,
    Connection,
    sendAndConfirmTransaction
}from "@solana/web3.js";

const sender = getKeypairFromEnvironment("SECRET_KEY");
const connection = new Connection(clusterApiUrl("devnet"));
console.log(
    `Loaded our keypair securely, using an env file! Our public key is: ${sender.publicKey.toBase58()}`
);

const recipient = new PublicKey('2tjvafYL4jkGYiEzHd6P7uJk9rJSnDixJ6k1ix7vQbMD');
console.log(`Attempting to send 0.01 SOL to ${recipient.toBase58()}...`);

const transaction = new Transaction();
const sendSolInstruction = SystemProgram.transfer({
    fromPubkey: sender.publicKey,
    toPubkey: recipient, 
    lamports: 0.01 * LAMPORTS_PER_SOL,
});

transaction.add(sendSolInstruction);

const addMemoInstruction = createMemoInstruction("Hello from Solana!");
transaction.add(addMemoInstruction);
console.log(`memo is ${addMemoInstruction.data}...`);

const signature = await sendAndConfirmTransaction(connection, transaction, [
    sender,
]);

console.log(`Transaction confirmed, signature: ${signature}!`);