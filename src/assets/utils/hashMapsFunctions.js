
export function addToCategory(hashMap, category, item) {
  if (!hashMap[category]) {
    hashMap[category] = [];
  }
  hashMap[category].push(item);
  return hashMap;
}


