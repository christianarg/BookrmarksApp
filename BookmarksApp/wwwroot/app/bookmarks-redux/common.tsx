import { TagModelState } from "./bookmark-model";

export const ulStyle: React.CSSProperties = { listStyleType: 'none', paddingInlineStart: 0 };


function hasText(text: string, searchText: string) {
    return text.toLowerCase().includes(searchText.toLowerCase());
}

//export function filterTags(tags: TagModelState[], searchText: string) {
//    tags.forEach(tag => {
//        tag.bookmarks.forEach(bookmark => bookmark.hidden = !hasText(bookmark.name, searchText));
//        const anyBookmarkVisible = tag.bookmarks.some(b => !b.hidden);
//        const tagNameHasText = hasText(tag.name, searchText);
//        const anySubTagsVisible = tag.subTags && tag.subTags.some(t => !t.hidden);
//        tag.hidden = !tagNameHasText && !anyBookmarkVisible && !anySubTagsVisible;
//        if (tag.subTags) {
//            filterTags(tag.subTags, searchText);
//        }
//    });
//}

//export function replaceTag(tags: TagModelState[], newTag: TagModelState): TagModelState[] {
//    const newTags = tags.map(tag => tag.name == newTag.name ? newTag : tag);

//    newTags.forEach(tag => {
//        if (tag.subTags) {
//            tag.subTags = replaceTag(tag.subTags, newTag);
//        }
//    });
//    return newTags;
//}

