import { useState } from "react"
function BottomBarIndex({ actions, updateSelection, addActions }) {

    const [buttonSelected, setButtonSelected] = useState("All");

    const numberOfUnCompletedActions = actions.filter((item) => {
        return item.isActive === true
    })

    const numberOfCompletedActions = actions.filter((item) => {
        return item.isActive === false
    })

    let lengthNumberOfUnCompletedActions = numberOfUnCompletedActions.length
    let lengthNumberOfCompletedActions = numberOfCompletedActions.length

    const clearCompletedFunc = () => {
        localStorage.setItem("TodoListKeys", JSON.stringify(numberOfUnCompletedActions))
        addActions(numberOfUnCompletedActions)
    }

    return (
        <>
            <footer className="footer">
                <span className="todo-count"><strong>{lengthNumberOfUnCompletedActions}</strong> items left</span>
                <ul className="filters">
                    <li>
                        <button className={`BottomBarButtons ${buttonSelected === "All" ? "selected" : ""}`} onClick={(e) => {
                            updateSelection(e.target.value)
                            setButtonSelected("All")
                        }}
                            value={"filteredNone"} >
                            All
                        </button>
                    </li>
                    <li>
                        <button className={`BottomBarButtons ${buttonSelected === "Active" ? "selected" : ""}`} onClick={(e) => {
                            updateSelection(e.target.value)
                            setButtonSelected("Active")
                        }} value={"filteredActive"}>Active</button>
                    </li>
                    <li>
                        <button className={`BottomBarButtons ${buttonSelected === "Completed" ? "selected" : ""}`} onClick={(e) => {
                            updateSelection(e.target.value)
                            setButtonSelected("Completed")
                        }} value={"filteredCompleted"}>Completed</button>
                    </li>
                </ul>
                <div className='btn' >
                    <button hidden={(lengthNumberOfCompletedActions === 0) ? 'hidden' : ''}
                        className="clear-completed" onClick={clearCompletedFunc} value={"clearedCompleted"}>
                        Clear completed
                    </button>
                </div>
            </footer>
        </>
    )
}

export { BottomBarIndex }
