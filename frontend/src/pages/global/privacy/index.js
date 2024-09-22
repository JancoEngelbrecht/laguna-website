import React from 'react';

const Privacy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm mb-8">Last Updated: 19 September 2024</p>
      <p>Welcome to Laguna Butchery. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy policy or our practices with regards to your personal information, please contact us at [Your Contact Information]. When you visit our website and use our services, you trust us with your personal information. We take your privacy very seriously. In this privacy policy, we describe our privacy practices. We seek to explain to you in the clearest way possible what information we collect, how we use it, and what rights you have in relation to it. We hope you take some time to read through it carefully, as it is important. If there are any terms in this privacy policy that you do not agree with, please discontinue use of our Sites and our services.</p>
        </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect personal information that you provide to us when you sign up or sign in on our website. This includes:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Email address</li>
            <li>Phone number</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the information we collect or receive:</p>
          <ul className="list-disc list-inside ml-4">
            <li>To create and manage your account.</li>
            <li>To manage and store your product basket.</li>
            <li>To improve our website and services through analytics.</li>
            <li>To communicate with you regarding your account and our services.</li>
            <li>To comply with legal obligations and resolve any disputes.</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Sharing Your Information</h2>
          <p>We do not sell your personal information to external providers. However, we may share your data with trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, provided that those parties agree to keep this information confidential. These third-party service providers include, but are not limited to, authentication services like Auth0 and database services like MongoDB.</p>
        
          <h2 className="text-2xl font-bold mt-8 mb-4">4. Data Security</h2>
          <p>We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information. These measures include encryption, secure servers, and access controls to protect your data from unauthorized access, alteration, disclosure, or destruction.</p>
          </div>
          <div>
          <h2 className="text-2xl font-bold mt-8 mb-4">5. Your Rights</h2>
          <p>Under POPIA, you have the following rights in relation to your personal information:</p>
          <ul className="list-disc list-inside ml-4">
            <li>Access: You have the right to request access to the personal information we hold about you.</li>
            <li>Correction: You have the right to request that we correct any inaccuracies in the personal information we hold about you.</li>
            <li>Deletion: You have the right to request that we delete your personal information, subject to certain exceptions.</li>
            <li>Objection: You have the right to object to the processing of your personal information in certain circumstances.</li>
            <li>Withdraw Consent: You have the right to withdraw your consent at any time, without affecting the lawfulness of processing based on consent before its withdrawal.</li>
          </ul>
          <p>To exercise any of these rights, please contact us.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to track the activity on our website and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">7. Changes to This Privacy Policy</h2>
          <p>We may update this privacy policy from time to time in order to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new privacy policy on this page. We encourage you to review this privacy policy periodically to stay informed about how we are protecting your information.</p>

          <h2 className="text-2xl font-bold mt-8 mb-4">8. Contact Us</h2>
          <p>If you have any questions about this privacy policy or our privacy practices, please contact us</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;