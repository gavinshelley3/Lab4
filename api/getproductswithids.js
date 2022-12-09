const getProductWithIds = () => {
  let groceryStore = sampleProducts.map((product, index) => {
    return {
      id: index,
      ...product,
    };
  });

  return groceryStore;
};

module.export = getProductWithIds;
