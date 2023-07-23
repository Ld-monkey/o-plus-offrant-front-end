import { useLoaderData } from 'react-router-dom';
import CarouselItem from '../Carousel/Carousel';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import StackArticles from '../StackArticles/StackArticles';

function Home() {
  const loaderData: any = useLoaderData();

  const allArticles = loaderData?.allArticles;
  // const allCategories = loaderData?.allCategories;

  return (
    <>
      <CategoriesBar />
      {allArticles && allArticles.length > 0 && (
        <>
          <StackArticles articles={allArticles} />
          <CarouselItem articles={allArticles} />
        </>
      )}
    </>
  );
}

export default Home;
