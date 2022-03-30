import { useState, useEffect } from 'react'

function FilterFunctions({ addActions, actions, selection }) {

    /* Filter Operations */
    const [filteredSelection, setFilteredSelection] = useState(actions);

    const filteredCompleted = actions.filter((element) => {
        return element.isActive === false
    })

    const filteredActive = actions.filter((element) => {
        return element.isActive === true
    })

    const filteredNone = actions

    useEffect(() => {
        if (selection === "filteredCompleted") {
            setFilteredSelection(filteredCompleted)
        } else if (selection === "filteredActive") {
            setFilteredSelection(filteredActive)
        } else if (selection === "filteredNone") {
            setFilteredSelection(filteredNone)
        }
    }, [selection, actions.length])

    // TodoListUpdate
    const onChangeInput = (e) => {
        const updatedTodos = [...actions];
        updatedTodos.every(element => {
            if ((element.id.toString()) === e.target.id) {
                element.actionName = e.target.value
                console.log(element.actionName, e.target.value)
                return false
            } else return true
        });
        localStorage.setItem("TodoListKeys", JSON.stringify(updatedTodos))
        addActions(updatedTodos)
    }

    const onChangeCheckItem = (e) => {

        const updatedTodos = [...actions];
        updatedTodos.every(element => {

            if (element.id == e.target.value) {
                if (element.isActive == true) {
                    element.isActive = false
                } else {
                    element.isActive = true
                }
                return false
            } else {
                return true
            }
        });

        localStorage.setItem("TodoListKeys", JSON.stringify(updatedTodos))
        addActions(updatedTodos)

        const activeControl = updatedTodos.every(element => {
            return element.isActive == false
        })
        setCheckboxInputCheckedAllControl(activeControl)
    }

    const bigCheckboxControl = actions.every((elementObject) => {
        return elementObject.isActive == false
    })

    const [checkboxInputCheckedAllControl, setCheckboxInputCheckedAllControl] = useState(bigCheckboxControl);

    const onChangeCheckAll = (e) => {
        let updatedTodos = [...actions];
        if (checkboxInputCheckedAllControl == true) {
            updatedTodos.forEach(elementObject => {
                elementObject.isActive = true
            })
            setCheckboxInputCheckedAllControl(false)
        }

        else {
            updatedTodos.forEach(elementObject => {
                elementObject.isActive = false
            })
            setCheckboxInputCheckedAllControl(true)
        }

        localStorage.setItem("TodoListKeys", JSON.stringify(updatedTodos))
        addActions(updatedTodos)
    }

    // TodoListDelete
    const onClickButton = (e) => {
        const newTodosAfterDeletion = actions.filter((item) => {
            return e.target.value != item.id
        })
        localStorage.setItem("TodoListKeys", JSON.stringify(newTodosAfterDeletion))
        addActions(newTodosAfterDeletion)
    }

    useEffect(() => {
        if (actions.length == 0) {
            setCheckboxInputCheckedAllControl(false)
        }
    }, [actions.length])
    
    return (
        <section className='main'>
            <input
                type="checkbox" className='toggle-all' id="checkAllBox"
                hidden={actions.length == 0 ? "hidden" : ""}
                checked={checkboxInputCheckedAllControl == false ? "" : "checked"} onChange={onChangeCheckAll} />
            {/* <label htmlFor="toggle-all"> */}
            <label htmlFor="checkAllBox" hidden={actions.length == 0 ? "hidden" : ""}>
                Mark all as complete
            </label>
            <ul className='todo-list'>
                {filteredSelection.map((todo, index) => (
                    <li key={index} className={todo.isActive === true ? "" : "completed"} >
                        <div className='view'>
                            <input className='toggle'
                                checked={(todo.isActive === false) ? 'checked' : ''}
                                type="checkbox" value={todo.id} onChange={onChangeCheckItem} />
                            <label><input className="todoListItemInput" name="actionName" id={todo.id} value={todo.actionName} onChange={onChangeInput} /></label>
                            <div className='btn' >
                                <button className="destroy" value={todo.id} onClick={onClickButton}></button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export { FilterFunctions }