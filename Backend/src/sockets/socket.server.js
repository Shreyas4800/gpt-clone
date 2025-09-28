const { Server } = require("socket.io");
const cookie = require("cookie");
const userModel = require("../models/user.model");
const aiservice = require("../services/aiservice");


function initSocketServer(httpServer) {

    const io = new Server(httpServer, {});
    //     cors: {
    //         origin: "http://localhost:5173",
    //         allowedHeaders: [ "Content-Type", "Authorization" ],
    //         credentials: true
    //     }
    // })

    io.use(async (socket, next) => {

        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");

        if (!cookies.token) {
            next(new Error("Authentication error: No token provided"));
        }

        try {

            const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);

            const user = await userModel.findById(decoded.id);

            socket.user = user

            next()

        } catch (err) {
            next(new Error("Authentication error: Invalid token"));
        }

    })

    io.on("connection", (socket) => {
      
    })
}


module.exports = initSocketServer;  