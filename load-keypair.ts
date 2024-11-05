import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
const keypair = getKeypairFromEnvironment("SECRET_KEY");

console.log(
    'Finshed! We have loaded our keypair securely, using an env file! Our public key is: ', keypair.publicKey.toBase58()
    );