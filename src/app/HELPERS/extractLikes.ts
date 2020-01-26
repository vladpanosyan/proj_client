export function extractLikes(item: any): number | null {
  console.log(item, 4444);
  // return 10
  if (item.likes) {
    return item.likes;
  } else if (item.questionManyLikes) {
    return item.questionManyLikes;
  } else {
    return null;
  }
}
