import { FilterFunctions } from './ListFilterOperations/FilterFunctions'

function ListIndex({ actions, selection, addActions }) {

    return (
        <>
            <FilterFunctions addActions={addActions} actions={actions} selection={selection} />
        </>
    )
}

export { ListIndex }
