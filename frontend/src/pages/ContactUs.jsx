import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions or want to discuss a project? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gray-100 dark:bg-gray-950 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FiMail className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 dark:text-gray-300 text-sm">Email us</h3>
                    <a href="mailto:contact@swiftcart.com" className="text-gray-800 dark:text-gray-200 transition-colors">
                      contact@swiftcart.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-amber-100 p-3 rounded-full">
                    <FiPhone className="text-amber-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 dark:text-gray-300 text-sm">Call us</h3>
                    <a href="tel:+254707435237" className="text-gray-800 dark:text-gray-200 transition-colors">
                      +254 (707) 435-237
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FiMapPin className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <h3 className="text-gray-500 dark:text-gray-300 text-sm">Visit us</h3>
                    <p className="text-gray-800 dark:text-gray-200">
                      123 Kenyatta Avenue<br />
                      Nairobi, Kenya 00100
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-w-16 aspect-h-9 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.18949933761!2d36.81844643006028!3d-1.2863890566970155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d8628986e5%3A0xedea2ff78d48c6f5!2sNairobi%20Central%20Business%20District!5e0!3m2!1sen!2ske!4v1718116215098!5m2!1sen!2ske" 
                  width="100%" 
                  height="100%" 
                  className="border-0" 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-950 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Send us a message</h2>
            
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-lg border border-green-200">
                Thank you! Your message has been sent successfully. We'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 pt-3 flex items-start pointer-events-none">
                    <FiMessageSquare className="text-gray-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                    {/* loading animation */}
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-10">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                question: "How long does it take to get a response?",
                answer: "We typically respond to all inquiries within 24-48 hours during business days."
              },
              {
                question: "What are your business hours?",
                answer: "Our support team is available Monday through Friday, 9:00 AM to 6:00 PM PST."
              },
              {
                question: "Do you offer phone support?",
                answer: "Yes, you can reach our support team at +254 (707) 435-237 during business hours."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-950 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">{item.question}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;