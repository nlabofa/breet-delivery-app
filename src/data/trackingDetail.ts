import { type TrackingEvent } from '@/types';

import { emoji } from './emoji';

export const eta = {
  label: 'Estimate arrives in',
  value: '2h 40m',
};

export const buildSummary = (receipt: string) => [
  { id: 'origin', title: 'Sukabumi, Indonesia', subtitle: `No receipt : ${receipt}` },
  { id: 'fee', title: '2,50 USD', subtitle: 'Postal fee' },
  { id: 'destination', title: 'Bali, Indonesia', subtitle: 'Parcel, 24kg' },
];

export const trackingEvents: TrackingEvent[] = [
  {
    id: 'in-delivery',
    title: 'In Delivery',
    location: 'Bali, Indonesia',
    time: '00.00 PM',
    emoji: emoji.truck,
    highlighted: true,
  },
  {
    id: 'transit',
    title: 'Transit - Sending City',
    location: 'Jakarta, Indonesia',
    time: '21.00 PM',
    emoji: emoji.mailbox,
    highlighted: false,
  },
  {
    id: 'sent',
    title: 'Send Form Sukabumi',
    location: 'Sukabumi, Indonesia',
    time: '19.00 PM',
    emoji: emoji.package,
    highlighted: false,
  },
];
