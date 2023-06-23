import { useLoaderData } from 'react-router-dom';
import Cards from '../Cards/Cards';
import CarouselItem from '../Carousel/Carousel';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import StackArticles from '../StackArticles/StackArticles';

function Home() {
  const loaderData: any = useLoaderData();

  const allArticles = loaderData?.allArticles;
  const allCategories = loaderData?.allCategories;

  return (
    <>
      <CategoriesBar />
      <StackArticles articles={allArticles} />
      {/* <Cards articles={allArticles} /> */}
      <CarouselItem articles={allArticles} />
    </>
  );
}

export default Home;
