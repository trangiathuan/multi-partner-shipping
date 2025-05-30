// shipment.strategy.factory.ts

import { Injectable } from '@nestjs/common';
import { GHTKStrategy } from './GHTK.strategy';
import { VIETTELPOSTStrategy } from './VIETTELPOST.stratery';
import { ShipmentStrategy } from './shipment.strategy.interface';

@Injectable()
export class ShipmentStrategyFactory {
    constructor(
        private GHTK: GHTKStrategy,
        private VIETTELPOST: VIETTELPOSTStrategy,
    ) { }

    getStrategy(partner_id: string): ShipmentStrategy {
        switch (partner_id) {
            case '5d5245fe-900e-4680-8705-62b6e334e2c2': return this.GHTK;
            case '81d6b3f2-1761-4ba5-afde-a6c66346f82e': return this.VIETTELPOST;
            default: throw new Error(`Unsupported partner: ${partner_id}`);
        }
    }
}