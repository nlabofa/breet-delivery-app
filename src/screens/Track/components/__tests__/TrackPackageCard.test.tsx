import { render, screen, userEvent } from '@testing-library/react-native';

import { TrackPackageCard } from '../TrackPackageCard';

describe('TrackPackageCard', () => {
  it('shows the heading and receipt input', async () => {
    await render(<TrackPackageCard onTrackPress={jest.fn()} />);

    expect(screen.getByRole('header', { name: 'Track Your Package' })).toBeOnTheScreen();
    expect(screen.getByLabelText('Receipt number')).toBeOnTheScreen();
  });

  it('passes the typed receipt to onTrackPress when Track Now is pressed', async () => {
    const onTrackPress = jest.fn();
    const user = userEvent.setup();
    await render(<TrackPackageCard onTrackPress={onTrackPress} />);

    await user.type(screen.getByLabelText('Receipt number'), 'SCP1234');
    await user.press(screen.getByRole('button', { name: 'Track Now' }));

    expect(onTrackPress).toHaveBeenCalledWith('SCP1234');
  });

  it('tracks from the keyboard search key', async () => {
    const onTrackPress = jest.fn();
    const user = userEvent.setup();
    await render(<TrackPackageCard onTrackPress={onTrackPress} />);

    await user.type(screen.getByLabelText('Receipt number'), 'SCP5', { submitEditing: true });

    expect(onTrackPress).toHaveBeenCalledWith('SCP5');
  });

  it('sends an empty receipt so the screen can fall back to the default', async () => {
    const onTrackPress = jest.fn();
    const user = userEvent.setup();
    await render(<TrackPackageCard onTrackPress={onTrackPress} />);

    await user.press(screen.getByRole('button', { name: 'Track Now' }));

    expect(onTrackPress).toHaveBeenCalledWith('');
  });
});
