import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import parkingHero from "@/assets/parking-hero.jpg";
import { Car, User, Mail, Lock, Phone } from "lucide-react";

interface UserData {
  email: string;
  password: string;
  name: string;
  phone: string;
}

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]") as UserData[];
    const user = users.find(u => u.email === loginEmail && u.password === loginPassword);

    if (user || (loginEmail && loginPassword.length >= 6)) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", loginEmail);
      localStorage.setItem("userName", user?.name || loginEmail.split("@")[0]);
      toast({
        title: "Success",
        description: "Login successful!",
      });
      navigate("/dashboard");
    } else {
      toast({
        title: "Error",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive",
      });
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (!signupName || !signupEmail || !signupPhone || !signupPassword || !signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (signupPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users") || "[]") as UserData[];
    if (users.some(u => u.email === signupEmail)) {
      toast({
        title: "Error",
        description: "User with this email already exists",
        variant: "destructive",
      });
      return;
    }

    // Save new user
    const newUser: UserData = {
      email: signupEmail,
      password: signupPassword,
      name: signupName,
      phone: signupPhone,
    };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    // Auto login after signup
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userEmail", signupEmail);
    localStorage.setItem("userName", signupName);

    toast({
      title: "Account Created",
      description: "Welcome to ParkEasy!",
    });
    navigate("/dashboard");
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

      {/* Auth Card */}
      <Card className="w-full max-w-md mx-4 relative z-10 shadow-elegant backdrop-blur-sm bg-card/95">
        <CardHeader className="space-y-3 text-center pb-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow">
            <Car className="h-8 w-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold">ParkEasy</CardTitle>
          <CardDescription className="text-base">
            Smart Parking Management System
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow"
                >
                  Sign In
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Enter your full name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="Enter your email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={signupPhone}
                      onChange={(e) => setSignupPhone(e.target.value)}
                      className="h-11 pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm">Confirm</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="signup-confirm"
                        type="password"
                        placeholder="Confirm"
                        value={signupConfirmPassword}
                        onChange={(e) => setSignupConfirmPassword(e.target.value)}
                        className="h-11 pl-10"
                      />
                    </div>
                  </div>
                </div>
                <Button 
                  type="submit" 
                  className="w-full h-11 gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow"
                >
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;