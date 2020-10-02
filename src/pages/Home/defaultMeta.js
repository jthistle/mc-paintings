import fileBuilders from './fileBuilders';

const DEFAULT_PACK_META = {
  name: 'MC Paintings Pack',
  description: 'Generated at mcpaintings.com',
  packFormat: 6,
  resolution: 16,
  extension: 'zip',
  fileBuilder: fileBuilders.java,
  versionTag: '1_16',
};

export default DEFAULT_PACK_META;
