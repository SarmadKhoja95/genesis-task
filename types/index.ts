export interface IMovie {
    id: string
    photoUrL: string
    title: string
}

export interface ICategory {
    id: string
    title: string
    items: IMovie[]
}

export interface IModalProps {
    open: boolean
    handleClose: (e: boolean) => void
    result: ICategory[]
}

export interface IMovieProps {
    categories: ICategory[]
    selectedNominee: ICategory[]
    onSelectNominee: (id: string, movie: IMovie) => void
}