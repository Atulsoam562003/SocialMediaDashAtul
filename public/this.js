slider.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  if (document.body.classList.contains("light-mode")) {
    slider.parentElement.classList.add("active");
    modeText.innerText = "Light Mode";
  } else {
    slider.parentElement.classList.remove("active");
    modeText.innerText = "Dark Mode";
  }
});

let subscriber;
let like;
let view;
let videoCount;
let loader;
// const loader = document.querySelector(".loader-box");

// setTimeout(getVideos, 3000);
getVideos();
function getVideos() {
  fetch(
    "https://youtube.googleapis.com/youtube/v3/channels?part=statistics&id=UCsvqVGtbbyHaMoevxPAq9Fg&key=AIzaSyAff7EuMQIfy_Hutm6RAO4HGER4z-liR2U"
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      loader.style.display = "none";
      if (data.items.length > 0) {
        const subscribers = data.items[0].statistics.subscriberCount;
        const views = data.items[0].statistics.viewCount;
        const videoCounts = data.items[0].statistics.videoCount;
        videoCount = videoCounts;
        view = views;
        subscriber = subscribers;
      } else {
        throw new Error("Channel not found or statistics unavailable");
      }
    })
    .catch((err) => {
      loader.style.display = "none";
      console.log(err);
      subscriber.innerHTML = `<h3>Sorry something went wrong , try again later</h3>`;
    });
}

document.addEventListener("DOMContentLoaded", function () {
  // Generate random follower counts
  var facebookFollowers = Math.floor(Math.random() * 100000);
  var twitterFollowers = Math.floor(Math.random() * 100000);
  var instagramFollowers = Math.floor(Math.random() * 100000);
  var youtubeSubscribers = Math.floor(Math.random() * 100000);

  // console.log(
  //   facebookFollowers,
  //   twitterFollowers,
  //   instagramFollowers,
  //   youtubeSubscribers
  // );

  // Calculate the total follower count
  var totalFollowers =
    facebookFollowers +
    twitterFollowers +
    instagramFollowers +
    youtubeSubscribers;

  // Update the content of the <p> element with the total follower count
  document.getElementById("total-followers").textContent =
    "Total Followers: " + totalFollowers.toLocaleString();
});

// Replace these values with your actual credentials
const username = "Chiranton_Baruah";
const password = "t9ra_RNGikrQ-.v";
const clientId = "lLfvwo00g9XNpLrIK0DQIQ";
const clientSecret = "y4IH1Vgc6-_h5L94o_Xjg4MMvX_eyA";

// Function to get the access token
function getAccessToken() {
  const tokenUrl = "https://www.reddit.com/api/v1/access_token";
  const credentials = btoa(`${clientId}:${clientSecret}`);
  const headers = new Headers({
    Authorization: `Basic ${credentials}`,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  const body = `grant_type=password&username=${encodeURIComponent(
    username
  )}&password=${encodeURIComponent(password)}`;

  return fetch(tokenUrl, {
    method: "POST",
    headers: headers,
    body: body,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.access_token) {
        return data.access_token;
      } else {
        throw new Error("Failed to retrieve access token");
      }
    });
}

// Function to make an authorized request to the Reddit API
function makeAuthorizedRequest(accessToken) {
  const apiUrl = "https://oauth.reddit.com/api/v1/me";
  const headers = new Headers({
    Authorization: `bearer ${accessToken}`,
    "User-Agent": "ChangeMeClient/0.1 by YourUsername",
  });

  return fetch(apiUrl, {
    method: "GET",
    headers: headers,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const likes = data.subreddit.subscribers;
      like.innerHTML = `${likes}`;
    });
}

// Example usage
getAccessToken().then((accessToken) => {
  makeAuthorizedRequest(accessToken);
});
