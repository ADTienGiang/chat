const {
  Server
} = require("socket.io");
const db = require('../models');
const Message = db.Message;
const UserChatRoom = db.UserChatRoom;
const ChatRoom = db.ChatRoom;
const ChatHistory = db.ChatHistory;
const User = db.User;
const {
  Op
} = require('sequelize');
module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  io.on('connection', (socket) => {
    socket.on('chat message', async (msg) => {  
      try {
        // Tìm phòng chat giữa hai người dùng
        const chatRoomName = Math.min(msg.id_sender, msg.id_receiver) + '_' + Math.max(msg.id_sender, msg.id_receiver);
        const chatRoom = await ChatRoom.findOne({
          where: {
            name: chatRoomName
          }
        });

        // Nếu phòng chat không tồn tại, tạo phòng chat mới
        if (!chatRoom) {
          const newChatRoom = await ChatRoom.create({
            name: chatRoomName,
            description: msg.sender + ' ' + msg.receiver,
            member_count: 2
          });
          await UserChatRoom.bulkCreate([{
              UserId: msg.id_sender,
              ChatRoomId: newChatRoom.id
            },
            {
              UserId: msg.id_receiver,
              ChatRoomId: newChatRoom.id
            }
          ]);
        }

        // Tạo tin nhắn mới
        const newMessage = await Message.create({
          content: msg.content,
          sender: msg.sender,
          receiver: msg.receiver,
          id_sender: msg.id_sender,
          id_receiver: msg.id_receiver,
          sent_at: new Date()
        });

        // Tìm lại phòng chat giữa hai người dùng sau khi tạo hoặc tìm phòng chat
        const chatRoomUpdated = await ChatRoom.findOne({
          where: {
            name: chatRoomName
          }
        });

        // Lưu lịch sử chat
        const chatHistoryData = {
          UserId: msg.id_sender,
          chat_room_id: chatRoomUpdated.id,
          MessageId: newMessage.id
        };
        const chatHistory = await ChatHistory.create(chatHistoryData);
        console.log('ChatHistory created successfully');

        console.log('Message saved to the database');
        io.to(chatRoomName).emit('chat message', newMessage);
        console.log(newMessage.content);
      } catch (error) {
        console.error('Error saving message to the database:', error);
      }
    });
    socket.on('getChatHistory', async (data) => {
      try {
        const userId = data.userId;
        const idSender = data.idSender;
        const idReceiver = data.idReceiver;
    
        // Tiến hành tìm kiếm phòng chat giữa hai người dùng
        const chatRoomName = Math.min(idSender, idReceiver) + '_' + Math.max(idSender, idReceiver);
        let chatRoom = await ChatRoom.findOne({
          where: {
            name: chatRoomName
          }
        });
        if (!chatRoom) {
          console.log('Room not found');
          return;
        }
        // Lấy chat_room_id
        const roomId = chatRoom.id;
    
        // Tìm kiếm lịch sử chat trong phòng chat này
        const chatHistory = await ChatHistory.findAll({
          where: {
            chat_room_id: roomId
          },
          include: [
            {
              model: ChatRoom,
              attributes: ['id', 'name', 'description', 'member_count'],
            },
            {
              model: User,
              attributes: ['id', 'googleId', 'facebookId', 'provider', 'providerId', 'username', 'email', 'password', 'address', 'question', 'phone', 'url'],
            },
            {
              model: Message,
              attributes: ['id', 'content', 'sender', 'receiver', 'id_sender', 'id_receiver', 'sent_at'],
              where: {
                [Op.or]: [
                  {
                    id_sender: idSender,
                    id_receiver: idReceiver
                  },
                  {
                    id_sender: idReceiver,
                    id_receiver: idSender
                  }
                ]
              }
            }
          ]
        });
        socket.emit('chatHistory', chatHistory);
      } catch (error) {
        console.error('Error retrieving chat history:', error);
      }
    });
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};