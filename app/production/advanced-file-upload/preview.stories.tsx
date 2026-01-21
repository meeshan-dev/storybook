import preview from '.storybook/preview';
import { AdvancedFileUpload } from './advanced-file-upload';

const meta = preview.meta({
  component: AdvancedFileUpload,
  title: 'Production/Advanced File Upload',
  tags: ['file upload'],
});

export default meta;

export const Default = meta.story();
