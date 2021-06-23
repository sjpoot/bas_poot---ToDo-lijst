const apiUrl = "http://localhost:3000/";

async function fetchResult() {
    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
        return await res.json();
    } catch (error) {
        return ("Nothing to return");
    }
}

function postItem(data) {
    fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
}

function putItem(idNum, data) {
    fetch(apiUrl + idNum, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
}

function removeItem(idNum) {
    fetch(idNum, {
        method: "DELETE",
    });
}