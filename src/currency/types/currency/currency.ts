/* eslint-disable */
import * as Long from 'long'
import { util, configure, Writer, Reader } from 'protobufjs/minimal'

export const protobufPackage = 'imversed.currency'

export interface Currency {
  denom: string
  owner: string
  icon: string
}

/** Params defines the parameters for the module. */
export interface Params {
  txMintCurrencyCost: number
}

const baseCurrency: object = { denom: '', owner: '', icon: '' }

export const Currency = {
  encode(message: Currency, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    if (message.owner !== '') {
      writer.uint32(18).string(message.owner)
    }
    if (message.icon !== '') {
      writer.uint32(26).string(message.icon)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Currency {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseCurrency } as Currency
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        case 2:
          message.owner = reader.string()
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

  fromJSON(object: any): Currency {
    const message = { ...baseCurrency } as Currency
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = String(object.owner)
    } else {
      message.owner = ''
    }
    if (object.icon !== undefined && object.icon !== null) {
      message.icon = String(object.icon)
    } else {
      message.icon = ''
    }
    return message
  },

  toJSON(message: Currency): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    message.owner !== undefined && (obj.owner = message.owner)
    message.icon !== undefined && (obj.icon = message.icon)
    return obj
  },

  fromPartial(object: DeepPartial<Currency>): Currency {
    const message = { ...baseCurrency } as Currency
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    if (object.owner !== undefined && object.owner !== null) {
      message.owner = object.owner
    } else {
      message.owner = ''
    }
    if (object.icon !== undefined && object.icon !== null) {
      message.icon = object.icon
    } else {
      message.icon = ''
    }
    return message
  }
}

const baseParams: object = { txMintCurrencyCost: 0 }

export const Params = {
  encode(message: Params, writer: Writer = Writer.create()): Writer {
    if (message.txMintCurrencyCost !== 0) {
      writer.uint32(8).uint64(message.txMintCurrencyCost)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): Params {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseParams } as Params
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.txMintCurrencyCost = longToNumber(reader.uint64() as Long)
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
    if (object.txMintCurrencyCost !== undefined && object.txMintCurrencyCost !== null) {
      message.txMintCurrencyCost = Number(object.txMintCurrencyCost)
    } else {
      message.txMintCurrencyCost = 0
    }
    return message
  },

  toJSON(message: Params): unknown {
    const obj: any = {}
    message.txMintCurrencyCost !== undefined &&
      (obj.txMintCurrencyCost = message.txMintCurrencyCost)
    return obj
  },

  fromPartial(object: DeepPartial<Params>): Params {
    const message = { ...baseParams } as Params
    if (object.txMintCurrencyCost !== undefined && object.txMintCurrencyCost !== null) {
      message.txMintCurrencyCost = object.txMintCurrencyCost
    } else {
      message.txMintCurrencyCost = 0
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
