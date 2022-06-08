// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@cosmjs/launchpad"
import { SigningStargateClient } from "@cosmjs/stargate"
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import { Api } from "./rest"
import { MsgMintNFT } from "./types/nft/tx"
import { MsgBurnNFT } from "./types/nft/tx"
import { MsgTransferNFT } from "./types/nft/tx"
import { MsgIssueDenom } from "./types/nft/tx"
import { MsgEditNFT } from "./types/nft/tx"
import { MsgTransferDenom } from "./types/nft/tx"


const types = [
  ["/imversed.nft.MsgMintNFT", MsgMintNFT],
  ["/imversed.nft.MsgBurnNFT", MsgBurnNFT],
  ["/imversed.nft.MsgTransferNFT", MsgTransferNFT],
  ["/imversed.nft.MsgIssueDenom", MsgIssueDenom],
  ["/imversed.nft.MsgEditNFT", MsgEditNFT],
  ["/imversed.nft.MsgTransferDenom", MsgTransferDenom],
  
]
export const MissingWalletError = new Error("wallet is required")

export const registry = new Registry(<any>types)

const defaultFee = {
  amount: [],
  gas: "200000",
}

interface TxClientOptions {
  addr: string
}

interface SignAndBroadcastOptions {
  fee: StdFee,
  memo?: string
}

const txClient = async (wallet: OfflineSigner, { addr: addr }: TxClientOptions = { addr: "http://localhost:26657" }) => {
  if (!wallet) throw MissingWalletError
  let client
  if (addr) {
    client = await SigningStargateClient.connectWithSigner(addr, wallet, { registry })
  }else{
    client = await SigningStargateClient.offline( wallet, { registry })
  }
  const { address } = (await wallet.getAccounts())[0]

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee,memo),
    msgMintNFT: (data: MsgMintNFT): EncodeObject => ({ typeUrl: "/imversed.nft.MsgMintNFT", value: MsgMintNFT.fromPartial( data ) }),
    msgBurnNFT: (data: MsgBurnNFT): EncodeObject => ({ typeUrl: "/imversed.nft.MsgBurnNFT", value: MsgBurnNFT.fromPartial( data ) }),
    msgTransferNFT: (data: MsgTransferNFT): EncodeObject => ({ typeUrl: "/imversed.nft.MsgTransferNFT", value: MsgTransferNFT.fromPartial( data ) }),
    msgIssueDenom: (data: MsgIssueDenom): EncodeObject => ({ typeUrl: "/imversed.nft.MsgIssueDenom", value: MsgIssueDenom.fromPartial( data ) }),
    msgEditNFT: (data: MsgEditNFT): EncodeObject => ({ typeUrl: "/imversed.nft.MsgEditNFT", value: MsgEditNFT.fromPartial( data ) }),
    msgTransferDenom: (data: MsgTransferDenom): EncodeObject => ({ typeUrl: "/imversed.nft.MsgTransferDenom", value: MsgTransferDenom.fromPartial( data ) }),
    
  }
}

interface QueryClientOptions {
  addr: string
}

const queryClient = async ({ addr: addr }: QueryClientOptions = { addr: "http://localhost:1317" }) => {
  return new Api({ baseUrl: addr })
}

export {
  txClient,
  queryClient,
}
