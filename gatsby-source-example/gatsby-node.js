const items = require('./data.json')
const axios = require('axios')

exports.createSchemaCustomization = async ({ actions: { createNode }, createNodeId, createContentDigest }) => {
  const { data: dinosaurs } = await axios.get('https://dinos.now.sh/')
    console.log(dinosaurs);

    Object.values(dinosaurs).forEach(key => {
      const nodeMeta = {
        id: createNodeId(`${key.name} >>> Example `),
        parent: null,
        children: [],
        internal: {
          type: 'example',
          mediaType: 'text/html',
          content: JSON.stringify(dinosaurs),
          contentDigest: createContentDigest(dinosaurs)
        },
      }

      createNode({
        ...nodeMeta,
        ...dinosaurs
      })
    })

    return;
}
