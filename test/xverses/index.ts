import { expect } from 'chai'
import { loadWallet } from '../../src'
import { qAddr, mnemonic, denom, txAddr, pubKey, ethAddress } from '../utils/env'
import { xverse } from '../../lib'
import * as faker from 'faker'
import * as amino from '@imversed/amino'
import * as stargete from '@imversed/stargate'
import { SigningStargateClient } from '@imversed/stargate'
import { registry } from '../../src/xverse'
import { AminoMsg, StdFee } from '@imversed/amino/build/signdoc'
import * as protoSign from '@imversed/proto-signing'
import { serializeSignDoc } from '@imversed/amino'
import Long from 'long'
import { Any } from 'cosmjs-types/google/protobuf/any'
import { EncodeObject } from '@imversed/proto-signing/build/registry'
import { SignMode } from 'cosmjs-types/cosmos/tx/signing/v1beta1/signing'

const encoding = require('@imversed/encoding')
const long_1 = require('long')

const tx3 = require('cosmjs-types/cosmos/tx/v1beta1/tx')

const { txClient, queryClient } = xverse

describe('Xverse', () => {
  it('create verse', async () => {
    const wallet = await loadWallet(mnemonic)
    const [account] = await wallet.getAccounts()
    const q = await queryClient({ addr: qAddr })
    const { data: dataStart } = await q.queryVerseAll()

    const versesCountStart = dataStart.pagination.total

    const tx = await txClient(wallet, { addr: txAddr })

    const createMessage = tx.msgCreateVerse({
      sender: account.address,
      icon: '',
      description: 'some verse'
    })

    const createRes = await tx.signAndBroadcast([createMessage], {
      fee: {
        amount: [{
          amount: '150000000',
          denom
        }],
        gas: '200000'
      }
    })
    expect(createRes.code).to.be.eq(0)

    const { data } = await q.queryVerseAll()
    const versesCountFin = data.pagination.total
    expect(+versesCountFin).to.be.gt(+versesCountStart)
  })

  it('create verse direct sign', async () => {
    const wallet = await loadWallet(mnemonic)
    const [account] = await wallet.getAccounts()
    const q = await queryClient({ addr: qAddr })
    const tx = await txClient(wallet, { addr: txAddr })
    const { data } = await q.queryVerseAll()
    const verseToAddAsset = faker.random.arrayElement(data.verse.filter(v => v.owner === account.address))
    const someContractId = '0xaFbCB330Cb235CBda761Efd22bf16c62ea0E1f0b'

    const client = await SigningStargateClient.connectWithSigner('https://rpc-test.imversed.network', wallet, { registry })

    const createMessage = tx.msgCreateVerse({
      sender: account.address,
      icon: '',
      description: 'some verse'
    })
    // console.log('addAssetMessage', addAssetMessage)

    const fee = {
      amount: [{
        amount: '15000000',
        denom
      }],
      gas: '2000000'
    }

    const { accountNumber, sequence } = await client.getSequence(account.address)
    let pubkey = protoSign.encodePubkey({
      type: '/ethermint.crypto.v1.ethsecp256k1.PubKey',
      value: 'A0WJjUArjFrjIePaDZOEpIHSaiHj2Q54iic7+BJvjkxQ'
    })
    // console.log("pubkey", pubkey)

    const signedTx = await client
      .sign(account.address, [createMessage],
        fee,
        mnemonic
      )
    // const txBodyBytes = registry.encode(addAssetMessage)
    const txBodyBytes = signedTx.bodyBytes

    const authInfoBytes1 = protoSign.makeAuthInfoBytes([{ pubkey, sequence }], fee.amount, 200000)

    const signDoc1 = protoSign.makeSignDoc(txBodyBytes, authInfoBytes1, 'imversed_5555558-1', accountNumber)
    const { signature } = await wallet.signDirect(account.address, signDoc1, pubkey.typeUrl)

    const txR = {
      authInfoBytes: authInfoBytes1,
      bodyBytes: txBodyBytes,
      signatures: [encoding.fromBase64(signature.signature)]
    }

    console.log('txR', txR)

    const resp = await client.broadcastTx(tx3.TxRaw.encode(txR).finish())
    console.log('resp')
    console.log(resp)
  })

  it('rename verse', async () => {
    const wallet = await loadWallet(mnemonic)
    const [account] = await wallet.getAccounts()
    const q = await queryClient({ addr: qAddr })
    const tx = await txClient(wallet, { addr: txAddr })

    const { data } = await q.queryVerseAll()

    const verseToRename = faker.random.arrayElement(data.verse.filter(v => v.owner === account.address))

    // rename verse
    const newVerseName = faker.lorem.word(8)
    const renameMessage = tx.msgRenameVerse(
      {
        sender: account.address,
        verseCreator: account.address,
        verseOldName: verseToRename.name,
        verseNewName: newVerseName
      }
    )

    const renameRes = await tx.signAndBroadcast([renameMessage], {
      fee: {
        amount: [{
          amount: '15000000000',
          denom
        }],
        gas: '2000000'
      }
    })
    expect(renameRes.code).to.be.eq(0)

    const { data: renameResponse } = await q.queryVerse(newVerseName)

    expect(renameResponse.verse).to.have.all.keys(['name', 'owner', 'description', 'icon', 'smart_contracts', 'oracle', 'authenticated_keys'])
  })

  it.only('add asset bu js-client', async () => {
    const wallet = await loadWallet(mnemonic)
    const [account] = await wallet.getAccounts()
    const q = await queryClient({ addr: qAddr })
    const tx = await txClient(wallet, { addr: txAddr })
    const { data } = await q.queryVerseAll()
    const verseToAddAsset = faker.random.arrayElement(data.verse.filter(v => v.owner === account.address))
    const someContractHash = '0xaFbCB330Cb235CBda761Efd22bf16c62ea0E1f0b'


    const addAssetMessage = tx.msgAddAssetToVerse(
      {
        sender: account.address,
        verseName: verseToAddAsset.name,
        assetType: 'contract',
        assetId: someContractHash,
        assetCreator: ethAddress,
        verseCreator: account.address
      }
    )
    console.log('addAssetMessage', addAssetMessage)

    const fee = {
      amount: [{
        amount: '15000000',
        denom
      }],
      gas: '2000000'
    }

    const response = await tx.signAndBroadcast([addAssetMessage], { fee })

    console.log("response", response)
  })

})
