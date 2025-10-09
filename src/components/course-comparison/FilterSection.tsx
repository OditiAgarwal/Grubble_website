
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";

export type CourseFilters = {
  platform: string; // all | coursera | udemy | edx | pluralsight
  level: string; // all | beginner | intermediate | advanced
  duration: [number, number]; // hours range
  rating: string; // any | 3.5 | 4.0 | 4.5
  priceRange: string; // all | free | paid | under-50 | 50-100 | over-100
};

interface FilterSectionProps {
  filters: CourseFilters;
  onChange: (next: Partial<CourseFilters>) => void;
  onApply?: () => void;
}

export const FilterSection = ({ filters, onChange, onApply }: FilterSectionProps) => {
  return (
    <div className="space-y-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Filter className="h-5 w-5" />
        Filter Courses
      </h3>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Platform</label>
          <Select value={filters.platform} onValueChange={(v) => onChange({ platform: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="coursera">Coursera</SelectItem>
              <SelectItem value="udemy">Udemy</SelectItem>
              <SelectItem value="edx">edX</SelectItem>
              <SelectItem value="pluralsight">Pluralsight</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Difficulty Level</label>
          <Select value={filters.level} onValueChange={(v) => onChange({ level: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Duration (hours)</label>
          <Slider value={filters.duration} onValueChange={(v) => onChange({ duration: v as [number, number] })} max={50} step={1} />
          <div className="flex justify-between text-sm text-gray-500">
            <span>{filters.duration[0]}h</span>
            <span>{filters.duration[1]}h+</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Rating</label>
          <Select value={filters.rating} onValueChange={(v) => onChange({ rating: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select minimum rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Rating</SelectItem>
              <SelectItem value="4.5">4.5+ Stars</SelectItem>
              <SelectItem value="4.0">4.0+ Stars</SelectItem>
              <SelectItem value="3.5">3.5+ Stars</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Price Range</label>
          <Select value={filters.priceRange} onValueChange={(v) => onChange({ priceRange: v })}>
            <SelectTrigger>
              <SelectValue placeholder="Select price range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Prices</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="under-50">Under $50</SelectItem>
              <SelectItem value="50-100">$50 - $100</SelectItem>
              <SelectItem value="over-100">Over $100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full" onClick={onApply}>Apply Filters</Button>
      </div>
    </div>
  );
};
