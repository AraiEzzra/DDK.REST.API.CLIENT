import { TransactionType } from 'ddk.registry/dist/model/common/transaction/type';
import { AssetReferral, AssetReferralSchema } from 'ddk.registry/dist/model/common/transaction/asset/referral';
import { AssetSend, AssetSendSchema } from 'ddk.registry/dist/model/common/transaction/asset/send';
import { AssetDelegate, AssetDelegateSchema } from 'ddk.registry/dist/model/common/transaction/asset/delegate';
import { AssetStake, AssetStakeSchema } from 'ddk.registry/dist/model/common/transaction/asset/stake';
import { AssetSignature, AssetSignatureSchema } from 'ddk.registry/dist/model/common/transaction/asset/signature';
import { AssetVote, AssetVoteSchema } from 'ddk.registry/dist/model/common/transaction/asset/vote';
import { Asset } from 'ddk.registry/dist/model/common/transaction/asset';
import { ResponseEntity } from 'ddk.registry/dist/model/common/responseEntity';
import { createAssetVote } from 'ddk.registry/dist/service/transaction/vote';
import { createAssetStake } from 'ddk.registry/dist/service/transaction/stake';
import { slotService } from 'ddk.registry/dist/service/slot';
import { Account } from 'ddk.registry/dist/model/common/account';

import { blockRepository, blockchainInfoRepository } from 'src/repository';

export const createAsset = (type: TransactionType, data: any): ResponseEntity<Asset> => {
    switch (type) {
        case TransactionType.REFERRAL:
            const assetReferral: AssetReferralSchema = {
                referral: BigInt(data.referral),
            };

            return new ResponseEntity({ data: new AssetReferral(assetReferral) });
        case TransactionType.SEND:
            const assetSend: AssetSendSchema = {
                recipientAddress: BigInt(data.recipientAddress),
                amount: data.amount,
            };

            return new ResponseEntity({ data: new AssetSend(assetSend) });
        case TransactionType.SIGNATURE:
            const assetSignature: AssetSignatureSchema = {
                publicKey: data.publicKey,
            };

            return new ResponseEntity({ data: new AssetSignature(assetSignature) });
        case TransactionType.DELEGATE:
            const assetDelegate: AssetDelegateSchema = {
                username: data.username,
            };

            return new ResponseEntity({ data: new AssetDelegate(assetDelegate) });
        case TransactionType.STAKE:
            const assetStake: AssetStakeSchema = {
                amount: data.amount,
                startTime: data.startTime,
                airdropReward: data.airdropReward,
            };

            return new ResponseEntity({ data: new AssetStake(assetStake) });
        case TransactionType.VOTE:
            const assetVote: AssetVoteSchema = {
                votes: data.votes,
                type: data.type,
                reward: data.reward,
                unstake: data.unstake,
                airdropReward: data.airdropReward,
            };

            return new ResponseEntity({ data: new AssetVote(assetVote) });
        default:
            return new ResponseEntity({ errors: ['Unknown transaction type'] });
    }
};

export const calculateAsset = async (
    transaction: {
        type: TransactionType;
        asset: any;
    },
    sender?: Account,
): Promise<ResponseEntity<Asset | any>> => {
    switch (transaction.type) {
        case TransactionType.STAKE:
            const assetStake = createAssetStake({
                createdAt: slotService.getTime(),
                amount: transaction.asset.amount,
            },
                sender,
                blockchainInfoRepository.airdropBalance,
            );

            return new ResponseEntity({ data: assetStake });
        case TransactionType.VOTE:
            const assetVote = createAssetVote({
                createdAt: slotService.getTime(),
                type: transaction.asset.type,
                votes: transaction.asset.votes,
            },
                sender,
                blockRepository.lastBlockHeight,
                blockchainInfoRepository.airdropBalance,
            );

            return new ResponseEntity({ data: assetVote });
        default:
            return createAsset(transaction.type, transaction.asset);
    }
};
