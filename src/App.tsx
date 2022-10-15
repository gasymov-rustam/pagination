import { createPages } from './utils/creatPages';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Photo = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export const App = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);
  const pagesCount = Math.ceil(totalCount / 10);

  useEffect(() => {
    axios
      .get<Photo[]>(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
      .then((response) => {
        setPhotos([...response.data]);
        setTotalCount(Number(response.headers['x-total-count']));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    setPages(createPages([], pagesCount, currentPage));
  }, [currentPage, pagesCount, totalCount]);

  return (
    <div className='app'>
      {photos.map((photo) => (
        <div className='photo'>
          <div className='title'>
            {photo.id}. {photo.title}
            <img
              src={photo.thumbnailUrl}
              alt=''
              width={150}
              height={150}
              decoding='async'
              loading='lazy'
              className='img'
            />
          </div>
        </div>
      ))}

      <div className='pages'>
        {pages?.map((page, index) => (
          <span
            key={index}
            className={currentPage === page ? 'current-page' : 'page'}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};
