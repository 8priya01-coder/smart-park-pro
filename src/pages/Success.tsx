import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Download } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const [registrationData, setRegistrationData] = useState<any>(null);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    const data = localStorage.getItem("registrationData");
    if (data) {
      setRegistrationData(JSON.parse(data));
    }
  }, [navigate]);

  const handleBackToDashboard = () => {
    localStorage.removeItem("registrationData");
    navigate("/dashboard");
  };

  if (!registrationData) return null;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full shadow-elegant">
        <CardHeader className="text-center space-y-4 pb-4">
          <div className="mx-auto w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-success animate-in zoom-in duration-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">
            Car Parking Registered Successfully!
          </CardTitle>
          <p className="text-muted-foreground">
            Your parking reservation has been confirmed
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Confirmation Details */}
          <div className="bg-secondary/50 rounded-lg p-6 space-y-3">
            <h3 className="font-semibold text-lg mb-4 text-foreground">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Owner Name</p>
                <p className="font-semibold text-foreground">{registrationData.ownerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Car Number</p>
                <p className="font-semibold text-foreground">{registrationData.carNumber}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Parking Spot</p>
                <p className="font-bold text-accent text-lg">{registrationData.selectedSpot}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="font-semibold text-foreground">{registrationData.parkingHours} hours</p>
              </div>
              <div>
                <p className="text-muted-foreground">Car Type</p>
                <p className="font-semibold text-foreground capitalize">{registrationData.carType}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Amount Paid</p>
                <p className="font-bold text-success text-lg">₹{registrationData.totalPrice}</p>
              </div>
            </div>
          </div>

          {/* Booking Reference */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Booking Reference</p>
            <p className="font-mono font-bold text-foreground text-xl">
              PARK{Math.random().toString(36).substring(2, 10).toUpperCase()}
            </p>
          </div>

          {/* Important Info */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold text-sm mb-2 text-foreground">Important Information</h4>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
              <li>Please display this confirmation at the parking entrance</li>
              <li>Arrive within 15 minutes to claim your reserved spot</li>
              <li>Additional charges apply for extended duration</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleBackToDashboard}
              className="flex-1 h-11 gradient-accent text-accent-foreground font-semibold hover:opacity-90 transition-smooth shadow-glow"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <Button
              variant="outline"
              className="flex-1 h-11 font-semibold"
              onClick={() => window.print()}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
