import { render, screen, userEvent } from '@testing-library/react-native';
import * as Haptics from 'expo-haptics';
import { Text } from 'react-native';

import { PillButton } from '../PillButton';

describe('PillButton', () => {
  it('renders the label as a button', async () => {
    await render(<PillButton label="Track Now" onPress={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Track Now' })).toBeOnTheScreen();
  });

  it('calls onPress and plays a light haptic', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(<PillButton label="Track Now" onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'Track Now' }));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalledWith(Haptics.ImpactFeedbackStyle.Light);
  });

  it('prefers accessibilityLabel over the visible label', async () => {
    await render(
      <PillButton label="Login" accessibilityLabel="Login with Google" onPress={jest.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Login with Google' })).toBeOnTheScreen();
  });

  it('renders leading and trailing content', async () => {
    await render(
      <PillButton
        label="Your Orders"
        onPress={jest.fn()}
        leading={<Text>lead</Text>}
        trailing={<Text>trail</Text>}
      />,
    );

    expect(screen.getByText('lead')).toBeOnTheScreen();
    expect(screen.getByText('trail')).toBeOnTheScreen();
  });
});
