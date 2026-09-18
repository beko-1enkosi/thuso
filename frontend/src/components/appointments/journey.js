export function normaliseSaPhoneNumber(value) {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("0")) {
    digits = `27${digits.slice(1)}`;
  } else if (!digits.startsWith("27") && digits.length === 9) {
    digits = `27${digits}`;
  }

  return digits;
}

export function isValidSaMobileNumber(value) {
  return /^27[6-8]\d{8}$/.test(normaliseSaPhoneNumber(value));
}

export function createMapUrl(location) {
  if (!location) {
    return "";
  }

  return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`;
}

export function buildAlertMessage(interview, currentLocation) {
  const mapUrl = createMapUrl(currentLocation);

  const lines = [
    "THUSO SAFETY ALERT",
    "",
    "The job seeker has requested help during an interview journey.",
    `Company: ${interview.company || "Not provided"}`,
    `Interview location: ${interview.location || "Not provided"}`,
    `Interview date: ${interview.date || "Not provided"}`,
    `Interview time: ${interview.time || "Not provided"}`,
  ];

  if (mapUrl) {
    lines.push(`Last captured location: ${mapUrl}`);
  } else {
    lines.push("Last captured location: unavailable");
  }

  lines.push(
    "",
    "Please contact or check on them as soon as possible. If you believe they are in immediate danger, contact emergency services."
  );

  return lines.join("\n");
}

export function getBrowserLocation() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({
        location: null,
        error: "Location is unavailable in this browser. You can still continue your Safe Journey.",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: Math.round(position.coords.accuracy),
            capturedAt: new Date().toISOString(),
          },
          error: "",
        });
      },
      (error) => {
        let message = "Location was not shared. You can still continue your Safe Journey.";

        if (error.code === 1) {
          message = "Location was not shared. You can still continue your Safe Journey.";
        }

        resolve({ location: null, error: message });
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 30000,
      }
    );
  });
}

export const emptyInterview = {
  company: '', role: '', location: '', date: '', time: '',
  recruiterName: '', recruiterPhone: '', contactName: '', contactPhone: '', notes: '',
};

export const statusLabels = {
  'not-started': 'Not started', travelling: 'Journey active',
  arrived: 'Arrived', safe: 'Safe', alert: 'Needs attention',
};

export function validateInterview(interview) {
  const errors = {};
  const required = { company: 'company name', location: 'interview location', date: 'interview date',
    time: 'interview time', contactName: 'trusted contact’s name', contactPhone: 'trusted contact’s phone number' };
  for (const [field, label] of Object.entries(required)) {
    if (!interview[field]?.trim()) errors[field] = `Please add the ${label}.`;
  }
  if (interview.contactPhone?.trim() && !isValidSaMobileNumber(interview.contactPhone)) {
    errors.contactPhone = 'Use a South African mobile number, like 082 123 4567 or +27 82 123 4567.';
  }
  if (interview.date && !/^\d{4}-\d{2}-\d{2}$/.test(interview.date)) errors.date = 'Please choose a valid date.';
  if (interview.time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(interview.time)) errors.time = 'Please choose a valid time.';
  return errors;
}

export function formatDate(date) {
  if (!date) return 'Date not added';
  const value = new Date(`${date}T12:00:00`);
  return Number.isNaN(value.getTime()) ? date : value.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}
