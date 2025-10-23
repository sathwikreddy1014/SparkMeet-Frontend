import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          SparkMeet Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last updated: October 23, 2025
        </p>

        <section className="space-y-4">
          <p>
            These Terms and Conditions (“Terms”) govern your access to and use of
            <strong> SparkMeet</strong>, our dating and social connection platform.
            By using our services, you agree to comply with these Terms.
          </p>

          <h2 className="text-xl font-semibold mt-6">1. Eligibility</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must be 18 years or older to use SparkMeet.</li>
            <li>
              By creating an account, you confirm that all information provided is accurate and truthful.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">2. Account Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You are responsible for maintaining the confidentiality of your account and password.</li>
            <li>
              You agree not to impersonate others or create fake profiles to mislead users.
            </li>
            <li>
              SparkMeet reserves the right to suspend or delete accounts violating these terms.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">3. Paid Features and Payments</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>
              SparkMeet offers premium features purchasable through{" "}
              <a
                href="https://razorpay.com/terms/"
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Razorpay
              </a>
              .
            </li>
            <li>All payments are processed securely through Razorpay.</li>
            <li>Fees for premium services are non-refundable unless required by law.</li>
            <li>You may cancel your subscription anytime via the app.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">4. User Conduct</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use SparkMeet for illegal or harmful purposes.</li>
            <li>Upload obscene, abusive, or false content.</li>
            <li>Harass, threaten, or exploit other users.</li>
            <li>Distribute spam, scams, or offensive material.</li>
            <li>Attempt to hack or disrupt our services.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">5. Content Ownership</h2>
          <p>
            You retain ownership of your content. By posting, you grant SparkMeet a
            limited license to use, display, and share your content within the app.
          </p>

          <h2 className="text-xl font-semibold mt-6">6. Limitation of Liability</h2>
          <p>
            SparkMeet provides a platform for connections but is not responsible for
            interactions or outcomes between users. Use the app at your own risk.
          </p>

          <h2 className="text-xl font-semibold mt-6">7. Termination</h2>
          <p>
            SparkMeet may suspend or terminate your account if you violate these
            Terms or engage in behavior that harms the community.
          </p>

          <h2 className="text-xl font-semibold mt-6">8. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes shall be
            resolved under Indian jurisdiction.
          </p>

          <h2 className="text-xl font-semibold mt-6">9. Contact Us</h2>
          <p>
            For questions about these Terms, contact us at{" "}
            <strong>support@sparkmeet.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsAndConditions;
