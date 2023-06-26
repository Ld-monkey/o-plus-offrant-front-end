import { useLoaderData } from 'react-router-dom';
import CarouselItem from '../Carousel/Carousel';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import StackArticles from '../StackArticles/StackArticles';
import Notifications from '../Notifications/Notifications';

function Home() {
  const loaderData: any = useLoaderData();

  const allArticles = loaderData?.allArticles;
  // const allCategories = loaderData?.allCategories;

  return (
    <>
      <Notifications message="Simple notification" type="warning" />
      <Notifications message="Simple notification" type="success" />
      <Notifications message="Simple notification" type="error" />
      <Notifications message="Simple notification" type="information" />
      <CategoriesBar />
      <StackArticles articles={allArticles} />
      <CarouselItem articles={allArticles} />
    </>
  );
}

export default Home;
