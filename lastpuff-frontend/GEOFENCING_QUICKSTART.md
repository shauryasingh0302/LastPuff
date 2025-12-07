# Geofencing Quick Start Guide

## 🚀 Getting Started

### Step 1: Run the App
The app should already be running with `npm start`. If you need to rebuild:

```bash
# For Android
npx expo run:android

# For iOS
npx expo run:ios
```

### Step 2: Navigate to Geofencing Tab
1. Open the app on your device
2. Tap on the **Geofencing** tab (map icon)
3. Grant permissions when prompted:
   - ✅ Location (Always/Background)
   - ✅ Notifications

### Step 3: Add Your First Zone

#### Option A: Add a Trigger Zone (High-Risk Location)
1. **Tap anywhere on the map** where you want to create a zone
2. A modal will appear
3. Fill in the details:
   - **Name**: "Local Bar" (or any trigger location)
   - **Type**: Select **Trigger Zone** (red)
   - **Radius**: "150" (meters)
   - **Notify on Enter**: ✅ ON
   - **Notify on Exit**: ✅ ON
4. Tap **Add Zone**

#### Option B: Add a Safe Zone (Smoke-Free Location)
1. **Tap on the map** at a safe location
2. Fill in the details:
   - **Name**: "Gym" (or any safe location)
   - **Type**: Select **Safe Zone** (green)
   - **Radius**: "100" (meters)
   - **Notify on Enter**: ✅ ON
   - **Notify on Exit**: ✅ ON
4. Tap **Add Zone**

### Step 4: Test the Geofencing

#### Testing on Real Device (Recommended)
1. Add a zone at your **current location** with a small radius (100m)
2. Walk away from the location (beyond the radius)
3. You should receive an **exit notification** 📱
4. Walk back into the zone
5. You should receive an **enter notification** 📱

#### Testing on Simulator/Emulator
**iOS Simulator:**
1. Debug → Location → Custom Location
2. Enter coordinates inside/outside your zone
3. Notifications may be delayed or not work

**Android Emulator:**
1. Use the location controls (⋮ menu)
2. Set location inside/outside your zone
3. Background geofencing may not work perfectly

## 📱 Expected Notifications

### Trigger Zone (Red)
- **Entering**: "⚠️ Trigger Zone Alert - You're entering [zone name]. Stay strong! Remember your goals."
- **Exiting**: "✅ Left Trigger Zone - You've left [zone name]. Great job avoiding temptation!"

### Safe Zone (Green)
- **Entering**: "🛡️ Safe Zone - Welcome to [zone name] - a smoke-free zone. You've got this!"
- **Exiting**: "👋 Leaving Safe Zone - You're leaving [zone name]. Stay committed to your goals!"

## 🎯 Quick Tips

### For Best Results:
1. **Use a real device** - Simulators have limited geofencing support
2. **Set appropriate radius** - 100-200m works well for most locations
3. **Enable background location** - Required for notifications when app is closed
4. **Keep geofencing active** - Bell icon should be green/lit
5. **Test with current location** - Add a zone where you are now

### Map Controls:
- **Tap map** - Add new zone
- **Tap marker** - View zone details
- **Location button** (bottom right) - Center on current location
- **Bell icon** (top right) - Toggle geofencing on/off

### Managing Zones:
- **View all zones** - Scroll the list below the map
- **Delete zone** - Tap trash icon on zone card
- **Zone colors**:
  - 🔴 Red circle = Trigger zone
  - 🟢 Green circle = Safe zone

## 🔧 Troubleshooting

### "Permissions Required" Alert
- Go to device Settings → LastPuff → Location
- Select "Always" or "Allow all the time"
- Enable "Precise Location"

### No Notifications Appearing
1. Check notification permissions in device settings
2. Ensure geofencing is enabled (bell icon is green)
3. Verify zone has notifications enabled
4. Try force-closing and reopening the app

### Map Not Showing Current Location
1. Tap the location button (bottom right)
2. Check location services are enabled on device
3. Grant location permissions if prompted

### Zone Not Triggering
1. Increase the radius to 200-300m
2. Ensure you cross the zone boundary completely
3. Wait 1-2 minutes for GPS to update
4. Check that background location is enabled

## 📊 Monitoring Geofencing Status

### Status Indicators:
- **Green bar**: "Geofencing Active" - ✅ Working
- **Red bar**: "Geofencing Disabled" - ❌ Not working
- **Zone count**: Shows number of active zones

### Active Geofencing Checklist:
- ✅ Bell icon is green/lit
- ✅ Status bar shows "Geofencing Active"
- ✅ At least 1 zone in the list
- ✅ Location permissions granted (Always)
- ✅ Notification permissions granted

## 🎬 Demo Scenario

### Quick 5-Minute Test:
1. Open Geofencing tab
2. Grant all permissions
3. Add a trigger zone at your current location (100m radius)
4. Enable both enter/exit notifications
5. Walk 150m away (outside the zone)
6. Wait for exit notification 📱
7. Walk back to starting point
8. Wait for enter notification 📱

### Expected Timeline:
- Zone creation: Instant
- Walking outside zone: 2-3 minutes
- Exit notification: Within 1 minute of exiting
- Walking back: 2-3 minutes  
- Enter notification: Within 1 minute of entering

## 🌟 Use Cases

### Real-World Examples:

**Trigger Zones** (Places to avoid):
- Bars and pubs
- Smoking areas
- Friend's houses where you used to smoke
- Convenience stores
- Stressful locations

**Safe Zones** (Supportive places):
- Your home
- Gym or fitness center
- Workplace
- Parks and recreation areas
- Support group meeting locations

## 📝 Next Steps

After testing:
1. Add 3-5 real trigger zones in your area
2. Add 2-3 safe zones you frequent
3. Keep geofencing enabled 24/7
4. Monitor your zone interactions
5. Adjust radii based on your experience

## 🆘 Need Help?

If geofencing isn't working:
1. Check the troubleshooting section above
2. Review the full documentation in `GEOFENCING_README.md`
3. Ensure you're testing on a real device (not simulator)
4. Verify all permissions are granted
5. Try restarting the app

---

**Remember**: Geofencing is a powerful tool to support your quit journey. Use it to stay aware of your environment and make conscious choices! 💪
