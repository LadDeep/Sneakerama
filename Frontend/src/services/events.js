import { backendURL } from "../constants";

export const getEvents = async () => {
    try {
        const response = await fetch(`${backendURL}/events`, {
            method: 'GET'
        });
        
        const data = await response.json();
        
        return {
            events: data.eventslist
        };
    } catch (error) {
        console.log(error);
        return {
            events: []
        };
    }
}

export const getEventById = async (id) => {
    try {
        const response = await fetch(`${backendURL}/event/${id}`, {
            method: 'GET'
        });

        const data = await response.json();

        // Assuming the specific event data is directly returned by the API
        return {
            event: data.event
        };
    } catch (error) {
        console.log(error);
        return {
            event: null
        };
    }
}

export const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return `${months[dateObject.getMonth()]} ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
};

export const convertTo12Hour = (timeString) => {
    const [hour, minute] = timeString.split(':').map(Number);

    let period = "AM";
    let newHour = hour;

    if (hour > 12) {
        newHour = hour - 12;
        period = "PM";
    } else if (hour === 0) {
        newHour = 12;
    } else if (hour === 12) {
        period = "PM";
    }

    return `${String(newHour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${period}`;
};

export const registerForEvent = async (eventDetails) => {
    try {
        const response = await fetch(`${backendURL}/registerevent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                eventID: eventDetails.eventId,
                eventName: eventDetails.eventName,
                name: eventDetails.name,
                age: eventDetails.age,
                phone: eventDetails.phone,
                email: eventDetails.email
            })
        });

        const data = await response.json();

        return {
            success: data.success,
            message: data.message
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error registering for the event.'
        };
    }
}

export const postNewEvent = async (eventDetails) => {
    try {
        const response = await fetch(`${backendURL}/event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                eventName: eventDetails.eventName,
                eventImage: eventDetails.eventImage,
                eventDate: eventDetails.eventDate,
                eventTime: eventDetails.eventTime,
                eventLocation: eventDetails.eventLocation,
                eventDescription: eventDetails.eventDescription
            })
        });

        const result = await response.json();

        return {
            success: result.success,
            message: result.message
        };
    } catch (error) {
        return {
            success: false,
            message: 'Error posting the event.'
        };
    }
}
