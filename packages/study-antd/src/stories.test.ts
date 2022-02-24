import path from 'path';  
import init from '@storybook/addon-storyshots';
import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

const getMatchOptions = ({ context: { fileName } } : { context: any }) => {
  // Generates a custom path based on the file name and the custom directory.
  const snapshotPath = path.join(path.dirname(fileName), '__snapshots__');
  return { customSnapshotsDir: snapshotPath };
};

init({
  // your own configuration
  test: imageSnapshot({
    storybookUrl: 'http://localhost:6002',
    // invoke the function above here
    getMatchOptions,
  }),
});