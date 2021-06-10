import fileBuilders from './fileBuilders';

const DEFAULT_PACK_META = {
  name: 'MC Paintings Pack',
  description: 'Generated at mcpaintings.com',
  packFormat: 7,
  resolution: 64,
  extension: 'zip',
  fileBuilder: fileBuilders.java,
  versionTag: '1_17',
};

export default DEFAULT_PACK_META;
