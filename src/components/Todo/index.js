import { useState } from 'react'
import { } from './styles.css'
import { BottomBarIndex } from './BottomBar/BottomBarIndex'
import { FormIndex } from './Form/FormIndex'
import { ListIndex } from './List/ListIndex'

function Todo() {

    const exampleDataArr = [
        {
            id: 1,
            actionName: "exampleList1",
            isActive: false
        },
        {
            id: 2,
            actionName: "exampleList2",
            isActive: true
        },
        {
            id: 3,
            actionName: "exampleList3",
            isActive: false
        },
        {
            id: 4,
            actionName: "exampleList4",
            isActive: true
        },
        {
            id: 5,
            actionName: "exampleList5",
            isActive: false
        },
    ]

    const getExampleData = () => {
        localStorage.setItem("TodoListKeys", JSON.stringify(exampleDataArr))
        return JSON.parse(localStorage.getItem('TodoListKeys'))
    }

    let getDataFromLocalStorage = localStorage.getItem('TodoListKeys') ? JSON.parse(localStorage.getItem('TodoListKeys')) : getExampleData()

    const [actions, setActions] = useState(getDataFromLocalStorage)
    const [selection, setSelection] = useState('filteredNone')

    return (
        <>
            <section className='todoapp' >
                <header className='header'>
                    <h1>Todos</h1>
                    <FormIndex addActions={setActions} actions={actions} />
                </header>
                <ListIndex addActions={setActions} selection={selection} actions={actions} />
                <BottomBarIndex actions={actions} addActions={setActions} updateSelection={setSelection} />
            </section>
        </>
    )
}

export default Todo
