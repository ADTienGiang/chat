<template>
    <div class="login-box">
        <h1>Register</h1>
        <form class="form_login_normal">
            <input type="text" class="input_login_normal" placeholder="Email" @keyup.enter="register" v-model="email">
            <input type="text" class="input_login_normal" placeholder="Password" @keyup.enter="register" v-model="password">
            <input type="text" class="input_login_normal" placeholder="Username" @keyup.enter="register" v-model="username">
            <input type="text" class="input_login_normal" placeholder="code" @keyup.enter="register" v-model="question">
            <input type="text" class="input_login_normal" placeholder="address" @keyup.enter="register" v-model="address">
            <input type="text" class="input_login_normal" placeholder="phone" @keyup.enter="register" v-model="phone">
            <div class="btn_login_nor">
                <button class="btn_login_nor" :class="{ 'loading': isRegistering }" @click="register"
                    :disabled="isRegistering"> <span v-if="!isRegistering">Register</span>
                    <span v-else><i class="fa fa-spinner fa-spin"></i> Registering...</span></button>
            </div>
        </form>
        <h5 class="Login_h2_social">Login with Social Media</h5>
        <div class="login-social-buttons">
            <div class="social-button-container" @click="socialLogin('google')">
                <button id="login-with-google" type="submit" data-network="Google"
                    class="button social-account-button button-fullwidth">
                    <svg width="705.6" height="720" viewBox="0 0 186.69 190.5">
                        <g transform="translate(1184.583 765.171)">
                            <path clip-path="none" mask="none"
                                d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                                fill="#4285f4"></path>
                            <path clip-path="none" mask="none"
                                d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                                fill="#34a853"></path>
                            <path clip-path="none" mask="none"
                                d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                                fill="#fbbc05"></path>
                            <path
                                d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                                fill="#ea4335" clip-path="none" mask="none"></path>
                        </g>
                    </svg>
                    Log In with Google
                </button>
            </div>
            <div class="social-button-container">
                <button id="login-with-github" type="submit" data-network="Github"
                    class="button social-account-button button-fullwidth">
                    <svg width="98" height="96" viewBox="0 0 100 100">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
                            fill="#fff"></path>
                    </svg>
                    <span>Log In with GitHub</span>
                </button>
            </div>
            <div class="social-button-container" @click="socialLogin('facebook')">
                <button id="login-with-facebook" type="submit" data-network="Facebook"
                    class="button social-account-button button-fullwidth">
                    <svg width="1365.12" height="1365.12" viewBox="0 0 14222 14222">
                        <circle cx="7111" cy="7112" r="7111" fill="#1977f3"></circle>
                        <path
                            d="M9879 9168l315-2056H8222V5778c0-562 275-1111 1159-1111h897V2917s-814-139-1592-139c-1624 0-2686 984-2686 2767v1567H4194v2056h1806v4969c362 57 733 86 1111 86s749-30 1111-86V9168z"
                            fill="#fff"></path>
                    </svg>
                    <span>Log In with Facebo</span>
                </button>
            </div>
        </div>
        <div>
            <router-link class="text-decoration-none" :to="{ name: 'login' }"><button class="btn btn--large">Already have an
                    account? Login</button></router-link>
        </div>
    </div>
    <toast ref="toast"></toast>
</template>
<script>
import '../assets/login/css/login.css';
import toast from '../components/toastclient.vue';
export default
    {
        data() {
            return {
                isDarkMode: false,
                username: '',
                password: '',
                address: '',
                phone: '',
                email: '',
                repassword: '',
                emailError: '',
                question: '',
                isRegistering: false
            };
        },
        components: {
            toast
        },
        methods:
        {
            async register(event) {
                event.preventDefault();
                if (!this.validateForm()) {
                    return;
                }
                this.isRegistering = true;
                console.log(this.address)
                try {
                    const register = await this.$axios.post(
                        `register`,
                        {
                            username: this.username,
                            password: this.password,
                            email: this.email,
                            phone: this.phone,
                            address: this.address,
                            question: this.question
                        }
                    );
                    if (register.status === 200) {
                        this.$router.push({ name: 'login' });
                    }
                    this.isRegistering = false;
                } catch (error) {
                    if (error.response && error.response.data) {
                        const { message } = error.response.data;
                        this.$refs.toast.showToast(message);
                        this.isRegistering = false;
                    } else {
                        this.$refs.toast.showToast('lỗi server' + error);
                        console.log(error)
                    }
                }
            },
            socialLogin(provider) {
                // Thực hiện đăng nhập bằng cách chuyển hướng đến trang đăng nhập của nhà cung cấp
                switch (provider) {
                    case 'google':
                        this.$router.push({ name: 'google-auth' });
                        break;
                    case 'facebook':
                        this.$router.push({ name: 'facebook-auth' });
                        break;
                    default:
                        break;
                }
            },
            validateForm() {
                if (!this.email) {
                    this.$refs.toast.showToast('Email không được bỏ trống');
                    return false;
                } else if (!this.password) {
                    this.$refs.toast.showToast('Mật khẩu không được bỏ trống');
                    return false;
                } else if (!this.username) {
                    this.$refs.toast.showToast('Tên người dùng không được bỏ trống');
                    return false;
                } else if (!this.question) {
                    this.$refs.toast.showToast('Mã dự phòng không được bỏ trống');
                    return false;
                } else if (!this.phone) {
                    this.$refs.toast.showToast('Số điện thoại không được bỏ trống');
                    return false;
                } else if (!this.address) {
                    this.$refs.toast.showToast('Địa chỉ không được bỏ trống');
                    return false;
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(this.email)) {
                    alert('Email nhập vào không đúng chuẩn.');
                    return false;
                }
                const TestPasss = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(this.password);
                if (!TestPasss) {
                    alert('Mật khẩu chưa đủ chuẩn');
                    return false;
                }
                const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
                if (!phoneRegex.test(this.phone)) {
                    alert('Số điện thoại phải đủ 10 số.');
                    return false;
                }
                return true;
            },
        }
    }
</script>
  