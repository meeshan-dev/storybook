import { expect, test } from '@playwright/experimental-ct-react';
import { AdvancedFileUpload } from './advanced-file-upload';

test('AdvancedFileUpload Component', async ({ mount, page }) => {
  const component = await mount(<AdvancedFileUpload />);

  await component.getByLabel('Upload Files').setInputFiles([
    {
      name: 'app.zen_browser.zen.flatpakref',
      mimeType: 'application/octet-stream',
      buffer: Buffer.alloc(10 * 1024 * 1024),
    },
    {
      name: 'bb185392-b018-4711-9b99-af16a3663656.webm',
      mimeType: 'video/webm',
      buffer: Buffer.alloc(10 * 1024 * 1024),
    },
  ]);

  const pauseResumeFile = async (
    fileName: string,
    pauseAt: number,
    resumeAfter: number,
  ) => {
    const fileLocator = component.getByText(fileName);

    await expect(
      fileLocator,
      `File ${fileName} should be visible`,
    ).toBeVisible();

    // const progressbar = fileLocator.getByRole('progressbar');

    // test.step(`Pausing upload at ${pauseAt}%`, async () => {
    // await expect
    //   .poll(async () => await progressbar.getAttribute('aria-valuenow'), {
    //     timeout: 20000,
    //     message: `Waiting to reach at least ${pauseAt}% progress`,
    //   })
    //   .toBeGreaterThanOrEqual(pauseAt);

    const pauseButton = fileLocator.getByLabel('Pause');
    await pauseButton.click();
    // });

    // test.step(`Resuming upload after ${resumeAfter}ms`, async () => {
    await page.waitForTimeout(resumeAfter);
    const resumeButton = fileLocator.getByLabel('Resume');
    await resumeButton.click();
    // });
  };

  await pauseResumeFile('app.zen_browser.zen.flatpakref', 30, 2000);
  await pauseResumeFile('bb185392-b018-4711-9b99-af16a3663656.webm', 50, 3000);
});
