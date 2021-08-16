import { CamelCaseNamingConvention, SnakeCaseNamingConvention, createMapper } from '@automapper/core'
import { pojos } from '@automapper/pojos'

export default createMapper({
  name: 'mapperEntities',
  pluginInitializer: pojos,
  namingConventions: {
    source: new SnakeCaseNamingConvention(),
    destination: new CamelCaseNamingConvention(),
  },
})
