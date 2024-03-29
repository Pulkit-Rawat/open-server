const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
config();
const cors = require("cors");

const app = express();
const userRouter = require("./router/users");
const chatRouter = require("./router/chats");
const mediaRouter = require("./router/media");
const checkoutRouter = require("./router/checkout");

const Chat = require("./models/Chats");

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

//routes
app.use(userRouter);
app.use(chatRouter);
app.use(mediaRouter);
app.use(checkoutRouter);

const socketIO = require("socket.io");
const { getPromptRes } = require("./utilities/openai");

const server = app.listen(process.env.PORT || 4000, () =>
  console.log(`Server started listening on PORT ${process.env.PORT}`)
);

app.get("/", (req, res) => res.send("cbot-server"));

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", async (uID) => {
    try {
      let createData;
      let result = await Chat.findOne({ _id: uID });
      if (!result) {
        createData = await Chat.create({ _id: uID, messages: [] });
      }
      socket.join(uID);
      socket.activeRoom = uID;

      if (createData) {
        let aiRes = await getPromptRes("introduce");
        let obj = {
          createdAt: new Date(),
          A: aiRes,
        };
        await Chat.updateOne(
          { _id: socket.activeRoom },
          {
            $push: {
              messages: obj,
            },
          }
        );
        //send response to user
        socket.emit("message", obj);
      }
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("message", async (message) => {
    let obj = {
      createdAt: new Date(),
      Q: message,
    };
    //insert user message to db
    await Chat.updateOne(
      { _id: socket.activeRoom },
      {
        $push: {
          messages: obj,
        },
      }
    );

    //query message to open ai
    let aiRes = await getPromptRes(message);

    //insert open-ai's response to db
    obj = {
      createdAt: new Date(),
      A: aiRes || "(openai quota expired)",
    };
    if (aiRes) {
      await Chat.updateOne(
        { _id: socket.activeRoom },
        {
          $push: {
            messages: obj,
          },
        }
      );
    }

    //send response to user
    socket.emit("message", obj);

    // io.to(socket.activeRoom).emit("message", message);
  });
});

const main = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewURLParser: true,
      useUnifiedTopology: true,
    });
  } catch (err) {
    console.log(err);
  }
};

main();
