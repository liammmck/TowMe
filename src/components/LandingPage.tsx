import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const LandingPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            {/* Catchy Headline -  Tailored to the App's Purpose*/}
            Connect with Opportunities:  Deliver or  Get Delivered, Your Way.
          </CardTitle>
          <CardDescription className="text-center mt-2">
            {/* Short, Engaging Description */}
            Join our network and experience the future of efficient and flexible service solutions.
          </CardDescription>
        </CardHeader>

        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Sign-Up Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Customers</h3>
            <p className="text-gray-600 text-center mb-4">
              Need something moved or delivered? Sign up and get connected with reliable drivers.
            </p>
            <Button size="lg">
              Sign Up as a Customer
            </Button>
          </div>

          {/* Driver Sign-Up Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2">Drivers</h3>
            <p className="text-gray-600 text-center mb-4">
              Looking for flexible work?  Become a driver and tap into a steady stream of opportunities.
            </p>
            <Button size="lg" variant="secondary">
              Sign Up as a Driver
            </Button>
          </div>
        </CardContent>

        <CardFooter className="text-center mt-4">
            {/* Optional: Add a small tagline or app name */}
          <p className="text-gray-500">Powered by [Your App Name]</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LandingPage;