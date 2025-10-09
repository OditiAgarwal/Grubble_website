import { motion } from 'framer-motion';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

const testimonials = [
  {
    quote: "Grubble's AI recommendations helped me focus on exactly the skills I needed for my career transition. I'm now a full-stack developer at a top company!",
    name: "Rahul Sharma",
    role: "Full-Stack Developer"
  },
  {
    quote: "The personalized learning paths and career guidance gave me the confidence to switch industries. Couldn't have done it without Grubble.",
    name: "Ananya Singh",
    role: "Data Analyst"
  },
  {
    quote: "As someone who was completely new to tech, Grubble made learning accessible and actually enjoyable. The interactive courses kept me engaged.",
    name: "Vikram Patel",
    role: "Product Manager"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Success Stories</h2>
          <p className="mt-4 text-lg text-gray-600">
            See how Grubble has helped professionals achieve their career goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-sm p-8 border border-gray-100"
            >
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
