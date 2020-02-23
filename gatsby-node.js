/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// exports.createPages = async function({ actions, graphql }) {
//   const { data } = await graphql(`
//     query {
//       allContentfulRecipe {
//         edges {
//           node {
//             fields {
//               url
//             }
//           }
//         }
//       }
//     }
//   `)
//   data.allMarkdownRemark.edges.forEach(edge => {
//     const slug = edge.node.fields.url
//     actions.createPage({
//       path: slug,
//       component: require.resolve(`./src/templates/recipe.js`),
//       context: { slug: slug },
//     })
//   })
// }
const path = require("path")

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const recipeTemplate = path.resolve(`src/templates/recipe.js`)
  return graphql(`
    query {
      allContentfulRecipe {
        edges {
          node {
            url
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      throw result.errors
    }
    result.data.allContentfulRecipe.edges.forEach(edge => {
      createPage({
        path: `/recipe/${edge.node.url}`,
        component: recipeTemplate,
        context: {
          slug: edge.node.url,
        },
      })
    })
  })
}
