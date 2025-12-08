import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

// Task name for background geofencing
const GEOFENCING_TASK = 'GEOFENCING_TASK';

// Storage keys
const GEOFENCE_ZONES_KEY = '@geofence_zones';

export interface GeofenceZone {
    id: string;
    latitude: number;
    longitude: number;
    radius: number; // in meters
    name: string;
    type: 'trigger' | 'safe'; // trigger = high-risk, safe = smoke-free
    notifyOnEnter: boolean;
    notifyOnExit: boolean;
}

// Configure notification handler
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

// Define the geofencing task
TaskManager.defineTask(GEOFENCING_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Geofencing task error:', error);
        return;
    }

    if (data) {
        const { eventType, region } = data as any;
        const zones = await getGeofenceZones();
        const zone = zones.find(z => z.id === region.identifier);

        if (!zone) return;

        // Send notification based on event type
        if (eventType === Location.GeofencingEventType.Enter && zone.notifyOnEnter) {
            await sendGeofenceNotification(zone, 'enter');
        } else if (eventType === Location.GeofencingEventType.Exit && zone.notifyOnExit) {
            await sendGeofenceNotification(zone, 'exit');
        }
    }
});

/**
 * Request location and notification permissions
 */
export async function requestPermissions(): Promise<boolean> {
    try {
        // Request location permissions
        const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
        if (foregroundStatus !== 'granted') {
            console.log('Foreground location permission denied');
            return false;
        }

        const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
        if (backgroundStatus !== 'granted') {
            console.log('Background location permission denied');
            return false;
        }

        // Request notification permissions
        const { status: notificationStatus } = await Notifications.requestPermissionsAsync();
        if (notificationStatus !== 'granted') {
            console.log('Notification permission denied');
            return false;
        }

        return true;
    } catch (error) {
        console.error('Error requesting permissions:', error);
        return false;
    }
}

/**
 * Get all saved geofence zones
 */
export async function getGeofenceZones(): Promise<GeofenceZone[]> {
    try {
        const zonesJson = await AsyncStorage.getItem(GEOFENCE_ZONES_KEY);
        return zonesJson ? JSON.parse(zonesJson) : [];
    } catch (error) {
        console.error('Error getting geofence zones:', error);
        return [];
    }
}

/**
 * Save geofence zones
 */
export async function saveGeofenceZones(zones: GeofenceZone[]): Promise<void> {
    try {
        await AsyncStorage.setItem(GEOFENCE_ZONES_KEY, JSON.stringify(zones));
    } catch (error) {
        console.error('Error saving geofence zones:', error);
    }
}

/**
 * Add a new geofence zone
 */
export async function addGeofenceZone(zone: GeofenceZone): Promise<void> {
    try {
        const zones = await getGeofenceZones();
        zones.push(zone);
        await saveGeofenceZones(zones);
        await startGeofencing(); // Restart geofencing with new zone
    } catch (error) {
        console.error('Error adding geofence zone:', error);
        throw error;
    }
}

/**
 * Remove a geofence zone
 */
export async function removeGeofenceZone(zoneId: string): Promise<void> {
    try {
        const zones = await getGeofenceZones();
        const filteredZones = zones.filter(z => z.id !== zoneId);
        await saveGeofenceZones(filteredZones);
        await startGeofencing(); // Restart geofencing without removed zone
    } catch (error) {
        console.error('Error removing geofence zone:', error);
        throw error;
    }
}

/**
 * Start geofencing monitoring
 */
export async function startGeofencing(): Promise<void> {
    try {
        // Check if task is registered and stop it first
        const isRegistered = await TaskManager.isTaskRegisteredAsync(GEOFENCING_TASK);
        if (isRegistered) {
            console.log('Stopping existing geofencing task...');
            try {
                await Location.stopGeofencingAsync(GEOFENCING_TASK);
            } catch (stopError) {
                console.log('Note: Could not stop previous geofencing (may not have been active)');
            }
        }

        const zones = await getGeofenceZones();
        if (zones.length === 0) {
            console.log('No geofence zones to monitor');
            return;
        }

        // Convert zones to geofencing regions
        const regions = zones.map(zone => ({
            identifier: zone.id,
            latitude: zone.latitude,
            longitude: zone.longitude,
            radius: zone.radius,
            notifyOnEnter: zone.notifyOnEnter,
            notifyOnExit: zone.notifyOnExit,
        }));

        console.log('Starting geofencing with regions:', regions.map(r => ({ id: r.identifier, lat: r.latitude, lng: r.longitude, radius: r.radius })));

        // Start geofencing
        await Location.startGeofencingAsync(GEOFENCING_TASK, regions);
        console.log('Geofencing started successfully for', regions.length, 'zones');
    } catch (error) {
        console.error('Error starting geofencing:', error);
        throw error;
    }
}

/**
 * Stop geofencing monitoring
 */
export async function stopGeofencing(): Promise<void> {
    try {
        const isTaskDefined = await TaskManager.isTaskDefined(GEOFENCING_TASK);
        if (isTaskDefined) {
            await Location.stopGeofencingAsync(GEOFENCING_TASK);
            console.log('Geofencing stopped');
        }
    } catch (error) {
        console.error('Error stopping geofencing:', error);
    }
}

/**
 * Send a geofence notification
 */
async function sendGeofenceNotification(zone: GeofenceZone, eventType: 'enter' | 'exit'): Promise<void> {
    try {
        let title = '';
        let body = '';

        if (zone.type === 'trigger') {
            if (eventType === 'enter') {
                title = 'Trigger Zone Alert';
                body = `You're entering "${zone.name}". Stay strong! Remember your goals.`;
            } else {
                title = 'Left Trigger Zone';
                body = `You've left "${zone.name}". Great job avoiding temptation!`;
            }
        } else {
            // safe zone
            if (eventType === 'enter') {
                title = 'Safe Zone';
                body = `Welcome to "${zone.name}" - a smoke-free zone. You've got this!`;
            } else {
                title = 'Leaving Safe Zone';
                body = `You're leaving "${zone.name}". Stay committed to your goals!`;
            }
        }

        await Notifications.scheduleNotificationAsync({
            content: {
                title,
                body,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Send immediately
        });
    } catch (error) {
        console.error('Error sending notification:', error);
    }
}

/**
 * Get current location
 */
export async function getCurrentLocation(): Promise<Location.LocationObject | null> {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return null;
        }

        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        return location;
    } catch (error) {
        console.error('Error getting current location:', error);
        return null;
    }
}

/**
 * Check if geofencing is active
 */
export async function isGeofencingActive(): Promise<boolean> {
    try {
        const isTaskDefined = await TaskManager.isTaskDefined(GEOFENCING_TASK);
        if (!isTaskDefined) return false;

        const isRegistered = await TaskManager.isTaskRegisteredAsync(GEOFENCING_TASK);
        return isRegistered;
    } catch (error) {
        console.error('Error checking geofencing status:', error);
        return false;
    }
}

// ============== IDLE DETECTION FEATURE ==============

// Task name for idle detection
const IDLE_DETECTION_TASK = 'IDLE_DETECTION_TASK';

// Storage keys for idle detection
const IDLE_DETECTION_ENABLED_KEY = '@idle_detection_enabled';
const LAST_LOCATION_KEY = '@last_location';
const LAST_LOCATION_TIME_KEY = '@last_location_time';

// Idle threshold in milliseconds (30 seconds for testing)
const IDLE_THRESHOLD_MS = 30 * 1000;

// Daytime hours (6 AM to 10 PM)
const DAYTIME_START_HOUR = 6;
const DAYTIME_END_HOUR = 22;

// Distance threshold in meters to consider as "same location"
const SAME_LOCATION_THRESHOLD_METERS = 50;

/**
 * Check if current time is within daytime hours
 */
function isDaytime(): boolean {
    const now = new Date();
    const hours = now.getHours();
    return hours >= DAYTIME_START_HOUR && hours < DAYTIME_END_HOUR;
}

/**
 * Calculate distance between two coordinates in meters
 */
function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

// Define the idle detection background task
TaskManager.defineTask(IDLE_DETECTION_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Idle detection task error:', error);
        return;
    }

    // Only run during daytime
    if (!isDaytime()) {
        console.log('Idle detection skipped - not daytime');
        return;
    }

    if (data) {
        const { locations } = data as { locations: Location.LocationObject[] };
        if (!locations || locations.length === 0) return;

        const currentLocation = locations[0];
        const currentTime = Date.now();

        try {
            // Get previous location data
            const lastLocationStr = await AsyncStorage.getItem(LAST_LOCATION_KEY);
            const lastTimeStr = await AsyncStorage.getItem(LAST_LOCATION_TIME_KEY);

            if (lastLocationStr && lastTimeStr) {
                const lastLocation = JSON.parse(lastLocationStr);
                const lastTime = parseInt(lastTimeStr, 10);

                // Calculate distance from last location
                const distance = calculateDistance(
                    lastLocation.latitude,
                    lastLocation.longitude,
                    currentLocation.coords.latitude,
                    currentLocation.coords.longitude
                );

                // Check if user is still at same location
                if (distance < SAME_LOCATION_THRESHOLD_METERS) {
                    const idleTime = currentTime - lastTime;

                    // If idle for more than threshold, send notification
                    if (idleTime >= IDLE_THRESHOLD_MS) {
                        await sendIdleNotification(idleTime);
                        // Reset the timer after notification
                        await AsyncStorage.setItem(LAST_LOCATION_TIME_KEY, currentTime.toString());
                    }
                } else {
                    // User moved - update location and reset timer
                    await AsyncStorage.setItem(
                        LAST_LOCATION_KEY,
                        JSON.stringify({
                            latitude: currentLocation.coords.latitude,
                            longitude: currentLocation.coords.longitude,
                        })
                    );
                    await AsyncStorage.setItem(LAST_LOCATION_TIME_KEY, currentTime.toString());
                }
            } else {
                // First location - save it
                await AsyncStorage.setItem(
                    LAST_LOCATION_KEY,
                    JSON.stringify({
                        latitude: currentLocation.coords.latitude,
                        longitude: currentLocation.coords.longitude,
                    })
                );
                await AsyncStorage.setItem(LAST_LOCATION_TIME_KEY, currentTime.toString());
            }
        } catch (err) {
            console.error('Error in idle detection:', err);
        }
    }
});

/**
 * Send idle notification
 */
async function sendIdleNotification(idleTimeMs: number): Promise<void> {
    try {
        const minutes = Math.floor(idleTimeMs / 60000);

        await Notifications.scheduleNotificationAsync({
            content: {
                title: '⏰ Time to Move!',
                body: `You've been stationary for ${minutes}+ minutes. Get up and stretch, take a short walk, or do some quick exercises! 🏃‍♂️`,
                sound: true,
                priority: Notifications.AndroidNotificationPriority.HIGH,
            },
            trigger: null, // Send immediately
        });

        console.log('Idle notification sent');
    } catch (error) {
        console.error('Error sending idle notification:', error);
    }
}

/**
 * Start idle detection monitoring
 */
export async function startIdleDetection(): Promise<void> {
    try {
        // Check if already running
        const isRegistered = await TaskManager.isTaskRegisteredAsync(IDLE_DETECTION_TASK);
        if (isRegistered) {
            console.log('Idle detection already running');
            return;
        }

        // Request permissions
        const hasPermissions = await requestPermissions();
        if (!hasPermissions) {
            console.log('Missing permissions for idle detection');
            return;
        }

        // Get initial location
        const currentLocation = await getCurrentLocation();
        if (currentLocation) {
            await AsyncStorage.setItem(
                LAST_LOCATION_KEY,
                JSON.stringify({
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                })
            );
            await AsyncStorage.setItem(LAST_LOCATION_TIME_KEY, Date.now().toString());
        }

        // Start background location tracking
        await Location.startLocationUpdatesAsync(IDLE_DETECTION_TASK, {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 30000, // Check every 30 seconds
            distanceInterval: 10, // Or when moved 10 meters
            foregroundService: {
                notificationTitle: 'Activity Monitor',
                notificationBody: 'Monitoring your activity to keep you moving',
                notificationColor: '#39FF14',
            },
            pausesUpdatesAutomatically: false,
            activityType: Location.ActivityType.Other,
        });

        await AsyncStorage.setItem(IDLE_DETECTION_ENABLED_KEY, 'true');
        console.log('Idle detection started');
    } catch (error) {
        console.error('Error starting idle detection:', error);
        throw error;
    }
}

/**
 * Stop idle detection monitoring
 */
export async function stopIdleDetection(): Promise<void> {
    try {
        const isRegistered = await TaskManager.isTaskRegisteredAsync(IDLE_DETECTION_TASK);
        if (isRegistered) {
            await Location.stopLocationUpdatesAsync(IDLE_DETECTION_TASK);
        }

        await AsyncStorage.setItem(IDLE_DETECTION_ENABLED_KEY, 'false');
        await AsyncStorage.removeItem(LAST_LOCATION_KEY);
        await AsyncStorage.removeItem(LAST_LOCATION_TIME_KEY);

        console.log('Idle detection stopped');
    } catch (error) {
        console.error('Error stopping idle detection:', error);
    }
}

/**
 * Check if idle detection is enabled
 */
export async function isIdleDetectionEnabled(): Promise<boolean> {
    try {
        const enabled = await AsyncStorage.getItem(IDLE_DETECTION_ENABLED_KEY);
        return enabled === 'true';
    } catch (error) {
        console.error('Error checking idle detection status:', error);
        return false;
    }
}

/**
 * Check if idle detection is currently active (task running)
 */
export async function isIdleDetectionActive(): Promise<boolean> {
    try {
        return await TaskManager.isTaskRegisteredAsync(IDLE_DETECTION_TASK);
    } catch (error) {
        console.error('Error checking idle detection active status:', error);
        return false;
    }
}
