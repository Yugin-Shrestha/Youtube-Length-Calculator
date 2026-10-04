const icon = document.getElementById("themeIcon");

icon.addEventListener("click", () => {
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");

    document.body.classList.toggle("light-mode");
});

const input = document.getElementById("youtubeUrl");
const button = document.getElementById("calculateBtn");

const API_KEY = "AIzaSyAJDbga6Zua_Ne010-paEqKi4r-F7sTT8Y";

button.addEventListener("click", async () => {
    const urls = input.value.split("\n");
    console.log(urls);

    for (const url of urls) {
        const videoUrl = new URL(url);
        const videoId = videoUrl.searchParams.get("v");

        const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
        console.log(apiUrl);

        const response = await fetch(apiUrl);
        console.log(response.ok);
        console.log(response.status);

        const data = await response.json();

        console.log(data);
        console.log(data.items[0])
        
    };    
});
