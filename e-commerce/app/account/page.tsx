"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";
import { User, updateUser, deleteUserAccount } from "@/lib/api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AccountPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<User> | null>(null);
  const [activeTab, setActiveTab] = useState("profile");

  // Initialize form data when user data is available
  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  if (isLoading || !user || !formData) {
    return (
      <div className="container mx-auto py-10 flex justify-center items-center min-h-[50vh]">
        <div className="animate-pulse text-xl">
          Loading account information...
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...(formData[parent as keyof typeof formData] as any),
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleNestedChange = (
    parent: string,
    child: string,
    grandchild: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      [parent]: {
        ...(formData[parent as keyof typeof formData] as any),
        [child]: {
          ...((formData[parent as keyof typeof formData] as any)?.[child] ||
            {}),
          [grandchild]: value,
        },
      },
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Update the user in localStorage
    if (formData) {
      updateUser(formData as User);
    }

    setIsEditing(false);
    toast.success("Account information updated successfully");
  };

  const handleDeleteAccount = () => {
    // Delete the account and logout
    deleteUserAccount();
    logout();
    toast.success("Your account has been deleted successfully");
    router.push("/");
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        {/* Sidebar */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${user.name.firstname}+${user.name.lastname}&background=random`}
                  />
                  <AvatarFallback>
                    {user.name.firstname[0]}
                    {user.name.lastname[0]}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">
                  {user.name.firstname} {user.name.lastname}
                </h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>

              <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
                orientation="vertical"
              >
                <TabsList className="flex flex-col h-auto bg-transparent gap-1">
                  <TabsTrigger value="profile" className="justify-start">
                    Profile
                  </TabsTrigger>
                  <TabsTrigger value="address" className="justify-start">
                    Address
                  </TabsTrigger>
                  <TabsTrigger value="security" className="justify-start">
                    Security
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>
                    {activeTab === "profile" && "Personal Information"}
                    {activeTab === "address" && "Address Information"}
                    {activeTab === "security" && "Security Settings"}
                  </CardTitle>
                  <CardDescription>
                    {activeTab === "profile" &&
                      "Manage your personal information"}
                    {activeTab === "address" && "Manage your shipping address"}
                    {activeTab === "security" && "Manage your account security"}
                  </CardDescription>
                </div>
                {!isEditing && (
                  <Button onClick={() => setIsEditing(true)}>Edit</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <Tabs value={activeTab} className="w-full">
                  {/* Profile Tab */}
                  <TabsContent value="profile" className="mt-0">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstname">First Name</Label>
                          <Input
                            id="firstname"
                            name="name.firstname"
                            value={formData.name?.firstname || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname">Last Name</Label>
                          <Input
                            id="lastname"
                            name="name.lastname"
                            value={formData.name?.lastname || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          name="username"
                          value={formData.username || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </TabsContent>

                  {/* Address Tab */}
                  <TabsContent value="address" className="mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street</Label>
                        <Input
                          id="street"
                          name="address.street"
                          value={formData.address?.street || ""}
                          onChange={handleChange}
                          disabled={!isEditing}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="number">Number</Label>
                          <Input
                            id="number"
                            name="address.number"
                            type="number"
                            value={formData.address?.number || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            name="address.city"
                            value={formData.address?.city || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipcode">ZIP Code</Label>
                          <Input
                            id="zipcode"
                            name="address.zipcode"
                            value={formData.address?.zipcode || ""}
                            onChange={handleChange}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="latitude">Latitude</Label>
                          <Input
                            id="latitude"
                            name="address.geolocation.lat"
                            value={formData.address?.geolocation?.lat || ""}
                            onChange={(e) =>
                              handleNestedChange(
                                "address",
                                "geolocation",
                                "lat",
                                e.target.value
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="longitude">Longitude</Label>
                          <Input
                            id="longitude"
                            name="address.geolocation.long"
                            value={formData.address?.geolocation?.long || ""}
                            onChange={(e) =>
                              handleNestedChange(
                                "address",
                                "geolocation",
                                "long",
                                e.target.value
                              )
                            }
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  {/* Security Tab */}
                  <TabsContent value="security" className="mt-0">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">
                          Current Password
                        </Label>
                        <Input
                          id="current-password"
                          name="currentPassword"
                          type="password"
                          disabled={!isEditing}
                          placeholder={
                            isEditing ? "Enter current password" : "••••••••"
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input
                          id="new-password"
                          name="newPassword"
                          type="password"
                          disabled={!isEditing}
                          placeholder={isEditing ? "Enter new password" : ""}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">
                          Confirm New Password
                        </Label>
                        <Input
                          id="confirm-password"
                          name="confirmPassword"
                          type="password"
                          disabled={!isEditing}
                          placeholder={isEditing ? "Confirm new password" : ""}
                        />
                      </div>

                      <div className="pt-4">
                        <h3 className="text-lg font-medium mb-2">
                          Account Actions
                        </h3>
                        <Separator className="my-4" />
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" type="button">
                              Delete Account
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you absolutely sure?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleDeleteAccount}>
                                Yes, delete my account
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {isEditing && (
                  <div className="flex justify-end gap-2 mt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setFormData({ ...user });
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Changes</Button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
