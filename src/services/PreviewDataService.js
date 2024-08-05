// import addToCategory from '../assets/utils/hashMapsFunctions'

export function getPreviewDataService() {
  const sample = require('../assets/mock-data/FE_assginment.json')
  return sample;
}

export function getProjectGoal(projectData) {
  return {
    title: projectData?.name,
    clientGoal: projectData?.client_goals,
    totalPrice: projectData?.price_total,
  }
}

export function getPreviewScope(scopeTasks) {
  let hashMap = {};
  const categoryList = [];
  let totalCategoryPrice = {};
  if (scopeTasks.lenght === 0) {
    return [];
  }
  scopeTasks.forEach(task => {
    if (!hashMap[task.category_name]) {
      hashMap[task.category_name] = [];
      categoryList.push(task.category_name);
      totalCategoryPrice[task.category_name] = 0;
    }
    totalCategoryPrice[task.category_name] += task.price;
    hashMap[task.category_name].push(task);
  });
  return {
    hashMap,
    categoryList,
    totalCategoryPrice
  }
}
