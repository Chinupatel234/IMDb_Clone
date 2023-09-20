import React, { useEffect, useState } from 'react';
import './home.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
import { colors } from '@mui/material';
import MovieList from '../../Component/movieList/movieList';

const Home = () => {

    const [popularMovies, setpopularMovies] = useState([]);

    useEffect(() => {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US")
            .then((res) =>
                res.json(),
            ).then((data) =>
                setpopularMovies(data.results)
            )
    })

    return (
        <div className='poster'>
            <Carousel showThumbs={false} autoPlay={true} transitionTime={3} infiniteLoop={true} showStatus={false}>
                {
                    popularMovies.map((item) =>
                        <Link style={{ textDecoration: "none", color: "white" }} to={`/movie/${item.id}`}>
                            <div className='posterImage'>
                                <img src={`https://image.tmdb.org/t/p/original${item && item.backdrop_path}`}></img>,
                                <span>{item.original_title}</span>
                            </div>
                            <div className='posterImage__overlay'>
                                <div className='posterImage__title'>{item ? item.original_title : ""}</div>
                                <div className='posterImage__runtime'>
                                    {item ? item.release_date : ""}
                                    <span className='posterImage__rating'>
                                        {item ? item.vote_average : ""}
                                        <i className='fas fa-star'/>{""}
                                    </span>
                                </div>
                                <div className='posterImage__description'>
                                    {item ? item.overview : ""}
                                </div>
                            </div>
                        </Link>
                    )
                }
            </Carousel>
            <MovieList />
        </div>
    )
}

export default Home;
