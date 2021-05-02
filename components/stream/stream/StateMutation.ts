/**
 * add item to array state
 */
export function addToList(new_item, react_setter) {
    react_setter((list) => list.concat(new_item));
}

/**
 * remove item from array state that has id
 */
export function removeFromListUsingId(item, react_setter) {
    react_setter((items) =>
        items.filter((i) => item.id !== i.id)
    );
}