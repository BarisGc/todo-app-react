import { useState, useEffect } from 'react'

const initialFormValues = { id: "", actionName: "", isActive: true }

function FormIndex({ addActions, actions }) {

    const [form, setForm] = useState(initialFormValues);
    const [idnum, setIdNum] = useState(actions.length);

    useEffect(() => {
        setForm(initialFormValues);
        setIdNum((n) => n + 1)
        localStorage.setItem("TodoListKeys", JSON.stringify(actions))
    }, [actions])

    const onChangeInput = (e) => {
        setForm({ ...form, id: idnum, [e.target.name]: e.target.value, })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (form.actionName === "") {
            return false;
        }

        addActions([...actions, form])
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="actionName" className='new-todo'
                    placeholder="What needs to be done?" autoFocus
                    value={form.actionName}
                    onChange={onChangeInput} />
            </form>
        </div>
    )
}

export { FormIndex }
