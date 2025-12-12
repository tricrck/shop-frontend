import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Check, Loader2 } from "lucide-react";
import { createAddress, updateAddress, resetCreateAddress, resetUpdateAddress } from "../../actions/customerActions";

// Import Kenya counties data
import kenyaCounties from "../../assets/counties_hierarchical.json";

export function AddressModal({ 
  open, 
  onOpenChange, 
  editAddress = null,
  addressType = "shipping" // "shipping" or "billing"
}) {
  const dispatch = useDispatch();
  
  // Redux state
  const addressCreate = useSelector((state) => state.addressCreate);
  const { loading: createLoading, success: createSuccess, error: createError } = addressCreate;
  
  const addressUpdate = useSelector((state) => state.addressUpdate);
  const { loading: updateLoading, success: updateSuccess, error: updateError } = addressUpdate;

  // Form state
  const [formData, setFormData] = useState({
    address_type: addressType,
    street_address: "",
    apartment: "",
    county: "",
    subcounty: "",
    ward: "",
    city: "",
    postal_code: "",
    country: "Kenya",
    is_default: false
  });

  // Location options
  const [subcounties, setSubcounties] = useState([]);
  const [wards, setWards] = useState([]);

  // Get counties list
  const counties = kenyaCounties.map(county => ({
    id: county.county_id,
    name: county.county_name
  }));

  // Initialize form with edit data
  useEffect(() => {
    if (editAddress) {
      setFormData({
        address_type: editAddress.address_type || addressType,
        street_address: editAddress.street_address || "",
        apartment: editAddress.apartment || "",
        county: editAddress.county || "",
        subcounty: editAddress.subcounty || "",
        ward: editAddress.ward || "",
        city: editAddress.city || "",
        postal_code: editAddress.postal_code || "",
        country: editAddress.country || "Kenya",
        is_default: editAddress.is_default || false
      });

      // Set subcounties and wards if county is selected
      if (editAddress.county) {
        const selectedCounty = kenyaCounties.find(
          c => c.county_name === editAddress.county
        );
        if (selectedCounty) {
          setSubcounties(selectedCounty.subcounties || []);
          
          if (editAddress.subcounty) {
            const selectedSubcounty = selectedCounty.subcounties.find(
              sc => sc.constituency_name === editAddress.subcounty
            );
            if (selectedSubcounty) {
              setWards(selectedSubcounty.wards || []);
            }
          }
        }
      }
    } else {
      setFormData({
        address_type: addressType,
        street_address: "",
        apartment: "",
        county: "",
        subcounty: "",
        ward: "",
        city: "",
        postal_code: "",
        country: "Kenya",
        is_default: false
      });
    }
  }, [editAddress, addressType]);

  // Handle success
  useEffect(() => {
    if (createSuccess || updateSuccess) {
      handleClose();
      dispatch(resetCreateAddress());
      dispatch(resetUpdateAddress());
    }
  }, [createSuccess, updateSuccess, dispatch]);

  // Handle county change
  const handleCountyChange = (countyName) => {
    const selectedCounty = kenyaCounties.find(c => c.county_name === countyName);
    
    setFormData(prev => ({
      ...prev,
      county: countyName,
      subcounty: "",
      ward: "",
      city: countyName.toLowerCase().includes('nairobi') ? countyName : prev.city
    }));
    
    setSubcounties(selectedCounty?.subcounties || []);
    setWards([]);
  };

  // Handle subcounty change
  const handleSubcountyChange = (subcountyName) => {
    const selectedSubcounty = subcounties.find(
      sc => sc.constituency_name === subcountyName
    );
    
    setFormData(prev => ({
      ...prev,
      subcounty: subcountyName,
      ward: ""
    }));
    
    setWards(selectedSubcounty?.wards || []);
  };

  // Handle ward change
  const handleWardChange = (wardName) => {
    setFormData(prev => ({
      ...prev,
      ward: wardName
    }));
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle submit
  const handleSubmit = () => {
    // Validation
    if (!formData.street_address || !formData.county || !formData.city || !formData.postal_code) {
      return;
    }

    if (editAddress && editAddress.id) {
      dispatch(updateAddress(editAddress.id, formData));
    } else {
      dispatch(createAddress(formData));
    }
  };

  // Handle close
  const handleClose = () => {
    onOpenChange(false);
    setFormData({
      address_type: addressType,
      street_address: "",
      apartment: "",
      county: "",
      subcounty: "",
      ward: "",
      city: "",
      postal_code: "",
      country: "Kenya",
      is_default: false
    });
    setSubcounties([]);
    setWards([]);
    dispatch(resetCreateAddress());
    dispatch(resetUpdateAddress());
  };

  const loading = createLoading || updateLoading;
  const error = createError || updateError;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white border-2 border-black p-0 max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <DialogHeader className="border-b-2 border-black p-6 pb-5 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-sm uppercase tracking-[0.3em] font-medium">
              {editAddress ? "Edit" : "Add"} {formData.address_type} Address
            </DialogTitle>
            <button
              onClick={handleClose}
              className="hover:bg-gray-100 p-1 rounded transition-colors"
              disabled={loading}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </DialogHeader>

        {/* Form */}
        <div className="p-6 space-y-5">
          {/* Error Display */}
          {error && (
            <div className="p-3 border-2 border-red-500 bg-red-50 text-red-700 text-xs">
              {typeof error === 'string' ? error : JSON.stringify(error)}
            </div>
          )}

          {/* Address Type */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Address Type
            </Label>
            <Select 
              value={formData.address_type} 
              onValueChange={(value) => handleInputChange('address_type', value)}
              disabled={loading}
            >
              <SelectTrigger className="h-11 border-black border-2 bg-white text-sm focus:ring-0 focus:ring-offset-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="border-2 border-black">
                <SelectItem value="shipping" className="text-sm py-2.5 focus:bg-black focus:text-white">
                  Shipping
                </SelectItem>
                <SelectItem value="billing" className="text-sm py-2.5 focus:bg-black focus:text-white">
                  Billing
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Street Address */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Street Address *
            </Label>
            <Input
              type="text"
              placeholder="123 Main Street"
              className="h-11 border-black border-2 bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              value={formData.street_address}
              onChange={(e) => handleInputChange('street_address', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Apartment/Unit */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Apartment/Unit (Optional)
            </Label>
            <Input
              type="text"
              placeholder="Apt 4B"
              className="h-11 border-black border-2 bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              value={formData.apartment}
              onChange={(e) => handleInputChange('apartment', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* County */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              County *
            </Label>
            <Select 
              value={formData.county} 
              onValueChange={handleCountyChange}
              disabled={loading}
            >
              <SelectTrigger className="h-11 border-black border-2 bg-white text-sm focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Select county" />
              </SelectTrigger>
              <SelectContent className="border-2 border-black">
                {counties.map((county) => (
                  <SelectItem 
                    key={county.id} 
                    value={county.name} 
                    className="text-sm py-2.5 focus:bg-black focus:text-white"
                  >
                    {county.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Subcounty */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Subcounty (Optional)
            </Label>
            <Select
              value={formData.subcounty}
              onValueChange={handleSubcountyChange}
              disabled={!formData.county || loading}
            >
              <SelectTrigger 
                className={`h-11 border-black border-2 bg-white text-sm focus:ring-0 focus:ring-offset-0 ${
                  !formData.county ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <SelectValue placeholder={formData.county ? "Select subcounty" : "Select county first"} />
              </SelectTrigger>
              <SelectContent className="border-2 border-black">
                {subcounties.map((subcounty, idx) => (
                  <SelectItem 
                    key={`${subcounty.subcounty_id}-${idx}`} 
                    value={subcounty.constituency_name} 
                    className="text-sm py-2.5 focus:bg-black focus:text-white capitalize"
                  >
                    {subcounty.constituency_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ward */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Ward (Optional)
            </Label>
            <Select
              value={formData.ward}
              onValueChange={handleWardChange}
              disabled={!formData.subcounty || loading}
            >
              <SelectTrigger 
                className={`h-11 border-black border-2 bg-white text-sm focus:ring-0 focus:ring-offset-0 ${
                  !formData.subcounty ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                <SelectValue placeholder={formData.subcounty ? "Select ward" : "Select subcounty first"} />
              </SelectTrigger>
              <SelectContent className="border-2 border-black">
                {wards.map((ward, idx) => (
                  <SelectItem 
                    key={`${ward.station_id}-${idx}`} 
                    value={ward.ward_name} 
                    className="text-sm py-2.5 focus:bg-black focus:text-white capitalize"
                  >
                    {ward.ward_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City/Town */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              City/Town *
            </Label>
            <Input
              type="text"
              placeholder="Nairobi"
              className="h-11 border-black border-2 bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Postal Code */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Postal Code *
            </Label>
            <Input
              type="text"
              placeholder="00100"
              className="h-11 border-black border-2 bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              value={formData.postal_code}
              onChange={(e) => handleInputChange('postal_code', e.target.value)}
              disabled={loading}
            />
          </div>

          {/* Country */}
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-[0.2em] font-medium">
              Country
            </Label>
            <Input
              type="text"
              placeholder="Kenya"
              className="h-11 border-black border-2 bg-gray-100 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
              value={formData.country}
              disabled
            />
          </div>

          {/* Set as Default */}
          <div className="flex items-center space-x-3 pt-2">
            <input
              type="checkbox"
              id="is_default"
              checked={formData.is_default}
              onChange={(e) => handleInputChange('is_default', e.target.checked)}
              className="w-4 h-4 border-2 border-black focus:ring-0 focus:ring-offset-0"
              disabled={loading}
            />
            <Label 
              htmlFor="is_default" 
              className="text-[10px] uppercase tracking-[0.2em] font-medium cursor-pointer"
            >
              Set as default {formData.address_type} address
            </Label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1 h-11 border-2 border-black bg-white hover:bg-gray-50 text-[10px] uppercase tracking-[0.2em] font-medium"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="flex-1 h-11 bg-black text-white hover:bg-gray-900 text-[10px] uppercase tracking-[0.2em] font-medium disabled:opacity-50"
              disabled={loading || !formData.street_address || !formData.county || !formData.city || !formData.postal_code}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  {editAddress ? 'Update' : 'Save'} Address
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}