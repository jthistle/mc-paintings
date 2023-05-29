import fileBuilders from './fileBuilders';

const DEFAULT_PACK_META = {
  name: 'MC Paintings Pack',
  description: 'Generated at mcpaintings.com',
  packFormat: 13,
  resolution: 256,
  extension: 'zip',
  fileBuilder: fileBuilders.java,
  versionTag: '1_19_4',
};

export default DEFAULT_PACK_META;
