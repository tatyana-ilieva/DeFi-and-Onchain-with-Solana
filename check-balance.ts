import "dotenv/config";
import{
    Connection, 
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl,
} from "@solana/web3.js"

const connection = new Connection(clusterApiUrl("devnet"));
console.log(`Connected to the devnet`);
const publicKey = new PublicKey('AvtLubkx7SfqDxgM5s5unFMa453dSy33kYUECLxxhy6g');

const balanceInLamports = await connection.getBalance(publicKey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(`Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`);