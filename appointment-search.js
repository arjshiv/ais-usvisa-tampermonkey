// ==UserScript==
// @name         AIS Mexico expedite appointment
// @namespace    http://tampermonkey.net/
// @version      2024-01-06
// @description  try to take over the world!
// @author       You
// @match        https://ais.usvisa-info.com/en-mx/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=usvisa-info.com
// @grant        none
// @run-at document-start
// ==/UserScript==

// @run-at document-start
function modifyRequest() {
  // logic to modify the request
  // This could be tricky since you need to catch and modify the request
    let originalAjax = window.$.ajax;

// Override the jQuery AJAX function
window.$.ajax = function() {
    // Modify the URL or data here if the request matches certain criteria
    if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].url.endsWith('70.json')) {
        // Add the 'date' parameter
        //arguments[0].url = arguments[0].url + '&date=2024-01-21';
    }
    if (arguments[0] && typeof arguments[0] === 'object' && arguments[0].url.includes('appointments')) {
        arguments[0].url = arguments[0].url.replace('appointments[expedite]=false', 'appointments[expedite]=true');
        //arguments[0].url = arguments[0].url.replace(/(consulate_date=)(\d{4}-\d{2}-\d{2})?/, '$12024-01-21');
                //arguments[0].url = arguments[0].url.replace(/(date=)(\d{4}-\d{2}-\d{2})?/, '$12024-01-21');
        //arguments[0].url = arguments[0].url.replace(/(consulate_date=)(?!\d{4}-\d{2}-\d{2})/, '$12024-01-19');

    }
    // Call the original AJAX function with modified arguments
    return originalAjax.apply(this, arguments);
};
}

const interval = setInterval(() => {
  if (document.readyState === 'loading') {
    modifyRequest();
  } else {
    clearInterval(interval);
  }
}, 10); // Run every 10ms


(function() {
    'use strict';

    let shouldContinue = true; // Global flag to control the loop

    // Function to create a resume button
    function createResumeButton() {
        const button = document.createElement('button');
        button.textContent = 'Resume Checking Appointments';
        button.style.position = 'fixed';
        button.style.bottom = '20px';
        button.style.right = '20px';
        button.style.zIndex = '1000';
        button.onclick = function() {
            shouldContinue = true;
            button.style.display = 'none'; // Hide button after clicking
            checkAppointmentsForAllConsulates();
        };
        document.body.appendChild(button);
    }

    async function checkAppointmentsForAllConsulates() {
        const consulateDropdown = document.getElementById('appointments_consulate_appointment_facility_id');
        const options = consulateDropdown.options;

        for (let i = 1; i < options.length; i++) {
            if (!shouldContinue) {
                createResumeButton(); // Create the resume button when paused
                return; // Exit the function if shouldContinue is false
            }

            console.log('Checking appointments for: ' + options[i].text); // Log each consulate
            consulateDropdown.value = options[i].value;
            consulateDropdown.dispatchEvent(new Event('change'));

            await new Promise(resolve => setTimeout(resolve, Math.round(Math.random() * (7000 - 2000) + 2000)));

            const noAppointmentsMsg = document.getElementById('consulate_date_time_not_available');
            if (noAppointmentsMsg.style.display === 'none') {
                shouldContinue = false; // Pause the script
                alert('Appointments available at ' + options[i].text + '. Check and then click the "Resume Checking Appointments" button to continue.');
            } else {
                console.info('No appointments at: ' + options[i].text);

            }
        }
    }

    // Repeat the checking process every 5 minutes
    setInterval(() => {
        if (shouldContinue) {
            checkAppointmentsForAllConsulates();
        }
    }, 300000); // 300000 milliseconds = 5 minutes

    // Run the function immediately when the page loads
    window.addEventListener('load', function() {
        //checkAppointmentsForAllConsulates();
    });
})();
