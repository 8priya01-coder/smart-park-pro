import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, X } from "lucide-react";
import parkEasyLogo from "@/assets/parkeasy-logo.png";

const PricingTable = () => {
  const navigate = useNavigate();

  const pricingPlans = [
    {
      category: "TWO WHEELER",
      title: "BASIC",
      price: 20,
      color: "blue",
      bgGradient: "from-blue-500 to-blue-700",
      headerBg: "bg-blue-600",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      checkColor: "text-blue-500",
      features: [
        { text: "Covered parking spot", included: true },
        { text: "CCTV surveillance", included: true },
        { text: "Easy bike access", included: true },
        { text: "Valet service", included: false },
        { text: "Car wash facility", included: false },
      ]
    },
    {
      category: "FOUR WHEELER",
      title: "MEDIUM",
      price: 50,
      color: "orange",
      bgGradient: "from-orange-400 to-orange-500",
      headerBg: "bg-orange-500",
      buttonBg: "bg-orange-500 hover:bg-orange-600",
      checkColor: "text-orange-500",
      featured: true,
      features: [
        { text: "Premium parking spot", included: true },
        { text: "24/7 security guard", included: true },
        { text: "CCTV surveillance", included: true },
        { text: "Valet parking option", included: true },
        { text: "Car wash facility", included: true },
      ]
    },
    {
      category: "HEAVY VEHICLE",
      title: "PRO",
      price: 100,
      color: "green",
      bgGradient: "from-green-500 to-green-600",
      headerBg: "bg-green-600",
      buttonBg: "bg-green-500 hover:bg-green-600",
      checkColor: "text-green-500",
      features: [
        { text: "Spacious parking area", included: true },
        { text: "Loading/unloading zone", included: true },
        { text: "24/7 security", included: true },
        { text: "Driver rest area", included: true },
        { text: "Priority support", included: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-cyan-500 to-cyan-400">
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
          className="mb-6 gap-2 text-white hover:bg-white/20"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4 tracking-wider drop-shadow-lg">
            PRICING TABLES
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Choose the perfect parking plan for your vehicle
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-end">
          {pricingPlans.map((plan) => (
            <div 
              key={plan.title} 
              className={`relative ${plan.featured ? 'md:-mt-8' : ''}`}
            >
              {/* Price Badge for Featured */}
              {plan.featured && (
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-b ${plan.bgGradient} flex items-center justify-center shadow-xl border-4 border-white`}>
                    <div className="text-center text-white">
                      <span className="text-3xl font-bold">₹{plan.price}</span>
                      <p className="text-xs">/hour</p>
                    </div>
                  </div>
                </div>
              )}

              <div className={`bg-white rounded-3xl overflow-hidden shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl ${plan.featured ? 'pt-16' : ''}`}>
                {/* Header */}
                <div className={`bg-gradient-to-b ${plan.bgGradient} pt-8 pb-6 text-center relative overflow-hidden`}>
                  {/* Decorative circles */}
                  <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/10 rounded-full"></div>
                  <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-white/10 rounded-full"></div>
                  
                  <p className="text-white/90 text-sm font-medium tracking-widest mb-2">
                    {plan.category}
                  </p>
                  {!plan.featured && (
                    <div className="mb-2">
                      <span className="text-white text-2xl font-bold">₹{plan.price}</span>
                      <span className="text-white/80 text-sm">/hour</span>
                    </div>
                  )}
                </div>

                {/* Title Bar */}
                <div className={`${plan.headerBg} py-3`}>
                  <h3 className="text-2xl font-bold text-white text-center tracking-wider">
                    {plan.title}
                  </h3>
                </div>

                {/* Features */}
                <div className="p-6 space-y-4">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {feature.included ? (
                        <div className={`w-6 h-6 rounded-full ${plan.checkColor} bg-current/10 flex items-center justify-center`}>
                          <Check className={`h-4 w-4 ${plan.checkColor}`} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <X className="h-4 w-4 text-gray-400" />
                        </div>
                      )}
                      <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                        {feature.text}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <div className="px-6 pb-6">
                  <button 
                    onClick={() => navigate("/register")}
                    className={`w-full py-4 ${plan.buttonBg} text-white font-bold text-lg rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg`}
                  >
                    BOOK NOW!
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-2">Need Custom Parking Solutions?</h3>
            <p className="text-white/90 mb-4">
              Contact us for corporate parking packages and bulk booking discounts.
            </p>
            <Button 
              onClick={() => navigate("/contact")}
              className="bg-white text-cyan-600 hover:bg-white/90 font-bold px-8"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PricingTable;
