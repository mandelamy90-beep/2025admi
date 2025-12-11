async function loadUser() {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get("userid");

            if (!userId) {
                document.getElementById("user-container").innerHTML =
                    "<p style='color:white'>No userId provided.</p>";
                return;
            }

            try {
                // Fetch username
                const userInfo = await fetch(`https://users.roblox.com/v1/users/${userId}`).then(r => r.json());

                // Fetch headshot
                const headshotData = await fetch(
                    `https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=${userId}&size=150x150&format=Png&isCircular=false`
                ).then(r => r.json());

                const headshotUrl = headshotData?.data?.[0]?.imageUrl || "";

                // Build UI
                document.getElementById("user-container").innerHTML = `
                    <img class="headshot" src="${headshotUrl}" alt="Avatar">
                    <a class="profile-username" href="https://www.roblox.com/users/${userId}/profile">${userInfo.name}</a>
                    <span style="color:gray;">(${userId})</span>
                `;
            } catch (err) {
                document.getElementById("user-container").innerHTML =
                    "<p style='color:white'>Failed to load user.</p>";
            }
        }

        loadUser();
