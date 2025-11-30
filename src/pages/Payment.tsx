import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, CreditCard, Smartphone } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [registrationData, setRegistrationData] = useState<any>(null);
  
  // PhonePe
  const [phonepeUpi, setPhonepeUpi] = useState("");
  
  // Card
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const data = localStorage.getItem("registrationData");
    if (!data) {
      toast({
        title: "Error",
        description: "No registration data found. Please register first.",
        variant: "destructive",
      });
      navigate("/register");
      return;
    }

    setRegistrationData(JSON.parse(data));
  }, [navigate, toast]);

  const handlePhonePePayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phonepeUpi) {
      toast({
        title: "Error",
        description: "Please enter your UPI ID",
        variant: "destructive",
      });
      return;
    }

    processPayment("PhonePe");
  };

  const handleCardPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !expiryDate || !cvv || !cardName) {
      toast({
        title: "Error",
        description: "Please fill in all card details",
        variant: "destructive",
      });
      return;
    }

    processPayment("Card");
  };

  const processPayment = (method: string) => {
    // Simulate payment processing
    toast({
      title: "Processing Payment",
      description: "Please wait...",
    });

    setTimeout(() => {
      toast({
        title: "Payment Successful!",
        description: `Paid ₹${registrationData?.totalPrice} via ${method}`,
      });
      navigate("/success");
    }, 1500);
  };

  if (!registrationData) return null;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/register")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Payment</h1>
            <p className="text-xs text-muted-foreground">Complete your parking reservation</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Payment Methods */}
          <div className="lg:col-span-2">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl">Choose Payment Method</CardTitle>
                <CardDescription>Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="phonepe" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="phonepe" className="gap-2">
                      <Smartphone className="h-4 w-4" />
                      PhonePe
                    </TabsTrigger>
                    <TabsTrigger value="card" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Card
                    </TabsTrigger>
                  </TabsList>

                  {/* PhonePe Tab */}
                  <TabsContent value="phonepe">
                    <form onSubmit={handlePhonePePayment} className="space-y-4">
                      <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                          <Smartphone className="h-12 w-12 text-white" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phonepeUpi">UPI ID</Label>
                        <Input
                          id="phonepeUpi"
                          placeholder="yourname@phonepe"
                          value={phonepeUpi}
                          onChange={(e) => setPhonepeUpi(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-smooth"
                      >
                        Pay ₹{registrationData.totalPrice}
                      </Button>
                    </form>
                  </TabsContent>

                  {/* Card Tab */}
                  <TabsContent value="card">
                    <form onSubmit={handleCardPayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          maxLength={19}
                          className="h-11"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            maxLength={5}
                            className="h-11"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            type="password"
                            placeholder="123"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            maxLength={3}
                            className="h-11"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          placeholder="John Doe"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="h-11"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full h-11 gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow"
                      >
                        Pay ₹{registrationData.totalPrice}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-elegant sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner</span>
                    <span className="font-medium">{registrationData.ownerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Car Number</span>
                    <span className="font-medium">{registrationData.carNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Parking Spot</span>
                    <span className="font-bold text-accent">{registrationData.selectedSpot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span className="font-medium">{registrationData.parkingHours} hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Car Type</span>
                    <span className="font-medium capitalize">{registrationData.carType}</span>
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-base font-semibold">Total Amount</span>
                    <span className="text-2xl font-bold text-foreground">
                      ₹{registrationData.totalPrice}
                    </span>
                  </div>
                </div>

                {registrationData.carType === "electric" && (
                  <div className="bg-accent/10 border border-accent/30 rounded-lg p-3">
                    <p className="text-xs text-accent font-medium">
                      🌱 10% discount applied for electric vehicle
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
