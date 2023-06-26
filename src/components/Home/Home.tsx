import { useLoaderData } from 'react-router-dom';
import CarouselItem from '../Carousel/Carousel';
import CategoriesBar from '../CategoriesBar/CategoriesBar';
import StackArticles from '../StackArticles/StackArticles';
import { useAppSelector } from '../../hooks/redux';
import Alerts from '../Alerts/Alerts';

function Home() {
  const loaderData: any = useLoaderData();

  const { message, type: alert } = useAppSelector((state) => state.alert);

  const allArticles = loaderData?.allArticles;
  // const allCategories = loaderData?.allCategories;

  return (
    <>
      {alert && <Alerts message={message} type={alert} />}
      <CategoriesBar />
      <StackArticles articles={allArticles} />
      <CarouselItem articles={allArticles} />
    </>
  );
}

export default Home;
