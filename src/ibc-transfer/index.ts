// THIS FILE IS GENERATED AUTOMATICALLY. DO NOT MODIFY.

import { StdFee } from "@imversed/stargate"
import { SigningStargateClient } from "@imversed/stargate"
import { Registry, OfflineSigner, EncodeObject, DirectSecp256k1HdWallet } from "@imversed/proto-signing"
import { Api } from "./rest"
import { MsgTransfer } from "./types/ibc/applications/transfer/v1/tx"

const types = [
  ["/ibc.applications.transfer.v1.MsgTransfer", MsgTransfer],

]
export const MissingWalletError = new Error("wallet is required")

export const registry = new Registry(types as any)

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
  } else {
    client = await SigningStargateClient.offline( wallet, { registry })
  }
  const { address } = (await wallet.getAccounts())[0]

  return {
    signAndBroadcast: (msgs: EncodeObject[], { fee, memo }: SignAndBroadcastOptions = {fee: defaultFee, memo: ""}) => client.signAndBroadcast(address, msgs, fee, memo),
    msgTransfer: (data: MsgTransfer): EncodeObject => ({ typeUrl: "/ibc.applications.transfer.v1.MsgTransfer", value: MsgTransfer.fromPartial( data ) }),

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
