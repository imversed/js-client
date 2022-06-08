/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { Coin } from '../cosmos/base/v1beta1/coin'

export const protobufPackage = 'imversed.currency'

export interface MsgIssue {
  sender: string
  denom: string
  icon: string
}

export interface MsgIssueResponse {}

export interface MsgMint {
  sender: string
  coin: Coin | undefined
}

export interface MsgMintResponse {}

const baseMsgIssue: object = { sender: '', denom: '', icon: '' }

export const MsgIssue = {
  encode(message: MsgIssue, writer: Writer = Writer.create()): Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender)
    }
    if (message.denom !== '') {
      writer.uint32(18).string(message.denom)
    }
    if (message.icon !== '') {
      writer.uint32(26).string(message.icon)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgIssue {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgIssue } as MsgIssue
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string()
          break
        case 2:
          message.denom = reader.string()
          break
        case 3:
          message.icon = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgIssue {
    const message = { ...baseMsgIssue } as MsgIssue
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.icon !== undefined && object.icon !== null) {
      message.icon = String(object.icon)
    } else {
      message.icon = ''
    }
    return message
  },

  toJSON(message: MsgIssue): unknown {
    const obj: any = {}
    message.sender !== undefined && (obj.sender = message.sender)
    message.denom !== undefined && (obj.denom = message.denom)
    message.icon !== undefined && (obj.icon = message.icon)
    return obj
  },

  fromPartial(object: DeepPartial<MsgIssue>): MsgIssue {
    const message = { ...baseMsgIssue } as MsgIssue
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.icon !== undefined && object.icon !== null) {
      message.icon = object.icon
    } else {
      message.icon = ''
    }
    return message
  }
}

const baseMsgIssueResponse: object = {}

export const MsgIssueResponse = {
  encode(_: MsgIssueResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgIssueResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgIssueResponse } as MsgIssueResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgIssueResponse {
    const message = { ...baseMsgIssueResponse } as MsgIssueResponse
    return message
  },

  toJSON(_: MsgIssueResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgIssueResponse>): MsgIssueResponse {
    const message = { ...baseMsgIssueResponse } as MsgIssueResponse
    return message
  }
}

const baseMsgMint: object = { sender: '' }

export const MsgMint = {
  encode(message: MsgMint, writer: Writer = Writer.create()): Writer {
    if (message.sender !== '') {
      writer.uint32(10).string(message.sender)
    }
    if (message.coin !== undefined) {
      Coin.encode(message.coin, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMint {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMint } as MsgMint
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string()
          break
        case 2:
          message.coin = Coin.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): MsgMint {
    const message = { ...baseMsgMint } as MsgMint
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender)
    } else {
      message.sender = ''
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromJSON(object.coin)
    } else {
      message.coin = undefined
    }
    return message
  },

  toJSON(message: MsgMint): unknown {
    const obj: any = {}
    message.sender !== undefined && (obj.sender = message.sender)
    message.coin !== undefined && (obj.coin = message.coin ? Coin.toJSON(message.coin) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<MsgMint>): MsgMint {
    const message = { ...baseMsgMint } as MsgMint
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender
    } else {
      message.sender = ''
    }
    if (object.coin !== undefined && object.coin !== null) {
      message.coin = Coin.fromPartial(object.coin)
    } else {
      message.coin = undefined
    }
    return message
  }
}

const baseMsgMintResponse: object = {}

export const MsgMintResponse = {
  encode(_: MsgMintResponse, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): MsgMintResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseMsgMintResponse } as MsgMintResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(_: any): MsgMintResponse {
    const message = { ...baseMsgMintResponse } as MsgMintResponse
    return message
  },

  toJSON(_: MsgMintResponse): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<MsgMintResponse>): MsgMintResponse {
    const message = { ...baseMsgMintResponse } as MsgMintResponse
    return message
  }
}

/** Msg defines the Msg service. */
export interface Msg {
  Issue(request: MsgIssue): Promise<MsgIssueResponse>
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Mint(request: MsgMint): Promise<MsgMintResponse>
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Issue(request: MsgIssue): Promise<MsgIssueResponse> {
    const data = MsgIssue.encode(request).finish()
    const promise = this.rpc.request('imversed.currency.Msg', 'Issue', data)
    return promise.then((data) => MsgIssueResponse.decode(new Reader(data)))
  }

  Mint(request: MsgMint): Promise<MsgMintResponse> {
    const data = MsgMint.encode(request).finish()
    const promise = this.rpc.request('imversed.currency.Msg', 'Mint', data)
    return promise.then((data) => MsgMintResponse.decode(new Reader(data)))
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>
}

type Builtin = Date | Function | Uint8Array | string | number | undefined
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>
