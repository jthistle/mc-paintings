import fileBuilders from './fileBuilders';

const DEFAULT_PACK_META = {
  name: 'MC Paintings Pack',
  description: 'Generated at mcpaintings.com',
  packFormat: 9,
  resolution: 256,
  extension: 'zip',
  fileBuilder: fileBuilders.java,
  versionTag: '1_19',
};

export default DEFAULT_PACK_META;
