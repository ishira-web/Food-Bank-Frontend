import React from 'react';
import OurStory from '../assets/Images/our_stroy.jpg';
import ParralaxImage from '../assets/Images/our_stroy2.jpg';

function Story() {
  return (
    <div className="w-full min-h-screen bg-[var(--Treasureana---Geocaching-App-7)]">
      {/* Hero Image with Heading */}
      <div className="relative w-full min-h-[10rem]">
        <img
          src={OurStory}
          alt="Our Story"
          className="w-full h-[20rem] object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white font-Funnel_Display text-4xl md:text-5xl">
            Our Story
          </h1>
        </div>
      </div>

      {/* Parallax Section */}
      <div
        className="w-full min-h-screen bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{ backgroundImage: `url(${ParralaxImage})` }}
      >
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg max-w-3xl text-center text-white">
          <h2 className="text-2xl font-Funnel_Display mb-2">The Spice of Heritage</h2>
          <p className="text-sm font-Funnel_Display leading-relaxed">
            A celebration of the senses, the timeless aroma of Ceylon’s spices takes you on a journey of culture, history, and taste.
          </p>
          <div className="text-sm text-center leading-relaxed font-Funnel_Display space-y-4">
            <p>
              Spices hold many secrets. They are a repository of culture and heritage; an articulation of tradition and ritual.
            </p>
            <p>
              Intrinsic to the human journey, spices have healed, preserved and delighted us for thousands of years. Spices have shaped our world – from voyages of discovery to the exotic east, the ancient trade routes that gave passage to those magical spices, and even the intriguing rise and fall of empires.
            </p>
            <p className="font-Funnel_Display">
              Our story starts with spice.
            </p>
            <p>
              The master spice craftsmen of the Ceylon Curry Club choose their spices meticulously, working with artisan growers who handpick and dry their spices in small batches. Our expert blends are closely guarded secrets that give rise to wondrous aromas wafting from our kitchens – a magical union of the distinctive qualities of each of Ceylon’s treasured spices.
            </p>
            <p>
              Our intent is to preserve Ceylon’s proud culinary tradition while fusing it with playfully modern, adventurous elements. On your plate, you will partake the passion and originality of the masters of the Ceylon Curry Club and the scintillating intensity of Ceylon Spice.
            </p>
            <p className="font-semibold">
              The flavours are magical. The experience is exquisite.
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-4 mt-10 mb-20">
        <div>

        </div>
      </div>
    </div>
  );
}

export default Story;

