# AIS Mexico Expedite Appointment Script

## Description
This Tampermonkey script is designed to automate the process of checking for expedited appointment availability on the U.S. Visa Information Service for Mexico website (https://ais.usvisa-info.com/en-mx/).

## Features
- Automatically checks for appointments across all available consulates
- Modifies AJAX requests to include expedited appointment parameter
- Alerts user when an appointment is available
- Provides a "Resume Checking Appointments" button to continue the process after pausing

## Installation
1. Install the Tampermonkey browser extension
2. Create a new script in Tampermonkey
3. Copy and paste the provided script into the editor
4. Save the script

## Usage
1. Navigate to the AIS Mexico appointment scheduling page
2. The script will automatically start checking for appointments
3. If an appointment is found, an alert will appear
4. Use the "Resume Checking Appointments" button to continue checking after pausing

## Known Issues and Bugs

1. **Potential Rate Limiting**: The script checks appointments every 5 minutes, which may trigger rate limiting on the AIS website.

2. **Incomplete Date Modification**: There are commented-out lines attempting to modify appointment dates, which are currently not functional.

3. **Hard-coded Date Values**: Some date values (e.g., '2024-01-21') are hard-coded and may become outdated.

4. **Limited Error Handling**: The script lacks robust error handling for network issues or changes in the website's structure.

5. **Consulate Selection Reliability**: The script assumes the consulate dropdown is always present and doesn't handle cases where it might be missing.

6. **Browser Compatibility**: The script modifies jQuery's AJAX function, which may not work if the website changes its JavaScript framework.

7. **Incomplete AJAX Interception**: The script attempts to modify AJAX requests, but it may not catch all relevant requests, especially if the website uses other methods for data fetching.

8. **User Interface Interference**: The added "Resume" button might interfere with the website's layout or functionality.

9. **Lack of Configuration Options**: Users cannot easily customize the script's behavior, such as changing the check interval or target dates.

10. **No Persistence**: The script's state is not saved between page reloads, which could lead to lost progress.

## Disclaimer
This script is for educational purposes only. Use of automated scripts may violate the terms of service of the AIS website. Use at your own risk.

## Contributing
Feel free to fork this project and submit pull requests with improvements or bug fixes.
