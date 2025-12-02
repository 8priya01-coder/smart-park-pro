import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Zap, Car as CarIcon, Clock, ParkingSquare } from "lucide-react";
import { format, addHours } from "date-fns";

const PARKING_SPOTS = [
  { id: "A1", occupied: false },
  { id: "A2", occupied: true },
  { id: "A3", occupied: false },
  { id: "A4", occupied: false },
  { id: "B1", occupied: false },
  { id: "B2", occupied: false },
  { id: "B3", occupied: true },
  { id: "B4", occupied: false },
  { id: "C1", occupied: false },
  { id: "C2", occupied: false },
  { id: "C3", occupied: false },
  { id: "C4", occupied: true },
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [ownerName, setOwnerName] = useState("");
  const [carNumber, setCarNumber] = useState("");
  const [parkingHours, setParkingHours] = useState("");
  const [carType, setCarType] = useState("");
  const [selectedSpot, setSelectedSpot] = useState("");

  const currentTime = useMemo(() => new Date(), []);
  
  const returnTime = useMemo(() => {
    if (parkingHours) {
      return addHours(currentTime, parseInt(parkingHours));
    }
    return null;
  }, [parkingHours, currentTime]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!ownerName || !carNumber || !parkingHours || !carType || !selectedSpot) {
      toast({
        title: "Error",
        description: "Please fill in all fields and select a parking spot",
        variant: "destructive",
      });
      return;
    }

    // Calculate price
    const hours = parseInt(parkingHours);
    const baseRate = 50;
    const electricCarDiscount = carType === "electric" ? 0.9 : 1;
    const totalPrice = hours * baseRate * electricCarDiscount;

    // Store registration data
    const registrationData = {
      ownerName,
      carNumber,
      parkingHours: hours,
      carType,
      selectedSpot,
      totalPrice,
      entryTime: currentTime.toISOString(),
      returnTime: returnTime?.toISOString(),
    };

    localStorage.setItem("registrationData", JSON.stringify(registrationData));

    toast({
      title: "Details Saved",
      description: "Proceeding to payment...",
    });

    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center">
              <ParkingSquare className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">ParkEasy</h1>
              <p className="text-xs text-muted-foreground">Smart Parking System</p>
            </div>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate("/about")}>
              About Us
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/dashboard")}
          className="gap-2 mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Owner & Car Details */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Owner & Vehicle Details</CardTitle>
              <CardDescription>Enter your personal and vehicle information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ownerName">Owner Name</Label>
                  <Input
                    id="ownerName"
                    placeholder="John Doe"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carNumber">Car Number</Label>
                  <Input
                    id="carNumber"
                    placeholder="DL01AB1234"
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value.toUpperCase())}
                    className="h-11"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parkingHours">Parking Duration (Hours)</Label>
                  <Input
                    id="parkingHours"
                    type="number"
                    min="1"
                    max="24"
                    placeholder="4"
                    value={parkingHours}
                    onChange={(e) => setParkingHours(e.target.value)}
                    className="h-11"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="carType">Car Type</Label>
                  <Select value={carType} onValueChange={setCarType}>
                    <SelectTrigger id="carType" className="h-11">
                      <SelectValue placeholder="Select car type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electric">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-accent" />
                          Electric Car (10% discount)
                        </div>
                      </SelectItem>
                      <SelectItem value="normal">
                        <div className="flex items-center gap-2">
                          <CarIcon className="h-4 w-4 text-primary" />
                          Normal Car
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parking Spot Selection */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl">Select Parking Spot</CardTitle>
              <CardDescription>Choose an available parking space</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-6 gap-3">
                {PARKING_SPOTS.map((spot) => (
                  <button
                    key={spot.id}
                    type="button"
                    disabled={spot.occupied}
                    onClick={() => setSelectedSpot(spot.id)}
                    className={`
                      h-20 rounded-lg border-2 font-semibold transition-smooth
                      ${spot.occupied 
                        ? "bg-muted border-border cursor-not-allowed opacity-50" 
                        : selectedSpot === spot.id
                        ? "gradient-accent border-accent text-accent-foreground shadow-glow"
                        : "bg-card border-border hover:border-accent hover:shadow-md"
                      }
                    `}
                  >
                    <div className="text-lg">{spot.id}</div>
                    <div className="text-xs mt-1">
                      {spot.occupied ? "Occupied" : "Available"}
                    </div>
                  </button>
                ))}
              </div>
              {selectedSpot && (
                <div className="mt-4 p-3 bg-accent/10 border border-accent/30 rounded-lg">
                  <p className="text-sm font-medium text-accent">
                    Selected Spot: <span className="text-lg font-bold">{selectedSpot}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Time Duration Card */}
          {parkingHours && (
            <Card className="shadow-elegant border-blue-500/30 bg-gradient-to-br from-card to-blue-500/5">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Parking Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground mb-1">Entry Time (Now)</p>
                    <p className="text-xl font-bold text-green-700">
                      {format(currentTime, "hh:mm a")}
                    </p>
                    <p className="text-sm text-green-600">
                      {format(currentTime, "dd MMM yyyy")}
                    </p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-sm text-muted-foreground mb-1">Return Before</p>
                    <p className="text-xl font-bold text-orange-700">
                      {returnTime && format(returnTime, "hh:mm a")}
                    </p>
                    <p className="text-sm text-orange-600">
                      {returnTime && format(returnTime, "dd MMM yyyy")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Price Summary */}
          {parkingHours && carType && (
            <Card className="shadow-elegant border-accent/30">
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Total</p>
                    <p className="text-3xl font-bold text-foreground">
                      ₹{parseInt(parkingHours) * 50 * (carType === "electric" ? 0.9 : 1)}
                    </p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>₹50/hour × {parkingHours} hours</p>
                    {carType === "electric" && (
                      <p className="text-accent font-medium">10% EV discount applied</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full h-12 text-lg gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow"
          >
            Proceed to Payment
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Register;
