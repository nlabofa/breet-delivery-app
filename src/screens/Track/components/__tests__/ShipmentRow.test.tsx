import { render, screen, userEvent } from '@testing-library/react-native';

import { type Shipment } from '@/types';

import { ShipmentRow } from '../ShipmentRow';

const shipment: Shipment = {
  id: 'shipment-1',
  receipt: 'SCP9374826473',
  status: 'In the process',
  emoji: 1,
};

describe('ShipmentRow', () => {
  it('shows the receipt and status', async () => {
    await render(<ShipmentRow shipment={shipment} onPress={jest.fn()} />);

    expect(screen.getByText(shipment.receipt)).toBeOnTheScreen();
    expect(screen.getByText(shipment.status)).toBeOnTheScreen();
  });

  it('passes its shipment to onPress', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(<ShipmentRow shipment={shipment} onPress={onPress} />);

    await user.press(
      screen.getByRole('button', { name: `${shipment.receipt}, ${shipment.status}` }),
    );

    expect(onPress).toHaveBeenCalledWith(shipment);
  });
});
