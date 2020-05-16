import fileBuilders from './fileBuilders';

const DEFAULT_PACK_META = {
  name: 'MC Paintings Pack',
  description: 'Generated at mcpaintings.com',
  packFormat: 5,
  resolution: 16,
  extension: 'zip',
  fileBuilder: fileBuilders.java,
};

export default DEFAULT_PACK_META;
