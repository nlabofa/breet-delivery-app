import { render, screen } from '@testing-library/react-native';
import { makeMutable } from 'react-native-reanimated';

import { sizes } from '@/theme';
import { scale } from '@/utils/scale';

import { PageDots } from '../PageDots';

const ACTIVE = '#000000';
const INACTIVE = '#FFFFFF';

const renderDots = (count: number, progress: number, stretch?: number) =>
  render(
    <PageDots
      count={count}
      progress={makeMutable(progress)}
      activeColor={ACTIVE}
      inactiveColor={INACTIVE}
      spacing={12}
      stretch={stretch === undefined ? undefined : makeMutable(stretch)}
    />,
  );

describe('PageDots', () => {
  it('renders one dot per page', async () => {
    await renderDots(6, 0);

    expect(screen.getAllByTestId('page-dot')).toHaveLength(6);
  });

  it('highlights the dot for the current page only', async () => {
    await renderDots(3, 1);

    const [first, second, third] = screen.getAllByTestId('page-dot');
    expect(first).toHaveAnimatedStyle({ backgroundColor: 'rgba(255, 255, 255, 1)' });
    expect(second).toHaveAnimatedStyle({ backgroundColor: 'rgba(0, 0, 0, 1)' });
    expect(third).toHaveAnimatedStyle({ backgroundColor: 'rgba(255, 255, 255, 1)' });
  });

  it('keeps every dot round at rest', async () => {
    await renderDots(3, 1, 0);

    for (const dot of screen.getAllByTestId('page-dot')) {
      expect(dot).toHaveAnimatedStyle({ width: sizes.dot });
    }
  });

  it('stretches the active dot while swiping', async () => {
    await renderDots(3, 1, 1);

    const [first, second] = screen.getAllByTestId('page-dot');
    expect(second).toHaveAnimatedStyle({ width: sizes.dot + scale(10) });
    expect(first).toHaveAnimatedStyle({ width: sizes.dot });
  });
});
