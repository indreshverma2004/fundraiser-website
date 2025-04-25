import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Upload,
  X,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { toast } from "sonner";

const CampaignForm: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [totalContributionNeeded, setTotalContributionNeeded] = useState("");
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category,setCategory]=useState("");

  // Handle Image Upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImage(null);
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Use FormData for file uploads
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("category",category);
    formData.append("totalContributionNeeded", totalContributionNeeded);
    if (endDate) {
      formData.append("endDate", endDate.toISOString());
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "https://fundraiser-950o.onrender.com/api/campaigns/create",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 201) {
        toast.success("Campaign created successfully!");
        // Reset form fields
        setName("");
        setDescription("");
        setLocation("");
        setTotalContributionNeeded("");
        setCategory("");
        setEndDate(undefined);
        setImage(null);
      }
    } catch (error: any) {
      console.error("Error creating campaign:", error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <h3 className="text-lg font-medium">Campaign Details</h3>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name
        </label>
        <Input
          id="name"
          placeholder="Enter campaign name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <Textarea
          id="description"
          placeholder="Describe your campaign..."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location
        </label>
        <Input
          id="location"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="totalContributionNeeded" className="block text-sm font-medium mb-1">
          Fundraising Goal ($)
        </label>
        <Input
          id="totalContributionNeeded"
          type="number"
          placeholder="Amount you aim to raise"
          min="1"
          value={totalContributionNeeded}
          onChange={(e) => setTotalContributionNeeded(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium mb-1">
          Category
        </label>
        <Input
          id="category"
          placeholder="Enter Category name"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="end-date" className="block text-sm font-medium mb-1">
          End Date
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" id="end-date" className="w-full justify-start text-left font-normal h-10">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "PPP") : <span className="text-muted-foreground">Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus disabled={(date) => date < new Date()} />
          </PopoverContent>
        </Popover>
      </div>

      {/* Image Upload */}
      <div>
  <label className="block text-sm font-medium mb-1">Campaign Image</label>
  {image ? (
    <div className="relative rounded-lg overflow-hidden border border-border">
      <img src={URL.createObjectURL(image)} alt="Campaign" className="w-full h-48 object-cover" />
      <Button type="button" variant="destructive" size="icon" className="absolute top-2 right-2" onClick={handleRemoveImage}>
        <X className="h-4 w-4" />
      </Button>
    </div>
  ) : (
    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
      <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
      <p className="text-xs text-muted-foreground mb-4">PNG, JPG, or GIF up to 5MB</p>
      {/* FIX: Remove "hidden" class and directly trigger input via Button */}
      <input
        type="file"
        id="image"
        accept="image/*"
        onChange={handleImageUpload}
        className="absolute opacity-0 w-full h-full cursor-pointer"
      />
      <Button type="button" variant="secondary" onClick={() => document.getElementById("image")?.click()}>
        Select Image
      </Button>
    </div>
  )}
</div>


      <div className="pt-4 border-t border-border flex justify-end space-x-4">
        <Button type="button" variant="outline">
          Save as Draft
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating Campaign..." : "Create Campaign"}
        </Button>
      </div>
    </form>
  );
};

export default CampaignForm;
