/** 
 * dispatched when article selected 
 */
export const ARTICLE_SELECTED = "ARTICLE_SELECTED";
export function articleSelected(id: string) {
  return {
    type: ARTICLE_SELECTED,
    payload: id
  }
}