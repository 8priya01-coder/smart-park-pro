import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import parkingHero from "@/assets/parking-hero.jpg";
import { Car } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Simple validation - in real app, this would call an API
    if (email && password.length >= 6) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      toast({
        title: "Success",
        description: "Login successful!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Password must be at least 6 characters.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${parkingHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/85 to-accent/80" />
      </div>

      {/* Login Card */}
      <Card className="w-full max-w-md mx-4 relative z-10 shadow-elegant backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow">
            <Car className="h-8 w-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-base">
            Sign in to manage your parking reservations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email / Username</Label>
              <Input
                id="email"
                type="text"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-11 gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow"
            >
              Sign In
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              Demo: Use any email and password (6+ characters)
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
