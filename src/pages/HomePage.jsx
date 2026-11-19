import Hero from '../components/home/Hero'
import Intro from '../components/home/Intro'
import CategoriesPreview from '../components/home/CategoriesPreview'
import ProcessStrip from '../components/home/ProcessStrip'
import WhyChooseUs from '../components/home/WhyChooseUs'
import CtaBand from '../components/home/CtaBand'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <CategoriesPreview />
      <ProcessStrip />
      <WhyChooseUs />
      <CtaBand />
    </>
  )
}
