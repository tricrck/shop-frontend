// WarehouseManager.jsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Building2, 
  MapPin, 
  CheckCircle, 
  Edit, 
  Trash2, 
  Plus,
  Search,
  Filter,
  MoreVertical
} from 'lucide-react';
import {
  listWarehouses,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  setWarehousePrimary,
  setInventoryFilters,
  clearInventoryFilters
} from '../../../actions/inventoryActions';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Skeleton } from '../../../components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../components/ui/dialog';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';

export const WarehouseManager = () => {
  const dispatch = useDispatch();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    phone: '',
    email: '',
    is_active: true,
    notes: ''
  });

  const { warehouses, loading, error } = useSelector(state => state.warehouseList);
  const { success: createSuccess } = useSelector(state => state.warehouseCreate);
  const { success: updateSuccess } = useSelector(state => state.warehouseUpdate);
  const { success: deleteSuccess } = useSelector(state => state.warehouseDelete);

  console.log("Warehouses:", warehouses);

  useEffect(() => {
    dispatch(listWarehouses());
  }, [dispatch, createSuccess, updateSuccess, deleteSuccess]);

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await dispatch(createWarehouse(formData));
    if (result.success) {
      setIsCreateOpen(false);
      setFormData({
        name: '',
        code: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        phone: '',
        email: '',
        is_active: true,
        notes: ''
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const result = await dispatch(updateWarehouse(selectedWarehouse.id, formData));
    if (result.success) {
      setIsEditOpen(false);
      setSelectedWarehouse(null);
    }
  };

  const handleDelete = async () => {
    const result = await dispatch(deleteWarehouse(selectedWarehouse.id));
    if (result.success) {
      setIsDeleteOpen(false);
      setSelectedWarehouse(null);
    }
  };

  const handleSetPrimary = async (id) => {
    await dispatch(setWarehousePrimary(id));
  };

  const handleEditClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setFormData({
      name: warehouse.name,
      code: warehouse.code,
      address: warehouse.address,
      city: warehouse.city,
      state: warehouse.state,
      country: warehouse.country,
      postal_code: warehouse.postal_code,
      phone: warehouse.phone,
      email: warehouse.email,
      is_active: warehouse.is_active,
      notes: warehouse.notes || ''
    });
    setIsEditOpen(true);
  };

  const handleDeleteClick = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouse Management</h1>
          <p className="text-muted-foreground">Manage your warehouse locations and properties</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Warehouse</DialogTitle>
              <DialogDescription>
                Add a new warehouse location to your inventory system
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreate}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Warehouse Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Warehouse Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State/Province</Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => setFormData({...formData, country: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="postal_code">Postal Code</Label>
                    <Input
                      id="postal_code"
                      value={formData.postal_code}
                      onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="is_active">Active Warehouse</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Create Warehouse</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search warehouses..."
                  className="pl-10"
                  onChange={(e) => dispatch(setInventoryFilters({ search: e.target.value }))}
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => dispatch(clearInventoryFilters())}
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Warehouses Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {warehouses.map((warehouse) => (
            <Card key={warehouse.id} className={warehouse.is_primary ? 'border-primary border-2' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="h-5 w-5" />
                      <span>{warehouse.name}</span>
                      {warehouse.is_primary && (
                        <Badge variant="default" className="ml-2">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Primary
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center space-x-1 mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{warehouse.city}, {warehouse.country}</span>
                    </CardDescription>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleEditClick(warehouse)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {!warehouse.is_primary && (
                        <DropdownMenuItem onClick={() => handleSetPrimary(warehouse.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Set as Primary
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(warehouse)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Code:</span>
                    <span className="font-medium">{warehouse.code}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status:</span>
                    <Badge variant={warehouse.is_active ? "default" : "secondary"}>
                      {warehouse.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span>{warehouse.phone || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email:</span>
                    <span>{warehouse.email || 'N/A'}</span>
                  </div>
                  {warehouse.notes && (
                    <div className="pt-2 border-t">
                      <p className="text-muted-foreground">Notes:</p>
                      <p className="text-sm mt-1">{warehouse.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Warehouse</DialogTitle>
            <DialogDescription>
              Update warehouse information
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdate}>
            <div className="grid gap-4 py-4">
              {/* Same form fields as create, populated with selected warehouse data */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Warehouse Name *</Label>
                  <Input
                    id="edit-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-code">Warehouse Code *</Label>
                  <Input
                    id="edit-code"
                    value={formData.code}
                    onChange={(e) => setFormData({...formData, code: e.target.value})}
                    required
                  />
                </div>
              </div>
              {/* ... rest of form fields ... */}
            </div>
            <DialogFooter>
              <Button type="submit">Save Changes</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Warehouse</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedWarehouse?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete Warehouse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};