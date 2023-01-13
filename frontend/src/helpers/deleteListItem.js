export const deleteListItem = ( id, list, setListFunction ) => {
    for (let i = 0; i <= list.length - 1; i++) {
        if (list[i].id === id) {
            const newTodoList = list.filter(n => n.id !== id);
            setListFunction([...newTodoList])
        }
    }
}