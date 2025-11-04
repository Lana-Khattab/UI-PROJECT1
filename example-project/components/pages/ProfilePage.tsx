import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { RecipeCard } from '../recipe/RecipeCard';
import { Camera, Mail, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import { mockRecipes } from '../../data/mockRecipes';
import { toast } from 'sonner@2.0.3';

export function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [recipes, setRecipes] = useState(mockRecipes);
  const [profile, setProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    location: 'San Francisco, CA',
    bio: 'Home cook & food enthusiast. Love experimenting with new recipes and sharing them with the community!',
    memberSince: 'January 2024'
  });
  const [editedProfile, setEditedProfile] = useState(profile);

  const favoriteRecipes = recipes.filter(r => r.isFavorite);
  const myRecipes = recipes.slice(0, 3); // Mock user's recipes

  const toggleFavorite = (id: string) => {
    setRecipes(recipes.map(r => 
      r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
    ));
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <Card className="p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 mb-3">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl bg-orange-100 text-orange-600">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>

            <div className="flex-1">
              {!isEditing ? (
                <>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="mb-2">{profile.name}</h2>
                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>Member since {profile.memberSince}</span>
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => setIsEditing(true)}>
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  <p className="text-gray-700">{profile.bio}</p>
                </>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editedProfile.location}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={3}
                      value={editedProfile.bio}
                      onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 text-center">
            <p className="text-3xl font-semibold text-orange-500">{myRecipes.length}</p>
            <p className="text-gray-600">Recipes Created</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-semibold text-orange-500">{favoriteRecipes.length}</p>
            <p className="text-gray-600">Favorites</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-semibold text-orange-500">12</p>
            <p className="text-gray-600">Followers</p>
          </Card>
          <Card className="p-4 text-center">
            <p className="text-3xl font-semibold text-orange-500">34</p>
            <p className="text-gray-600">Following</p>
          </Card>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="my-recipes">
          <TabsList>
            <TabsTrigger value="my-recipes">My Recipes</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="my-recipes" className="mt-6">
            {myRecipes.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600 mb-4">You haven't created any recipes yet.</p>
                <Button>Create Your First Recipe</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {myRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="mt-6">
            {favoriteRecipes.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-gray-600 mb-4">You haven't saved any favorite recipes yet.</p>
                <Button>Explore Recipes</Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteRecipes.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} onToggleFavorite={toggleFavorite} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity" className="mt-6">
            <div className="space-y-4">
              {[
                { action: 'Created a recipe', item: 'Creamy Garlic Pasta', time: '2 days ago' },
                { action: 'Added to favorites', item: 'Mediterranean Quinoa Bowl', time: '4 days ago' },
                { action: 'Reviewed', item: 'Chocolate Lava Cake', time: '1 week ago' },
                { action: 'Created a recipe', item: 'Herb-Grilled Chicken', time: '2 weeks ago' }
              ].map((activity, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>
                        <span className="text-gray-600">{activity.action}:</span>{' '}
                        <span className="font-semibold">{activity.item}</span>
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
