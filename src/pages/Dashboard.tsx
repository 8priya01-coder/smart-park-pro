import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ParkingSquare, LogOut, Clock, CreditCard } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
      return;
    }
    
    const email = localStorage.getItem("userEmail") || "User";
    setUserEmail(email);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  const handleRegisterCar = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-accent flex items-center justify-center shadow-glow">
              <ParkingSquare className="h-6 w-6 text-accent-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ParkEasy</h1>
              <p className="text-xs text-muted-foreground">Smart Parking System</p>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {userEmail.split('@')[0]}!
          </h2>
          <p className="text-muted-foreground text-lg">
            Ready to park your vehicle? Let's get started.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-elegant hover:shadow-xl transition-smooth cursor-pointer border-2 border-transparent hover:border-accent" onClick={handleRegisterCar}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center mb-3 shadow-glow">
                <Car className="h-6 w-6 text-accent-foreground" />
              </div>
              <CardTitle className="text-2xl">Register Your Car</CardTitle>
              <CardDescription className="text-base">
                Book a parking spot for your vehicle now
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth">
                Start Registration
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-3">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <CardTitle className="text-2xl">Quick Stats</CardTitle>
              <CardDescription className="text-base">
                Your parking activity overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Available Spots</span>
                <span className="font-semibold text-foreground text-lg">24/30</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Average Wait Time</span>
                <span className="font-semibold text-foreground text-lg">2 mins</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Hourly Rate</span>
                <span className="font-semibold text-accent text-lg">₹50/hr</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-2">
                <ParkingSquare className="h-5 w-5 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">Smart Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered parking spot recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-2">
                <CreditCard className="h-5 w-5 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multiple payment options with encryption
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-secondary-foreground" />
              </div>
              <CardTitle className="text-lg">24/7 Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Round-the-clock parking management
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
