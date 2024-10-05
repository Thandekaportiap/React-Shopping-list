
import HeroImg from '../assets/images.jfif'
import Shopping2 from '../assets/shopping-cartoon.jpg'



const Hero = () => {
    
  return (
    <section className='w-full h-screen flex items-center justify-between px-12 text-[#C087BF]'
  >
    <div className=''>
      <h1 className='text-7xl font-bold leading-tight'>
        The best way<br />
        <span className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#C087Bf] relative inline-block">
            <span className="relative text-white">to simplify</span>
          </span>
        <br /> your shopping
      </h1>
      <h4 className='mt-4 text-2xl'>
      Shopping made easy with your simplified List
      </h4>
    </div>
    
    <img
                  src={Shopping2}
                  alt="shopping"
                  className="absolute bottom-5 ali   rounded-tl-3xl size-40"
                />
      <div className="">
            <div className="lg:ml-auto lg:text-right">
              <div className="relative z-10 inline-block pt-11 lg:pt-0">
                <img
                  src={HeroImg}
                  alt="hero"
                  className="rounded-tl-3xl "
                />
                <span className="absolute -bottom-8 -left-8 z-[-1]">
                  <svg
                    width="93"
                    height="93"
                    viewBox="0 0 93 93"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="3.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="3.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="25.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="25.5" r="3.5" fill="#C087BF" />                    
                    <circle cx="47.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="47.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="69.5" cy="91.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="3.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="25.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="47.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="69.5" r="3.5" fill="#C087BF" />
                    <circle cx="91.5" cy="91.5" r="3.5" fill="#C087BF" />     
                  </svg>
                </span>
              </div>
              </div>
              </div>   
  </section>
  
  )
}

export default Hero
