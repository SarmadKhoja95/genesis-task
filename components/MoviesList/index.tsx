import type { NextPage } from 'next'
import styles from '../../styles/Home.module.css'
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { ICategory, IMovie, IMovieProps } from '../../types'

const MovieCard: NextPage<IMovieProps> = ({ categories, selectedNominee, onSelectNominee }: IMovieProps) => {
    return (
        <div>
            {categories.map((category: ICategory, index: number) =>
                <div key={index} data-testid={`movie-card`}>
                    <h2 className={styles.title}>{category?.title}</h2>
                    <div className={styles.cardWrapper}>
                        {category?.items?.map((movie: IMovie, j: number) =>
                            <Card key={j} className={styles.card} data-category-id={category?.id}>
                                <Typography variant="subtitle1" component="div" className={styles.cardTitle} >
                                    {movie?.title}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    image={movie?.photoUrL}
                                    alt="pic"
                                    className={styles.cardImg}
                                />
                                <Button variant="contained"
                                    className={selectedNominee?.find((f: ICategory) => f?.id === category?.id)?.items?.includes(movie) ? styles.activeBtn : styles.selectBtn}
                                    onClick={() => onSelectNominee(category?.id, movie)}>Select Button</Button>
                            </Card>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default MovieCard
