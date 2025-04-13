import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Calendar,
  Clock,
  Car,
  DollarSign,
  Filter,
  Search,
  Star,
  AlertCircle,
} from "lucide-react";

interface Job {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  vehicleType: string;
  dateTime: string;
  urgency: "low" | "medium" | "high";
  distance: string;
  estimatedDuration: string;
  photoUrl?: string;
  status: "open" | "assigned" | "completed";
}

const DriverBiddingInterface = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [bidAmount, setBidAmount] = useState<string>("");
  const [bidDialogOpen, setBidDialogOpen] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Mock data for jobs
  const jobs: Job[] = [
    {
      id: "1",
      pickupLocation: "123 Main St, Anytown, USA",
      dropoffLocation: "456 Oak Ave, Othertown, USA",
      vehicleType: "Sedan - Toyota Camry 2019",
      dateTime: "2023-06-15T14:30:00",
      urgency: "high",
      distance: "15 miles",
      estimatedDuration: "45 min",
      photoUrl:
        "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80",
      status: "open",
    },
    {
      id: "2",
      pickupLocation: "789 Pine Rd, Sometown, USA",
      dropoffLocation: "101 Maple Dr, Newtown, USA",
      vehicleType: "SUV - Honda CR-V 2020",
      dateTime: "2023-06-16T09:15:00",
      urgency: "medium",
      distance: "8 miles",
      estimatedDuration: "25 min",
      status: "open",
    },
    {
      id: "3",
      pickupLocation: "222 Elm St, Oldtown, USA",
      dropoffLocation: "333 Cedar Ln, Fartown, USA",
      vehicleType: "Truck - Ford F-150 2018",
      dateTime: "2023-06-15T17:45:00",
      urgency: "low",
      distance: "22 miles",
      estimatedDuration: "55 min",
      photoUrl:
        "https://images.unsplash.com/photo-1566933293069-b55c7f326dd4?w=800&q=80",
      status: "open",
    },
  ];

  const filteredJobs = jobs.filter((job) => {
    // Filter by status
    if (filter !== "all" && job.urgency !== filter) return false;

    // Filter by search query
    if (
      searchQuery &&
      !(
        job.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.dropoffLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.vehicleType.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
      return false;

    return true;
  });

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleBidSubmit = () => {
    // Here you would implement the actual bid submission logic
    console.log(`Submitted bid of $${bidAmount} for job ${selectedJob?.id}`);
    setBidDialogOpen(false);
    setBidAmount("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUrgencyColor = (urgency: "low" | "medium" | "high") => {
    switch (urgency) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-background min-h-screen p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Available Tow Jobs</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by location or vehicle type"
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by urgency" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Jobs</SelectItem>
              <SelectItem value="high">High Urgency</SelectItem>
              <SelectItem value="medium">Medium Urgency</SelectItem>
              <SelectItem value="low">Low Urgency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="list" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredJobs.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                  <p className="text-lg font-medium">
                    No jobs match your criteria
                  </p>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredJobs.map((job) => (
                <Card
                  key={job.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${selectedJob?.id === job.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => handleJobSelect(job)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          Tow Request #{job.id}
                        </CardTitle>
                        <CardDescription>
                          {job.distance} • {job.estimatedDuration} estimated
                        </CardDescription>
                      </div>
                      {job.urgency === "high" ? (
                        <Badge className="bg-yellow-500 text-yellow-900">
                          High Urgency
                        </Badge>
                      ) : (
                        <Badge variant={getUrgencyColor(job.urgency)}>
                          {job.urgency.charAt(0).toUpperCase() +
                            job.urgency.slice(1)} Urgency
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="font-medium">Pickup</p>
                          <p className="text-sm text-muted-foreground">
                            {job.pickupLocation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="font-medium">Dropoff</p>
                          <p className="text-sm text-muted-foreground">
                            {job.dropoffLocation}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Car className="h-4 w-4 text-muted-foreground mt-1 shrink-0" />
                        <div>
                          <p className="font-medium">Vehicle</p>
                          <p className="text-sm text-muted-foreground">
                            {job.vehicleType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatDate(job.dateTime)}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">
                            {formatTime(job.dateTime)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job);
                        setBidDialogOpen(true);
                      }}
                    >
                      Place Bid
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent
            value="map"
            className="h-[500px] rounded-md border border-border bg-muted flex items-center justify-center"
          >
            <div className="text-center">
              <p className="text-lg font-medium">Map View</p>
              <p className="text-muted-foreground">
                Map integration would be implemented here
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Bid Dialog */}
        <Dialog open={bidDialogOpen} onOpenChange={setBidDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Submit Your Bid</DialogTitle>
              <DialogDescription>
                Enter your price quote for this tow job.
              </DialogDescription>
            </DialogHeader>

            {selectedJob && (
              <div className="space-y-4 py-2">
                <div className="grid gap-2">
                  <h3 className="font-medium">Job Details</h3>
                  <div className="rounded-md bg-muted p-3 text-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>From: {selectedJob.pickupLocation}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>To: {selectedJob.dropoffLocation}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedJob.vehicleType}</span>
                    </div>
                  </div>
                </div>

                {selectedJob.photoUrl && (
                  <div>
                    <h3 className="font-medium mb-2">Vehicle Photo</h3>
                    <div className="rounded-md overflow-hidden h-40 bg-muted">
                      <img
                        src={selectedJob.photoUrl}
                        alt="Vehicle"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-medium mb-2">Your Bid Amount</h3>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      type="number"
                      placeholder="Enter your price"
                      className="pl-10"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="sm:justify-between">
              <Button variant="outline" onClick={() => setBidDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                type="submit"
                onClick={handleBidSubmit}
                disabled={!bidAmount || parseFloat(bidAmount) <= 0}
              >
                Submit Bid
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default DriverBiddingInterface;
