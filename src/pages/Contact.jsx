import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, FileText, AlertCircle, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setSubmitStatus('success');
    
    // Reset form after success
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: '',
      });
      setSubmitStatus(null);
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@studysphere.com',
      description: 'Send us an email and we\'ll respond within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+1 (555) 123-4567',
      description: 'Available Monday to Friday, 9 AM to 6 PM EST'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: '123 Learning Street, Education City, EC 12345',
      description: 'Our headquarters are open for scheduled visits'
    },
  ];

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: MessageCircle },
    { value: 'technical', label: 'Technical Support', icon: AlertCircle },
    { value: 'course', label: 'Course Related', icon: FileText },
    { value: 'partnership', label: 'Partnership', icon: CheckCircle },
  ];

  const faqs = [
    {
      question: 'How do I enroll in a course?',
      answer: 'Simply browse our course catalog, select the course you want, and click "Enroll Now". You can pay using various methods including credit cards and UPI.'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 30-day money-back guarantee for all paid courses. Contact our support team to process your refund.'
    },
    {
      question: 'Do I get a certificate after completing a course?',
      answer: 'Yes, you\'ll receive a verified certificate of completion that you can share on LinkedIn and add to your resume.'
    },
    {
      question: 'Can I access courses on mobile devices?',
      answer: 'Absolutely! Our platform is fully responsive and works seamlessly on all devices including smartphones and tablets.'
    },
    {
      question: 'How long do I have access to a course?',
      answer: 'Once enrolled, you have lifetime access to the course content, including any future updates and additional materials.'
    },
    {
      question: 'Are there any prerequisites for courses?',
      answer: 'Prerequisites vary by course and are clearly listed on each course page. Beginner courses typically have no prerequisites.'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 text-white bg-gradient-to-br from-primary-600 to-secondary-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Get in Touch
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/90">
            Have questions about our courses? Need technical support? Want to partner with us? 
            We're here to help and would love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 text-white transition-transform duration-200 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl group-hover:scale-110">
                  <info.icon className="w-8 h-8" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {info.title}
                </h3>
                <p className="mb-2 text-lg font-medium text-primary-600 dark:text-primary-400">
                  {info.details}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {info.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <div className="p-8 bg-white border border-gray-200 shadow-lg dark:bg-gray-800 rounded-2xl dark:border-gray-700">
                <h2 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Send us a Message
                </h2>
                
                {submitStatus === 'success' && (
                  <div className="p-4 mb-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                      <span className="font-medium text-green-700 dark:text-green-300">
                        Message sent successfully! We'll get back to you soon.
                      </span>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Brief subject of your message"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg resize-none dark:border-gray-600 focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                      placeholder="Please provide details about your inquiry, issue, or feedback. The more information you provide, the better we can assist you."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 mr-3 -ml-1 border-2 border-white rounded-full animate-spin border-t-transparent"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="p-6 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
                    <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                      {faq.question}
                    </h3>
                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {/* Additional Help */}
              <div className="p-6 mt-8 border bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-xl border-primary-200 dark:border-primary-700">
                <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
                  Need More Help?
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Can't find what you're looking for? Our support team is available 24/7 to help you with any questions or issues.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href="mailto:support@studysphere.com"
                    className="inline-flex items-center justify-center px-4 py-2 font-medium text-white transition-colors duration-200 rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="inline-flex items-center justify-center px-4 py-2 font-medium transition-colors duration-200 border rounded-lg border-primary-600 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Support
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Response Time Notice */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
          <div className="p-8 border border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl dark:border-blue-800">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
              We Value Your Time
            </h3>
            <p className="leading-relaxed text-gray-600 dark:text-gray-300">
              We typically respond to all inquiries within 24 hours during business days. 
              For urgent technical issues, our support team is available 24/7 via email and phone.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;