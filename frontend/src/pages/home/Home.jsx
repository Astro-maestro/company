import Service from '@/components/home/Service';
import Caraousel from '../../components/home/Caraousel';
import AboutUs from '@/components/home/AboutUs';
import Testimonial from '@/components/home/Testimonial';
import Company from '@/components/home/Company';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="">
      <Caraousel/>
      <AboutUs/>
      <Service/>
      <Testimonial/>
      <Company/>
      <Footer/>
    </div>
  )
}

export default Home