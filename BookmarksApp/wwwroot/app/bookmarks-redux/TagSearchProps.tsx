import * as React from 'react';
type TagSearchProps = {
    searachText: string;
    onSearchChange: (value: string) => void;
};
export function TagSearch(props: TagSearchProps) {
    const { searachText, onSearchChange } = props;
    return (<div><input type="text" placeholder="Search tags..." value={searachText} onChange={(evt) => onSearchChange(evt.target.value)} /></div>);
}
