import { SubstrateEvent } from "@subql/types";
import { StakingReward } from "../types";

const TUR = 10000000000.0;

export async function handleParachainStakingReward(substrateEvent: SubstrateEvent): Promise<void> {
  const { idx, block, event } = substrateEvent;
  const blockHeight = block.block.header.number;
  const data = event.data.toJSON();
  const attrs = {
    id: `staking-reward-${blockHeight}-${idx}`,
    block: blockHeight.toBigInt(),
    account: data[0],
    amount: data[1]/TUR
  };
  await StakingReward.create(attrs).save();
}
