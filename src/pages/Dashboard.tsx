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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
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
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="bg-blue-100">
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/about")}>
              About Us
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleLogout}
              className="gap-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive transition-smooth"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Welcome Section */}
        <div className="mb-8 relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 shadow-elegant">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAyYzIuMjEgMCA0IDEuNzkgNCA0cy0xLjc5IDQtNCA0LTQtMS43OS00LTQgMS43OS00IDQtNHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome back, {userEmail.split('@')[0]}!
            </h2>
            <p className="text-white/90 text-lg">
              Ready to park your vehicle? Let's get started.
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-elegant hover:shadow-xl transition-smooth cursor-pointer border-2 border-transparent hover:border-accent bg-gradient-to-br from-card to-accent/5" onClick={handleRegisterCar}>
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
              <Button className="w-full gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow">
                Start Registration
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-elegant bg-gradient-to-br from-card to-primary/5">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 border border-primary/20">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Quick Stats</CardTitle>
              <CardDescription className="text-base">
                Your parking activity overview
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-muted-foreground">Available Spots</span>
                <span className="font-semibold text-success text-lg">24/30</span>
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
          <Card className="shadow-sm bg-gradient-to-br from-card to-blue-500/5 border-blue-500/20 hover:shadow-md transition-smooth">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center mb-2 border border-blue-500/20">
                <ParkingSquare className="h-5 w-5 text-blue-600" />
              </div>
              <CardTitle className="text-lg">Smart Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered parking spot recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-gradient-to-br from-card to-green-500/5 border-green-500/20 hover:shadow-md transition-smooth">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mb-2 border border-green-500/20">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <CardTitle className="text-lg">Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Multiple payment options with encryption
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-gradient-to-br from-card to-purple-500/5 border-purple-500/20 hover:shadow-md transition-smooth">
            <CardHeader className="pb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-2 border border-purple-500/20">
                <Clock className="h-5 w-5 text-purple-600" />
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
