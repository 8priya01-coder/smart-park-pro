import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Car, Bike, Truck, Clock, Check } from "lucide-react";
import parkEasyLogo from "@/assets/parkeasy-logo.png";

const PricingTable = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      icon: Bike,
      title: "Two Wheeler",
      description: "Bikes & Scooters",
      hourlyRate: 20,
      dailyRate: 150,
      monthlyRate: 2000,
      color: "green",
      features: ["Covered parking", "CCTV surveillance", "Easy access"]
    },
    {
      icon: Car,
      title: "Four Wheeler",
      description: "Cars & SUVs",
      hourlyRate: 50,
      dailyRate: 400,
      monthlyRate: 5000,
      color: "blue",
      features: ["Premium spots", "24/7 security", "Valet option", "Car wash facility"],
      popular: true
    },
    {
      icon: Truck,
      title: "Heavy Vehicle",
      description: "Trucks & Buses",
      hourlyRate: 100,
      dailyRate: 800,
      monthlyRate: 10000,
      color: "purple",
      features: ["Spacious parking", "Loading/unloading area", "Driver rest area"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={parkEasyLogo} alt="ParkEasy Logo" className="w-10 h-10 object-contain" />
            <div>
              <h1 className="text-xl font-bold text-foreground">ParkEasy</h1>
              <p className="text-xs text-muted-foreground">Smart Parking System</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              Home Page
            </Button>
            <Button variant="ghost" size="sm" className="bg-blue-100">
              Pricing
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/contact")}>
              Contact Us
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/about")}>
              About Us
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/dashboard")}
          className="mb-6 gap-2 hover:bg-blue-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">Parking Pricing Plans</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the best parking plan that suits your vehicle. We offer flexible hourly, daily, and monthly rates.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {pricingPlans.map((plan) => (
            <Card 
              key={plan.title} 
              className={`shadow-elegant relative ${plan.popular ? 'border-2 border-blue-500 scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader className="text-center">
                <div className={`w-16 h-16 rounded-full bg-${plan.color}-100 flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className={`h-8 w-8 text-${plan.color}-600`} />
                </div>
                <CardTitle className="text-2xl">{plan.title}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      Hourly
                    </span>
                    <span className="font-bold text-lg">₹{plan.hourlyRate}/hr</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <span className="text-muted-foreground">Daily</span>
                    <span className="font-bold text-lg">₹{plan.dailyRate}/day</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-muted-foreground">Monthly</span>
                    <span className="font-bold text-lg text-blue-600">₹{plan.monthlyRate}/mo</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-600" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => navigate("/register")}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card className="shadow-sm bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardContent className="py-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Need Custom Parking Solutions?</h3>
              <p className="text-white/80 mb-4">
                Contact us for corporate parking packages and bulk booking discounts.
              </p>
              <Button 
                variant="secondary" 
                onClick={() => navigate("/contact")}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Contact Us
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PricingTable;
