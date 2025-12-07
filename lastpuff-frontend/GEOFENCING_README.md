# Geofencing Feature - LastPuff

## Overview
The geofencing feature helps users avoid smoking triggers by sending push notifications when they enter or exit designated zones.

## Features Implemented

### 1. **Interactive Map**
- Dark-themed map with custom styling
- Real-time user location tracking
- Visual representation of geofence zones with colored circles
- Tap-to-add zone functionality

### 2. **Two Types of Zones**

#### Trigger Zones (Red)
- Mark high-risk locations where you're tempted to smoke
- Examples: bars, smoking areas, friend's houses
- Get alerts when approaching these areas

#### Safe Zones (Green)
- Mark smoke-free areas for positive reinforcement
- Examples: gym, home, workplace
- Get encouragement when entering these zones

### 3. **Push Notifications**
- **Trigger Zone Entry**: "⚠️ Trigger Zone Alert - You're entering [zone name]. Stay strong!"
- **Trigger Zone Exit**: "✅ Left Trigger Zone - Great job avoiding temptation!"
- **Safe Zone Entry**: "🛡️ Safe Zone - Welcome to [zone name] - a smoke-free zone!"
- **Safe Zone Exit**: "👋 Leaving Safe Zone - Stay committed to your goals!"

### 4. **Zone Management**
- Add zones by tapping anywhere on the map
- Customize zone name, type, and radius (50-1000 meters)
- Toggle notifications for entering/exiting each zone
- Delete zones with confirmation
- View all zones in a scrollable list

### 5. **Background Monitoring**
- Geofencing works even when the app is closed
- Uses native iOS/Android location services
- Battery-efficient background tracking

## How to Use

### Initial Setup
1. Navigate to the **Geofencing** tab
2. Grant location permissions (Always/Background)
3. Grant notification permissions
4. The map will center on your current location

### Adding a Zone
1. Tap anywhere on the map to select a location
2. A modal will appear with zone configuration options
3. Enter zone details:
   - **Name**: Give your zone a memorable name
   - **Type**: Choose Trigger or Safe zone
   - **Radius**: Set the detection radius (50-1000m)
   - **Notifications**: Toggle enter/exit alerts
4. Tap "Add Zone" to save

### Managing Zones
- **View zones**: Scroll through the list below the map
- **Delete zone**: Tap the trash icon on any zone card
- **Toggle geofencing**: Tap the bell icon in the header

### Best Practices
- Set trigger zones at locations you frequently visit where you're tempted
- Use a radius of 100-200m for most locations
- Enable both enter and exit notifications for maximum awareness
- Create safe zones at places that support your quit journey

## Technical Details

### Permissions Required
- **Location (Always)**: For background geofencing
- **Location (When In Use)**: For map display
- **Notifications**: For push alerts

### Files Created/Modified
1. **`services/geofencing.ts`** - Core geofencing logic
   - Zone management (CRUD operations)
   - Background task definition
   - Notification handling
   - Permission requests

2. **`app/(tabs)/geofencing.tsx`** - UI Component
   - Interactive map with MapView
   - Zone creation modal
   - Zone list display
   - Real-time status indicators

3. **`app.json`** - Configuration
   - Location plugin with background permissions
   - Notification plugin setup
   - Permission descriptions

### Dependencies Added
- `expo-location` - Location tracking and geofencing
- `expo-task-manager` - Background task execution
- `expo-notifications` - Push notification system
- `react-native-maps` - Interactive map display

### Storage
- Zones are stored locally using AsyncStorage
- Persists across app restarts
- Key: `@geofence_zones`

### Background Task
- Task name: `GEOFENCING_TASK`
- Monitors all active zones simultaneously
- Triggers on enter/exit events
- Sends immediate push notifications

## Testing

### On Device (Recommended)
1. Build the app: `npx expo run:android` or `npx expo run:ios`
2. Grant all permissions when prompted
3. Add a test zone near your current location
4. Walk in/out of the zone to test notifications

### Simulator Limitations
- iOS Simulator: Limited geofencing support
- Android Emulator: Can simulate location changes
- Use GPX files or location simulation tools

## Troubleshooting

### Notifications Not Working
- Ensure notification permissions are granted
- Check that geofencing is enabled (bell icon should be green)
- Verify zones have notifications enabled
- Test with foreground notifications first

### Location Not Updating
- Check location permissions (should be "Always")
- Ensure location services are enabled on device
- Try the location button to refresh current position

### Zones Not Triggering
- Verify radius is appropriate (try increasing to 200m)
- Ensure background location is enabled
- Check that the zone is saved (appears in list)
- Walk completely in/out of the zone boundary

## Future Enhancements
- [ ] Zone history and analytics
- [ ] Scheduled zone activation (e.g., only trigger on weekends)
- [ ] Integration with progress tracking
- [ ] Heatmap of trigger zone visits
- [ ] Share zones with support network

## Notes
- Geofencing accuracy depends on device GPS capabilities
- Battery usage is optimized but may vary by device
- Minimum radius of 50m for reliable detection
- Maximum of 20 zones recommended for best performance
