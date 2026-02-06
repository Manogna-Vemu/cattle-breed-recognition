import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight, Camera, Target } from "lucide-react";
import { Upload, Cpu, FileCheck } from "lucide-react";
import { Users, Database, FlaskConical } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const features = [
    {
      title: "Real-Time Breed Detection",
      description:
        "Instant analysis and results for quick field identification of cattle breeds.",
      icon: Camera,
    },
    {
      title: "High Accuracy Recognition",
      description:
        "State-of-the-art AI models trained on diverse datasets for precise identification.",
      icon: Target,
    },
    {
      title: "Field Friendly Image Support",
      description:
        "Compatible with various image qualities and lighting conditions from mobile devices.",
      icon: Camera,
    },
  ];

  const steps = [
    {
      title: "Upload Animal Image",
      description: "Take a photo or select an image of the cattle or buffalo.",
      icon: Upload,
    },
    {
      title: "AI Processing",
      description:
        "Our advanced AI analyzes visual features and patterns in the image.",
      icon: Cpu,
    },
    {
      title: "Breed Result Output",
      description:
        "Get a detailed breed identification report with confidence scores.",
      icon: FileCheck,
    },
  ];

  const useCases = [
    {
      title: "Field Workers",
      description:
        "Enable on-ground veterinarians and extension officers with breed data.",
      icon: Users,
    },
    {
      title: "Livestock Registration",
      description:
        "Streamline government livestock census and registration processes.",
      icon: Database,
    },
    {
      title: "Research & Data Validation",
      description:
        "Support agricultural research with accurate, large-scale breed data.",
      icon: FlaskConical,
    },
  ];

  return (
    <div className="w-full">
      {/* ================= NAVBAR ================= */}
      <nav className="border-b border-gray-200 h-20">
        <div className="max-w-7xl mx-auto flex justify-between h-full items-center px-4 py-4">
          {/* Logo */}
          <div className="h-35 flex items-center">
            <Image
              src="/logo.png"
              alt="Logo"
              width={390}
              height={140}
              className="h-full w-auto object-contain"
              priority
            />
          </div>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
            <li className="cursor-pointer hover:text-blue-600 transition">
              Home
            </li>
            <li>
              <a
                href="#features"
                className="cursor-pointer hover:text-blue-600 transition"
              >
                Features
              </a>
            </li>

            <a href="#how-it-works">
              <li className="cursor-pointer hover:text-blue-600 transition">
                How It Works
              </li>
            </a>
            <li className="cursor-pointer hover:text-blue-600 transition">
              Demo
            </li>
          </ul>

          {/* CTA Button */}

          <Link href="/dashboard">
            <Button
              className="
              cursor-pointer
            rounded-full px-6 py-5
            font-semibold
            text-white
            bg-gradient-to-r from-blue-500 to-blue-600
            hover:from-blue-600 hover:to-blue-700
            transition-transform hover:scale-105
            "
            >
              Verify Image
            </Button>
          </Link>
        </div>
      </nav>

      {/* ================= HERO SECTION ================= */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              AI Powered Breed Recognition for{" "}
              <span className="text-blue-600">Cattle & Buffalo</span>
            </h1>

            <p className="mt-5 text-gray-600 text-lg max-w-xl mx-auto md:mx-0">
              Upload animal images and get instant breed identification using
              our advanced AI technology with high accuracy.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
              <Link href="/dashboard">
                <Button
                  className="
                  cursor-pointer
                rounded-full px-8 py-6
                font-semibold
                text-white
                bg-gradient-to-r from-blue-500 to-blue-600
                hover:from-blue-600 hover:to-blue-700
                transition-transform hover:scale-105
                "
                >
                  Verify Image
                </Button>
              </Link>

              <Button
                className="
                cursor-pointer
                  rounded-full px-8 py-6
                  font-semibold
                  border border-blue-200
                  bg-gray-500
                  hover:bg-blue-600
                "
              >
                See How It Works
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/cow_scanning.png"
              alt="Hero Image"
              width={520}
              height={420}
              className="w-full max-w-md md:max-w-lg"
            />
          </div>
        </div>
      </section>

      {/* ================= KEY FEATURES ================= */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold">Key Features</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              Everything you need for fast, accurate and reliable cattle breed
              identification.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <Card
                  key={index}
                  className="p-4 hover:bg-blue-200 transition duration-300 cursor-pointer text-left"
                >
                  {/* BIG ICON */}
                  <div className="flex justify-left">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
                      <Icon className="h-9 w-9 text-blue-600" />
                    </div>
                  </div>

                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>

                  <CardDescription className="text-gray-800 text-sm">
                    {feature.description}
                  </CardDescription>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold mb-2">How It Works</p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Simple Three-Step Process
            </h2>
          </div>

          {/* Steps Container */}
          <div className="flex flex-col lg:flex-row gap-8 justify-between items-center">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={index}
                  className="relative cursor-pointer flex items-center gap-4 bg-white hover:bg-blue-200 border rounded-xl p-6 shadow-sm hover:shadow-md transition w-full lg:w-1/3"
                >
                  {/* LEFT ICON */}
                  <div className="flex-shrink-0">
                    <div className="h-14 w-14 flex items-center justify-center rounded-lg bg-blue-100">
                      <Icon className="h-7 w-7 text-blue-600" />
                    </div>
                  </div>

                  {/* TEXT CONTENT */}
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      Step {index + 1}: {step.title}
                    </h3>

                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>

                  {/* ARROW (Desktop only) */}
                  {index !== steps.length - 1 && (
                    <div className="hidden lg:block absolute -right-10 top-1/2 -translate-y-1/2">
                      <ArrowRight className="h-10 w-10 text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= USE CASE SECTION ================= */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="text-blue-600 font-semibold mb-2">Use Case</p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Empowering Diverse Stakeholders
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-white p-7 rounded-xl border shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center h-14 w-14 rounded-lg bg-green-100 mb-5">
                    <Icon className="h-7 w-7 text-green-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="bg-gray-100 pt-12 border-t">
        <div className="max-w-7xl mx-auto px-4">
          {/* TOP FOOTER */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10">
            {/* LEFT INFO */}
            <div>
              <h3 className="font-semibold text-lg mb-2">
                Image-Based Breed Recognition for Cattle and Buffaloes of India
              </h3>

              <p className="text-gray-600 text-sm mb-2">
                Powered by AI & Computer Vision
              </p>

              <p className="text-gray-500 text-sm">
                Image AI Breed Recognition Project
              </p>
            </div>

            {/* CENTER LINKS */}
            <div className="flex md:justify-center">
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="hover:text-blue-600 cursor-pointer transition">
                  About Project
                </li>

                <li className="hover:text-blue-600 cursor-pointer transition">
                  Privacy Policy
                </li>

                <li className="hover:text-blue-600 cursor-pointer transition">
                  Terms of Service
                </li>

                <li className="hover:text-blue-600 cursor-pointer transition">
                  Contact
                </li>
              </ul>
            </div>

            {/* RIGHT LOGOS */}
            {/* <div className="flex md:justify-end gap-4 items-center">
              <Image src="/gov1.png" alt="Gov Logo" width={45} height={45} />
              <Image src="/gov2.png" alt="Gov Logo" width={45} height={45} />
              <Image src="/gov3.png" alt="Gov Logo" width={45} height={45} />
              <Image src="/gov4.png" alt="Gov Logo" width={45} height={45} />
            </div> */}
          </div>

          {/* BOTTOM BAR */}
          <div className="border-t py-4 text-center text-gray-500 text-sm">
            © 2024 AI Breed Recognition Project. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
