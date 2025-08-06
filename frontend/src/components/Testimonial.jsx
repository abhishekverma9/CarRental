import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';
import { motion } from 'motion/react';

const Testimonial = () => {

    const testimonials = [
        { 
            id: 1,
            name: "Emma Rodriguez", 
            address: "Barcelona, Spain", 
            image: assets.testimonial_image_1, 
            rating: 5, 
            review: "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!" 
        },
        {   id: 2, 
            name: "Liam Johnson", 
            address: "New York, USA", 
            image: assets.testimonial_image_2, 
            rating: 4, 
            review: "I'm truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
        },
        {   id: 3, 
            name: "Liam Johnson", 
            address: "New York, USA", 
            image: assets.testimonial_image_1, 
            rating: 4, 
            review: "I'm truly impressed by the quality and consistency. The entire process was smooth, and the results exceeded all expectations. Thank you!" 
        }
    ]
    const Star = ({ filled }) => (
        <svg className="w-4 h-4 text-yellow-400" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 17.25l-6.16 3.73 1.64-7.03L2.5 9.77l7.19-.61L12 2.5l2.31 6.66 7.19.61-5 4.18 1.64 7.03z" />
        </svg>
    );
  return (
    <motion.div className='py-28 px-6 md:px-16 lg:px-24 xl:px-44'>
        <Title title='What Our Customers Say' subTitle="Discover why discerning travellers choose StayVenture for thier luxury accomodations around the world."/>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial,index) => (
                    <motion.div 
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ opacity: 1, y:0}}
                    transition={{ duration: 0.6,delay:index * 0.2,ease:"easeOut"}}
                    viewport={{once:true,amount:0.3}}
                    key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="font-playfair text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.address}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <Star key={index} filled={testimonial.rating > index} />
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.review}"</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
  )
}

export default Testimonial
