const url = "https://api.github.com/users/";

const lightModeBtn = document.querySelector(".btn-light");
const darkModeBtn = document.querySelector(".btn-drk");
const profileContainer = document.querySelector(".profile-Container");
const searchBtn = document.querySelector(".search-btn");

// Mode switching
function setCurrentMode(newModeBtn) {
    lightModeBtn.classList.remove("active");
    darkModeBtn.classList.remove("active");
    newModeBtn.classList.add("active");

    if (newModeBtn.classList.contains("btn-drk")) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

lightModeBtn.addEventListener("click", () => setCurrentMode(lightModeBtn));
darkModeBtn.addEventListener("click", () => setCurrentMode(darkModeBtn));

// Hide profile block initially
profileContainer.classList.add("remove");

// Search functionality
searchBtn.addEventListener("click", fetchGitHubUser);

async function fetchGitHubUser() {
    const input = document.querySelector(".search-input");
    const username = input.value.trim();
    if (!username) return;

    try {
        const response = await fetch(`${url}${username}`);
        const data = await response.json();
        if (data && !data.message) {
            profileContainer.classList.remove("remove");
            renderUI(data);
        } else {
            profileContainer.classList.add("remove");
            alert("User not found!");
        }
    } catch (error) {
        profileContainer.classList.add("remove");
        alert("Error fetching GitHub user.");
    }
}

function renderUI(data) {
    document.querySelector("#avatar").src = data.avatar_url || "";
    document.querySelector(".profile-name").textContent = data.name || "No Name";
    const usernameElem = document.querySelector(".profile-username");
    usernameElem.textContent = data.login || "";
    usernameElem.href = data.html_url || "#";
    document.querySelector(".profile-join-date").textContent = data.created_at
        ? `Joined: ${new Date(data.created_at).toLocaleDateString()}`
        : "";
    document.querySelector(".profile-bio").textContent = data.bio || "No bio available.";
    document.querySelector(".repos").textContent = data.public_repos ?? "0";
    document.querySelector(".followers").textContent = data.followers ?? "0";
    document.querySelector(".following").textContent = data.following ?? "0";
    document.querySelector(".location").textContent = data.location
        ? `Location: ${data.location}` : "Location: Not available";
    document.querySelector(".email").textContent = data.email
        ? `Email: ${data.email}` : "Email: Not available";
    document.querySelector(".twitter_username").textContent = data.twitter_username
        ? `Twitter: @${data.twitter_username}` : "Twitter: Not available";
    document.querySelector(".company").textContent = data.company
        ? `Company: ${data.company}` : "Company: Not available";
};