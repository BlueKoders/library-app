import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../../constants';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { div } from 'framer-motion/client';

const List = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            const response = await axios.get(`${BASE_URL}/books`);
            setBooks(response.data)
        };
        getBooks();

    }, []);

    return (
        <div>
            <h1 className='text-orange-700 text-4xl font-bold text-center'>BOOKLIST</h1>
            <div className='books'>
                {

                    books.map((books, index) => {
                        console.log(books);
                        return (
                            <div key={index}>
                                <h1  className='bg-orange-900 text-2xl text-center text-orange-400'>{books.title}</h1>
                                <h1>{books.summary}</h1>
                                <h1>{books.publisher}</h1>
                                <h1>{books.publisherDate}</h1>
                                <h1>{books.numberOfPages}</h1>
                                <h1>{books.content}</h1>
                                <img src="" alt="" />
                            </div>
                        )
                    })
                }
            </div>

        </div>)
}







export default List;