/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'
import { Coin } from '../../cosmos/base/v1beta1/coin'
import { Any } from '../../google/protobuf/any'

export const protobufPackage = 'imversed.pools.v1beta1'

/** Params holds parameters for the incentives module */
export interface Params {
  poolCreationFee: Coin[]
}

/** GenesisState defines the pools module's genesis state. */
export interface GenesisState {
  pools: Any[]
  nextPoolNumber: number
  params: Params | undefined
}

const baseParams: object = {}

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    for (const v of message.poolCreationFee) {
      Coin.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseParams } as Params
    message.poolCreationFee = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.poolCreationFee.push(Coin.decode(reader, reader.uint32()))
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): Params {
    const message = { ...baseParams } as Params
    message.poolCreationFee = []
    if (object.poolCreationFee !== undefined && object.poolCreationFee !== null) {
      for (const e of object.poolCreationFee) {
        message.poolCreationFee.push(Coin.fromJSON(e))
      }
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    if (message.poolCreationFee) {
      obj.poolCreationFee = message.poolCreationFee.map((e) => (e ? Coin.toJSON(e) : undefined))
    } else {
      obj.poolCreationFee = []
    }
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    message.poolCreationFee = []
    if (object.poolCreationFee !== undefined && object.poolCreationFee !== null) {
      for (const e of object.poolCreationFee) {
        message.poolCreationFee.push(Coin.fromPartial(e))
      }
    }
    return message
  }
}

const baseGenesisState: object = { nextPoolNumber: 0 }

export const GenesisState = {
  encode(message: GenesisState, writer: Writer = Writer.create()): Writer {
    for (const v of message.pools) {
      Any.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.nextPoolNumber !== 0) {
      writer.uint32(16).uint64(message.nextPoolNumber)
    }
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(26).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): GenesisState {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseGenesisState } as GenesisState
    message.pools = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pools.push(Any.decode(reader, reader.uint32()))
          break
        case 2:
          message.nextPoolNumber = longToNumber(reader.uint64() as Long)
          break
        case 3:
          message.params = Params.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.pools = []
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Any.fromJSON(e))
      }
    }
    if (object.nextPoolNumber !== undefined && object.nextPoolNumber !== null) {
      message.nextPoolNumber = Number(object.nextPoolNumber)
    } else {
      message.nextPoolNumber = 0
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    return message
  },

  toJSON(message: GenesisState): unknown {
    const obj: any = {}
    if (message.pools) {
      obj.pools = message.pools.map((e) => (e ? Any.toJSON(e) : undefined))
    } else {
      obj.pools = []
    }
    message.nextPoolNumber !== undefined && (obj.nextPoolNumber = message.nextPoolNumber)
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<GenesisState>): GenesisState {
    const message = { ...baseGenesisState } as GenesisState
    message.pools = []
    if (object.pools !== undefined && object.pools !== null) {
      for (const e of object.pools) {
        message.pools.push(Any.fromPartial(e))
      }
    }
    if (object.nextPoolNumber !== undefined && object.nextPoolNumber !== null) {
      message.nextPoolNumber = object.nextPoolNumber
    } else {
      message.nextPoolNumber = 0
    }
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    return message
  }
}

declare var self: any | undefined
declare var window: any | undefined
var globalThis: any = (() => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  throw 'Unable to locate global object'
})()

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

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error('Value is larger than Number.MAX_SAFE_INTEGER')
  }
  return long.toNumber()
}

if (util.Long !== Long) {
  util.Long = Long as any
  configure()
}
