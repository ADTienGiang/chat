<template>
  <div>
    <div class="css_ul_li_chat">
      <ul ref="messages">
        <li v-for="message in messages" :key="message.id">{{ message.text }}</li>
      </ul>
    </div>
    <form @submit.prevent="sendMessage" class="form_submit_chat">
      <input v-model="inputMessage" autocomplete="off" class="input_chat" />
      <button type="submit" class="button_Send_chat">Send</button>
    </form>
  </div>
</template>
<script>
import io from 'socket.io-client';
import '../assets/login/css/chat.css'
const socketUrl = import.meta.env.VITE_SOCKET_URL;
export default {
  data() {
    return {
      inputMessage: '',
      messages: [],
      socket: null,
    };
  },
  methods: {
    sendMessage() {
      if (this.inputMessage) {
        this.socket.emit('chat message', this.inputMessage);
        console.log(this.inputMessage);
        this.inputMessage = '';
      }
    },
    luuVaoLocalStorage() {
      // Lấy URL hiện tại
      const currentUrl = window.location.href;
      // Tách phần query string từ URL
      const queryString = currentUrl.split('#')[0].substring(currentUrl.indexOf('?'));
      // Tạo một đối tượng URLSearchParams từ query string
      const urlParams = new URLSearchParams(queryString);
      // Lấy giá trị của tham số token_gg từ URL params
      const token_gg = urlParams.get('token_gg');
      const token_fb = urlParams.get('token_fb');
      // Lấy giá trị của tham số user_inf_gg từ URL params
      const user_inf_gg = urlParams.get('user_inf_gg');

      let user_inf_fb = '';
      // Tìm vị trí của "user_inf_fb="
      const user_inf_fbIndex = currentUrl.indexOf('user_inf_fb=');
      if (user_inf_fbIndex !== -1) {
        // Tìm vị trí kết thúc của chuỗi giá trị cần lưu
        const endIndex = currentUrl.indexOf('#_=_', user_inf_fbIndex);
        if (endIndex !== -1) {
          // Lấy toàn bộ giá trị của user_inf_fb từ vị trí "user_inf_fb=" đến endIndex
          user_inf_fb = currentUrl.substring(user_inf_fbIndex + 12, endIndex);
        }
      }

      // Kiểm tra xem đã có giá trị token_gg và user_inf_gg hay chưa
      if (token_gg && user_inf_gg && !token_fb && !user_inf_fb) {
        localStorage.setItem('token', token_gg);
        const user = JSON.parse(decodeURIComponent(user_inf_gg));
        localStorage.setItem('user', JSON.stringify(user));
      } else if (token_fb && user_inf_fb && !token_gg && !user_inf_gg) {
        localStorage.setItem('token', token_fb);

        // Giải mã chuỗi user_inf_fb và lưu vào localStorage
        const user_inf_fb_decoded = decodeURIComponent(user_inf_fb);
        localStorage.setItem('user', user_inf_fb_decoded);
      }
    }
  },
  mounted() {
    const messages = this.$refs.messages;
    this.socket = io(socketUrl); // Thay đổi URL này cho phù hợp với server Socket.IO của bạn

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('chat message', (msg) => {
      this.messages.push({ id: Date.now(), text: msg });
      this.$nextTick(() => {
        messages.scrollTop = messages.scrollHeight;
      });
    });
    this.luuVaoLocalStorage();
  },
};
</script>
