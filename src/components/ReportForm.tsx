
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { AlertTriangle, Loader2, MapPin } from "lucide-react";
import { mockSubmitReport } from "@/lib/reportUtils";

interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

export function ReportForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState<Location | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const getCurrentLocation = () => {
    setIsLoadingLocation(true);
    
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        // In a real app, we would use a service like Google Maps API to reverse geocode
        // For now, we'll just set the coordinates
        const newLocation = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          address: "Your current location" // In production, this would come from reverse geocoding
        };
        
        setLocation(newLocation);
        toast.success("Location detected", {
          description: "Your current location will be included in the report."
        });
        setIsLoadingLocation(false);
      },
      (error) => {
        console.error("Error getting location", error);
        toast.error("Failed to get your location", {
          description: "Please try again or enter location manually."
        });
        setIsLoadingLocation(false);
      }
    );
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || !location) {
      toast.error("Please fill all required fields", {
        description: "Title, description and location are required."
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call our blockchain functions
      // For now, we'll use a mock function
      const result = await mockSubmitReport({
        title,
        description,
        location,
        timestamp: new Date().toISOString(),
      });
      
      toast.success("Report submitted successfully", {
        description: "Your report has been recorded on the blockchain."
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setLocation(null);
      
    } catch (error) {
      console.error("Error submitting report", error);
      toast.error("Failed to submit report", {
        description: "Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Report an Incident</CardTitle>
        <CardDescription>
          Submit your report securely and anonymously
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Incident Title</Label>
            <Input
              id="title"
              placeholder="Brief title describing the incident"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Provide details about what happened"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label>Location</Label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={getCurrentLocation}
                className="flex items-center gap-2"
                disabled={isLoadingLocation}
              >
                {isLoadingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MapPin className="h-4 w-4" />
                )}
                {location ? "Update Location" : "Use Current Location"}
              </Button>
              
              {location && (
                <span className="text-sm text-muted-foreground">
                  {location.address || `${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
                </span>
              )}
            </div>
          </div>
          
          <div className="bg-muted p-3 rounded-md flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-civic-pending flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Your identity is protected. Report details will be stored securely, and personal information will not be publicly visible.
            </p>
          </div>
        </CardContent>
        
        <CardFooter>
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting Report
              </>
            ) : (
              "Submit Report"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
