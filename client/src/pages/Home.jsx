import React from "react";
import { Link } from "react-router-dom";
import { Mic, FileText, Users, History } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: Mic,
      title: "Voice Recording",
      description:
        "Record patient appointments with high-quality audio capture",
    },
    {
      icon: FileText,
      title: "Smart Transcription",
      description: "Automatic transcription with medical terminology support",
    },
    {
      icon: Users,
      title: "Patient Management",
      description: "Comprehensive patient records and history tracking",
    },
    {
      icon: History,
      title: "Historical Data",
      description: "Access past appointments and treatment records",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">
            Transform Your Medical Practice with AI-Powered Transcription
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Streamline your patient appointments with automatic transcription,
            intelligent summarization, and organized documentation.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get Started
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto py-16 px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-12 text-center">
          Everything You Need for Medical Documentation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                <div className="bg-blue-50 p-3 rounded-lg w-fit mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Streamline Your Practice?
          </h2>
          <p className="text-gray-600 mb-8">
            Join thousands of healthcare professionals who trust MedTranscribe
            for their documentation needs.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
