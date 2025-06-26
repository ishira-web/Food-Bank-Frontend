import React from 'react';
import Amrish from '../assets/Images/amrish.jpg'
import { Link } from 'react-router-dom';
function AboutUs() {
  return (
    <div className="min-h-screen bg-[--Treasureana---Geocaching-App-11] font-Funnel_Display">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')] bg-cover bg-center"
        ></div>
        
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-400 mb-6 tracking-wider">
            DISCOVER THE CURRY CLUB SIGNATURE
          </h1>
          <div className="w-20 h-1 bg-amber-500 mx-auto mb-8"></div>
          <p className="text-white text-xl md:text-xl max-w-3xl mx-auto">
            Where Tradition Meets Innovation
          </p>
        </div>
      </div>

      {/* Introduction Section */}
      <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <p className="text-gray-700 text-sm md:text-base leading-relaxed text-center font-Funnel_Display_SemiBold">
            "We boldly embrace the richness of traditional Sri Lankan flavours, reimagined with a contemporary twist. Dive into an enhanced dining experience where each dish packs a little extra 'oomph'. While our culinary inspirations are deeply rooted in the generational recipes of the founding family, we also value the exhilarating moments created when phenomenal food meets good company. Experience the nostalgia of our heritage, comforting embrace of a family and the innovation of the present, all on one plate."
          </p>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="py-16 px-4 bg-[var(--Treasureana---Geocaching-App-11)]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-amber-100 mb-16">
            The Essence of The Curry Club Signature
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Heartfelt Hospitality</h2>
              <p className="text-gray-600">We welcome every guest with a warm embrace and an excitement to delight.</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Top-Notch Taste</h2>
              <p className="text-gray-600">We strive to make our customers take a pause with every bite and exclaim, "Wow."</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Refreshing Ideas</h2>
              <p className="text-gray-600">The creative imagination behind our culinary ensemble strives to delightfully surprise each and every one of our customers.</p>
            </div>
            
            {/* Card 4 */}
            <div className="bg-white rounded-xl shadow-xl p-6 transform transition duration-500 hover:scale-105">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Pursuit of Perfection</h2>
              <p className="text-gray-600">While we know culinary perfection might be an elusive chase, that's not stopping us from trying.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-amber-100 to-amber-50 rounded-2xl shadow-xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-6">The Visionaries Behind The Legacy</h1>
              <div className="space-y-4 text-gray-700">
                <p>Meet the sons of Mr Amrish, the driving forces behind The Curry Club Signature. From family recipes to pioneering modern Sri Lankan dining, their journey is a fusion of tradition and innovation. The story finds its roots in their father, Mr. Raj. Once an airline steward, he embarked on a culinary journey that led to authentic Singaporean Sri Lankan flavors capturing the hearts of the  SriLankan community, and from there, the family's culinary legacy was born.</p>
                <p>Walking in their father's footsteps, the brothers sought to blend time-honored traditions with contemporary zest, leading to the rise of The Curry Club Signature. A realm where classics meet contemporary. Their passion for Singaporean Sri Lankan cuisine, enriched by the region's diverse influences, pushes boundaries. The Curry Club Signature is more than a restaurant; it's a tribute to traditions, while fearlessly embracing the new.</p>
              </div>
              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                  <div className="w-12 h-12 rounded-full bg-gray-300 border-2 border-white"></div>
                </div>
                <div>
                  <p className="font-bold text-amber-900">The Brothers</p>
                  <p className="text-sm text-gray-600">Continuing Mr. Amrish's Legacy</p>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center text-gray-500">
                <img src={Amrish} alt="" className='w-full h-full' />
              </div>
              <div className="absolute bottom-6 left-6 bg-black text-white px-4 py-2 rounded-lg">
                <p className="font-bold">Mr. Puwaneshwaram Amrish</p>
                <p className="text-sm">Founder of the Legacy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="py-16 bg-amber-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Our Signature Flavors</h2>
          <p className="text-amber-100 text-lg mb-8 max-w-2xl mx-auto">Join us for an unforgettable culinary journey that bridges generations and cultures.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
           <Link to="/reservation"> <button className="bg-white text-amber-800 font-bold py-3 px-8 rounded-full hover:bg-amber-100 transition duration-300">
              Reserve a Table
            </button></Link>
            <Link to="/menu"><button className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-amber-800 transition duration-300">
              View Our Menu
            </button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;