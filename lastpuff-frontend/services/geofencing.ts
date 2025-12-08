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
