import { useLoaderData } from 'react-router-dom';
import Cards from '../Cards/Cards';
import CarouselItem from '../Carousel/Carousel';
import CategoriesBar from '../CategoriesBar/CategoriesBar';

function Home() {
  const loaderData: any = useLoaderData();

  const allArticles = loaderData?.allArticles;
  const allCategories = loaderData?.allCategories;

  return (
    <>
      <CategoriesBar />
      <Cards articles={allArticles} />
      <CarouselItem />
    </>
  );
}

export default Home;
