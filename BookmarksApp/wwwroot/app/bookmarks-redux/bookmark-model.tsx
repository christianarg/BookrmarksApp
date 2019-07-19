export type BookmarkModel = {
    name: string;
    url: string;
    hidden?: boolean;
};

export type TagModelState = {
    name: string;
    subTags?: string[];
    bookmarks: string[];
    hidden?: boolean;
}

export type AddOrEditTagResult = TagModelState & { oldName?: string; }

export type EditBookmark = BookmarkModel & { oldName: string };
