// DO NOT MODIFY

const config = require('./config.js')

const imgDir = `http://localhost:${config.port}/static/images`

function createCategoryItems(category, itemsCount) {
  let result = []

  for (let i = 1; i <= itemsCount; i++) {
    const name = `${category}_${i}`

    result.push({
      category: category,
      name: name,
      url: `${imgDir}/${category}/${name}.jpeg`,
    })
  }

  return result
}

const data = [
  ...createCategoryItems('nature', 21),
  ...createCategoryItems('architecture', 23),
  ...createCategoryItems('fashion', 22),
]

function get(category, page) {
  // Filter by category
  const filteredData = data.filter(item => category ? item.category === category : item)

  // Paginate
  const LIMIT = 3
  const startIndex = (page - 1) * LIMIT

  return filteredData.slice(startIndex, startIndex + LIMIT)
}

module.exports = {
  get
}
