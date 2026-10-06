const icon = document.getElementById("themeIcon");

icon.addEventListener("click", () => {
    icon.classList.toggle("fa-moon");
    icon.classList.toggle("fa-sun");

    document.body.classList.toggle("light-mode");
});

const input = document.getElementById("youtubeUrl");
const button = document.getElementById("calculateBtn");
const result = document.getElementById("result");

const API_KEY = "AIzaSyAJDbga6Zua_Ne010-paEqKi4r-F7sTT8Y";

button.addEventListener("click", async () => {
    const urls = input.value.split("\n");
    let totalSeconds = 0;
    console.log(urls);

    for (const url of urls) {
        if(url.trim() === "") {
            continue;
        }
        const videoUrl = new URL(url);

        let videoId;
        let playlistId;

        if (videoUrl.pathname === "/playlist") {
            playlistId = videoUrl.searchParams.get("list");
            console.log("Playlist ID:", playlistId);
            const playlistApiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`;

            console.log(playlistApiUrl);

            const repsonse = await fetch(playlistApiUrl);
            const playlistdata = await repsonse.json();
            console.log(playlistdata);  

            const videoIds = playlistdata.items.map(item => item.contentDetails.videoId);

            const videoIdString = videoIds.join(",");
            console.log(videoIdString);

            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoIdString}&key=${API_KEY}`;
            console.log(apiUrl);

            const response = await fetch(apiUrl);
            const videodata = await response.json();        
            console.log(videodata);
            
            for (const item of videodata.items) {
                const duration = item.contentDetails.duration;

                const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

                const hours = Number(match[1] || 0);
                const minutes = Number(match[2] || 0);
                const seconds = Number(match[3] || 0);

                totalSeconds += hours * 3600 + minutes * 60 + seconds;
            }
        
        } 
        else {
            if (videoUrl.hostname === "youtu.be") {
            videoId = videoUrl.pathname.slice(1);
            console.log("Video ID:", videoId);
                
            } else if (videoUrl.pathname.startsWith("/shorts/")) {
                videoId = videoUrl.pathname.split("/")[2];
                console.log("Video ID:", videoId);
            
            } else {
                videoId = videoUrl.searchParams.get("v");
                console.log("Video ID:", videoId);
            }
            const apiUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${API_KEY}`;
            console.log(apiUrl);

            const response = await fetch(apiUrl);
            console.log(response.ok);
            console.log(response.status);

            const data = await response.json();

            console.log(data);
            const duration = data.items[0].contentDetails.duration;
            console.log(duration);
            const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
            console.log(match);

            const hours = Number(match[1] || 0);
            const minutes = Number(match[2] || 0);
            const seconds = Number(match[3] || 0);        

            totalSeconds += hours * 3600 + minutes * 60 + seconds;
            console.log(totalSeconds);
        };
    };    
        const totalHours = Math.floor(totalSeconds / 3600);
        const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
        const totalRemainingSeconds = totalSeconds % 60;

        console.log(totalHours);
        console.log(totalMinutes);
        console.log(totalRemainingSeconds);
        result.textContent = `Total Duration: ${totalHours}h ${totalMinutes}m ${totalRemainingSeconds}s`;

});

