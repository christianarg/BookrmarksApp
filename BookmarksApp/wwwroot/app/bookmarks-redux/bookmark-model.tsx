export type BookmarkModel = {
    name: string;
    url: string;
    hidden?: boolean;
};

export type TagModel = {
    name: string;
    subTags?: TagModel[];
    bookmarks: BookmarkModel[];
    hidden?: boolean;
}

export type TagModelState = {
    name: string;
    subTags?: string[];
    bookmarks: string[];
    hidden?: boolean;

}

export type AddOrEditTagResult = TagModel & { oldName?: string; }

export type EditBookmark = BookmarkModel & { oldName: string };
