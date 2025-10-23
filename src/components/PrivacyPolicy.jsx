import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 p-6 md:p-12">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          SparkMeet Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-8 text-center">
          Last updated: October 23, 2025
        </p>

        <section className="space-y-4">
          <p>
            Welcome to <strong>SparkMeet</strong> (“we”, “our”, “us”). We value your privacy and
            are committed to protecting your personal data. This Privacy Policy explains what
            information we collect, how we use it, and your rights regarding your data.
          </p>

          <h2 className="text-xl font-semibold mt-6">1. Information We Collect</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> Your name, gender, date of birth, email,
              and phone number when you register.
            </li>
            <li>
              <strong>Profile Details:</strong> Photos, interests, preferences, and descriptions
              you provide to personalize your profile.
            </li>
            <li>
              <strong>Location Data:</strong> If you grant permission, we may collect location
              data to show nearby matches.
            </li>
            <li>
              <strong>Payment Data:</strong> Payments are processed securely through{" "}
              <a
                href="https://razorpay.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                Razorpay
              </a>
              . We do not store your card or banking information.
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">2. How We Use Your Data</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>To create and manage your SparkMeet account.</li>
            <li>To connect you with compatible users and manage chat/match features.</li>
            <li>To improve our algorithm and app experience.</li>
            <li>To process payments and provide premium features.</li>
            <li>To prevent, detect, and investigate fraud or misuse.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">3. Data Sharing</h2>
          <p>
            We share limited data with trusted third parties only when necessary:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>With Razorpay for payment processing.</li>
            <li>With analytics tools to improve app performance.</li>
            <li>With law enforcement if required by applicable law.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6">4. Data Retention</h2>
          <p>
            We retain your data as long as your account is active or as required by law. You can
            delete your account anytime from the app settings.
          </p>

          <h2 className="text-xl font-semibold mt-6">5. Security</h2>
          <p>
            We use encryption and secure servers to protect your personal information. However,
            no system is completely immune to security risks.
          </p>

          <h2 className="text-xl font-semibold mt-6">6. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access and update your personal data.</li>
            <li>Request deletion of your account.</li>
            <li>Withdraw consent for data processing at any time.</li>
          </ul>
          <p>
            To exercise these rights, contact us at{" "}
            <strong>support@sparkmeet.com</strong>.
          </p>

          <h2 className="text-xl font-semibold mt-6">7. Children's Privacy</h2>
          <p>
            SparkMeet is not intended for individuals under 18 years old. We do not knowingly
            collect data from minors.
          </p>

          <h2 className="text-xl font-semibold mt-6">8. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy periodically. Updates will be posted on this page
            with the revised date.
          </p>

          <h2 className="text-xl font-semibold mt-6">9. Contact Us</h2>
          <p>
            For privacy questions, complaints, or feedback, email us at{" "}
            <strong>support@sparkmeet.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
