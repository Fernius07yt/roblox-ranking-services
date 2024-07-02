const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

const ROBLOX_COOKIE = process.env.ROBLOX_COOKIE; // Set this in your environment variables
const GROUP_ID = process.env.GROUP_ID; // Set this in your environment variables
const RANK_ID = process.env.RANK_ID; // Set this in your environment variables

app.use(express.json());

app.post('/rankUser', async (req, res) => {
    const { userId } = req.body;

    try {
        const response = await axios.post(`https://groups.roblox.com/v1/groups/${GROUP_ID}/users/${userId}`, {
            roleId: RANK_ID
        }, {
            headers: {
                'Cookie': `.ROBLOSECURITY=${ROBLOX_COOKIE}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            res.status(200).send('User ranked successfully');
        } else {
            res.status(response.status).send('Failed to rank user');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
});
