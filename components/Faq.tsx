import { useState } from 'react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  // fix the issue by adding the following code
  const toggleDetails = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'What is a SAAS platform?',
      answer: 'SAAS platform is a cloud-based software service that allows users to access and use a variety of tools and functionality.',
    },
    {
      question: 'How does billing work?',
      answer: 'We offer a variety of billing options, including monthly and annual subscription plans, as well as pay-as-you-go pricing for certain services.',
    },
    {
      question: 'Can I get a refund for my subscription?',
      answer: 'We offer a 30-day money-back guarantee for most subscription plans. If you are not satisfied within the first 30 days, you can request a refund.',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'To cancel your subscription, log in to your account and navigate to the subscription management page.',
    },
    {
      question: 'Can I try this platform for free?',
      answer: 'We offer a free trial of the platform for a limited time. During the trial, you will have access to limited features.',
    },
    {
      question: 'How do I access the documentation?',
      answer: 'Documentation is available on the website and can be accessed by logging in to your account.',
    },
    {
      question: 'How do I contact support?',
      answer: "You can contact support by submitting a request through the website or emailing support@We.com.",
    },
    {
      question: 'Do you offer any discounts or promotions?',
      answer: 'We may offer discounts or promotions from time to time. Sign up for the newsletter or follow on social media for updates.',
    },
    {
      question: 'How do we compare to other similar services?',
      answer: 'This platform is reliable and feature-rich, offering a wide range of tools and competitive pricing.',
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-5 bg-white min-h-screen">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-5xl mt-5 tracking-tight">FAQ</h2>
        <p className="text-neutral-500 text-xl mt-3">Frequently asked questions</p>
      </div>

      <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
        {faqs.map((faq, index) => (
          <div className="py-5" key={index}>
            <details
              className="group"
              open={openIndex === index}
              onClick={() => toggleDetails(index)}
            >
              <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                <span>{faq.question}</span>
                <span
                  className={`transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                >
                  <svg
                    fill="none"
                    height="24"
                    shapeRendering="geometricPrecision"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M6 9l6 6 6-6"></path>
                  </svg>
                </span>
              </summary>
              <p className="text-neutral-600 mt-3 transition-opacity duration-200">
                {faq.answer}
              </p>
            </details>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
