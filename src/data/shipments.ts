import { type Shipment } from '@/types';

import { emoji } from './emoji';

export const shipments: Shipment[] = [
  { id: 'shipment-1', receipt: 'SCP9374826473', status: 'In the process', emoji: emoji.package },
  { id: 'shipment-2', receipt: 'SCP6653728497', status: 'In delivery', emoji: emoji.truck },
];
