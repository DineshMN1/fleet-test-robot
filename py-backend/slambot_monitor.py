import requests
import time
import logging

API_BASE = "https://fleetbots-production.up.railway.app/api"
ROVERS = [f"Rover-{i}" for i in range(1, 6)]
TASKS = ["Soil Analysis", "Irrigation", "Weeding", "Crop Monitoring"]
RETRY_LIMIT = 3  # Max number of retries
RETRY_DELAY = 2  # Delay between retries in seconds

# Set up logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

def start_session():
    try:
        res = requests.post(f"{API_BASE}/session/start", timeout=5)
        res.raise_for_status()
        return res.json().get("session_id")
    except Exception as e:
        logging.error(f"Starting session failed: {e}")
        return None

def get(endpoint, session_id, retries=0):
    try:
        res = requests.get(f"{endpoint}?session_id={session_id}", timeout=5)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        if retries < RETRY_LIMIT:
            logging.warning(f"GET request failed (attempt {retries+1}/{RETRY_LIMIT}): {e}. Retrying in {RETRY_DELAY}s...")
            time.sleep(RETRY_DELAY)
            return get(endpoint, session_id, retries + 1)  # Retry
        logging.error(f"GET request failed after {RETRY_LIMIT} attempts: {e}")
        return None

def monitor_rovers(session_id):
    rover_data = {}

    for rover in ROVERS:
        logging.info(f"--- {rover} ---")

        status = get(f"{API_BASE}/rover/{rover}/status", session_id)
        battery = get(f"{API_BASE}/rover/{rover}/battery", session_id)
        coords = get(f"{API_BASE}/rover/{rover}/coordinates", session_id)
        sensors = get(f"{API_BASE}/rover/{rover}/sensor-data", session_id)

        rover_data[rover] = {
            "status": status.get("status") if status else "Unknown",
            "battery": battery.get("battery") if battery else 0,
            "coordinates": coords.get("coordinates") if coords else [0, 0],
            "task": None,
            "soil_moisture": sensors.get("soil_moisture") if sensors else 0,
            "soil_pH": sensors.get("soil_pH") if sensors else 7.0,
            "temperature": sensors.get("temperature") if sensors else 25,
            "battery_level": battery.get("battery_level") if battery else 0,
        }

    return rover_data

def main():
    session_id = start_session()
    if not session_id:
        logging.fatal("Could not get session_id. Exiting.")
        return

    logging.info(f"Session started: {session_id}")

    try:
        while True:
            rover_data = monitor_rovers(session_id)
            logging.info(f"Rover data: {rover_data}")
            time.sleep(15)  # every 15 seconds

    except KeyboardInterrupt:
        logging.info("Monitoring stopped by user.")

if __name__ == "__main__":
    main()
