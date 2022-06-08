/* eslint-disable */
import { Reader, Writer } from 'protobufjs/minimal'
import { Currency, Params } from '../currency/currency'
import { PageRequest, PageResponse } from '../cosmos/base/query/v1beta1/pagination'

export const protobufPackage = 'imversed.currency'

export interface QueryGetCurrencyRequest {
  denom: string
}

export interface QueryGetCurrencyResponse {
  currency: Currency | undefined
}

export interface QueryAllCurrencyRequest {
  pagination: PageRequest | undefined
}

export interface QueryAllCurrencyResponse {
  currency: Currency[]
  pagination: PageResponse | undefined
}

/** QueryParamsRequest is request type for the Query/Params RPC method. */
export interface QueryParamsRequest {}

/** QueryParamsResponse is response type for the Query/Params RPC method. */
export interface QueryParamsResponse {
  /** params holds all the parameters of this module. */
  params: Params | undefined
}

const baseQueryGetCurrencyRequest: object = { denom: '' }

export const QueryGetCurrencyRequest = {
  encode(message: QueryGetCurrencyRequest, writer: Writer = Writer.create()): Writer {
    if (message.denom !== '') {
      writer.uint32(10).string(message.denom)
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCurrencyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCurrencyRequest } as QueryGetCurrencyRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.denom = reader.string()
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCurrencyRequest {
    const message = { ...baseQueryGetCurrencyRequest } as QueryGetCurrencyRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = String(object.denom)
    } else {
      message.denom = ''
    }
    return message
  },

  toJSON(message: QueryGetCurrencyRequest): unknown {
    const obj: any = {}
    message.denom !== undefined && (obj.denom = message.denom)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCurrencyRequest>): QueryGetCurrencyRequest {
    const message = { ...baseQueryGetCurrencyRequest } as QueryGetCurrencyRequest
    if (object.denom !== undefined && object.denom !== null) {
      message.denom = object.denom
    } else {
      message.denom = ''
    }
    return message
  }
}

const baseQueryGetCurrencyResponse: object = {}

export const QueryGetCurrencyResponse = {
  encode(message: QueryGetCurrencyResponse, writer: Writer = Writer.create()): Writer {
    if (message.currency !== undefined) {
      Currency.encode(message.currency, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryGetCurrencyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryGetCurrencyResponse } as QueryGetCurrencyResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.currency = Currency.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryGetCurrencyResponse {
    const message = { ...baseQueryGetCurrencyResponse } as QueryGetCurrencyResponse
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = Currency.fromJSON(object.currency)
    } else {
      message.currency = undefined
    }
    return message
  },

  toJSON(message: QueryGetCurrencyResponse): unknown {
    const obj: any = {}
    message.currency !== undefined &&
      (obj.currency = message.currency ? Currency.toJSON(message.currency) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryGetCurrencyResponse>): QueryGetCurrencyResponse {
    const message = { ...baseQueryGetCurrencyResponse } as QueryGetCurrencyResponse
    if (object.currency !== undefined && object.currency !== null) {
      message.currency = Currency.fromPartial(object.currency)
    } else {
      message.currency = undefined
    }
    return message
  }
}

const baseQueryAllCurrencyRequest: object = {}

export const QueryAllCurrencyRequest = {
  encode(message: QueryAllCurrencyRequest, writer: Writer = Writer.create()): Writer {
    if (message.pagination !== undefined) {
      PageRequest.encode(message.pagination, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCurrencyRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCurrencyRequest } as QueryAllCurrencyRequest
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.pagination = PageRequest.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCurrencyRequest {
    const message = { ...baseQueryAllCurrencyRequest } as QueryAllCurrencyRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCurrencyRequest): unknown {
    const obj: any = {}
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageRequest.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCurrencyRequest>): QueryAllCurrencyRequest {
    const message = { ...baseQueryAllCurrencyRequest } as QueryAllCurrencyRequest
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageRequest.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryAllCurrencyResponse: object = {}

export const QueryAllCurrencyResponse = {
  encode(message: QueryAllCurrencyResponse, writer: Writer = Writer.create()): Writer {
    for (const v of message.currency) {
      Currency.encode(v!, writer.uint32(10).fork()).ldelim()
    }
    if (message.pagination !== undefined) {
      PageResponse.encode(message.pagination, writer.uint32(18).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAllCurrencyResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryAllCurrencyResponse } as QueryAllCurrencyResponse
    message.currency = []
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.currency.push(Currency.decode(reader, reader.uint32()))
          break
        case 2:
          message.pagination = PageResponse.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryAllCurrencyResponse {
    const message = { ...baseQueryAllCurrencyResponse } as QueryAllCurrencyResponse
    message.currency = []
    if (object.currency !== undefined && object.currency !== null) {
      for (const e of object.currency) {
        message.currency.push(Currency.fromJSON(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromJSON(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  },

  toJSON(message: QueryAllCurrencyResponse): unknown {
    const obj: any = {}
    if (message.currency) {
      obj.currency = message.currency.map((e) => (e ? Currency.toJSON(e) : undefined))
    } else {
      obj.currency = []
    }
    message.pagination !== undefined &&
      (obj.pagination = message.pagination ? PageResponse.toJSON(message.pagination) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryAllCurrencyResponse>): QueryAllCurrencyResponse {
    const message = { ...baseQueryAllCurrencyResponse } as QueryAllCurrencyResponse
    message.currency = []
    if (object.currency !== undefined && object.currency !== null) {
      for (const e of object.currency) {
        message.currency.push(Currency.fromPartial(e))
      }
    }
    if (object.pagination !== undefined && object.pagination !== null) {
      message.pagination = PageResponse.fromPartial(object.pagination)
    } else {
      message.pagination = undefined
    }
    return message
  }
}

const baseQueryParamsRequest: object = {}

export const QueryParamsRequest = {
  encode(_: QueryParamsRequest, writer: Writer = Writer.create()): Writer {
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
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

  fromJSON(_: any): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  },

  toJSON(_: QueryParamsRequest): unknown {
    const obj: any = {}
    return obj
  },

  fromPartial(_: DeepPartial<QueryParamsRequest>): QueryParamsRequest {
    const message = { ...baseQueryParamsRequest } as QueryParamsRequest
    return message
  }
}

const baseQueryParamsResponse: object = {}

export const QueryParamsResponse = {
  encode(message: QueryParamsResponse, writer: Writer = Writer.create()): Writer {
    if (message.params !== undefined) {
      Params.encode(message.params, writer.uint32(10).fork()).ldelim()
    }
    return writer
  },

  decode(input: Reader | Uint8Array, length?: number): QueryParamsResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input
    let end = length === undefined ? reader.len : reader.pos + length
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    while (reader.pos < end) {
      const tag = reader.uint32()
      switch (tag >>> 3) {
        case 1:
          message.params = Params.decode(reader, reader.uint32())
          break
        default:
          reader.skipType(tag & 7)
          break
      }
    }
    return message
  },

  fromJSON(object: any): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromJSON(object.params)
    } else {
      message.params = undefined
    }
    return message
  },

  toJSON(message: QueryParamsResponse): unknown {
    const obj: any = {}
    message.params !== undefined &&
      (obj.params = message.params ? Params.toJSON(message.params) : undefined)
    return obj
  },

  fromPartial(object: DeepPartial<QueryParamsResponse>): QueryParamsResponse {
    const message = { ...baseQueryParamsResponse } as QueryParamsResponse
    if (object.params !== undefined && object.params !== null) {
      message.params = Params.fromPartial(object.params)
    } else {
      message.params = undefined
    }
    return message
  }
}

/** Query defines the gRPC querier service. */
export interface Query {
  /** Queries a currency by index. */
  Currency(request: QueryGetCurrencyRequest): Promise<QueryGetCurrencyResponse>
  /** Queries a list of currency items. */
  CurrencyAll(request: QueryAllCurrencyRequest): Promise<QueryAllCurrencyResponse>
  /** Parameters queries the parameters of the module. */
  Params(request: QueryParamsRequest): Promise<QueryParamsResponse>
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc
  constructor(rpc: Rpc) {
    this.rpc = rpc
  }
  Currency(request: QueryGetCurrencyRequest): Promise<QueryGetCurrencyResponse> {
    const data = QueryGetCurrencyRequest.encode(request).finish()
    const promise = this.rpc.request('imversed.currency.Query', 'Currency', data)
    return promise.then((data) => QueryGetCurrencyResponse.decode(new Reader(data)))
  }

  CurrencyAll(request: QueryAllCurrencyRequest): Promise<QueryAllCurrencyResponse> {
    const data = QueryAllCurrencyRequest.encode(request).finish()
    const promise = this.rpc.request('imversed.currency.Query', 'CurrencyAll', data)
    return promise.then((data) => QueryAllCurrencyResponse.decode(new Reader(data)))
  }

  Params(request: QueryParamsRequest): Promise<QueryParamsResponse> {
    const data = QueryParamsRequest.encode(request).finish()
    const promise = this.rpc.request('imversed.currency.Query', 'Params', data)
    return promise.then((data) => QueryParamsResponse.decode(new Reader(data)))
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
