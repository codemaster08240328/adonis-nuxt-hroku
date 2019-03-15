<template>
    <div class="sp-padding-top">
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <section class="page-title">
                    <h1>Sign In</h1>
                </section>
                <!--end page-title-->
                <section>
                    <div v-if="loginfailed" :class="`alert bg-danger`">
                        <span style="color: white">Failed: Credentials are invalid</span>    
                    </div>
                    <form class="form inputs-underline" @submit.prevent="handleSubmit">
                        <div class="form-group">
                            <label for="email_address">Email Address</label>
                            <input type="text" v-model="user.email_address" v-validate="'required|email'" name="email_address" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email_address') }" />
                            <div v-if="submitted && errors.has('email_address')" class="invalid-feedback">{{ errors.first('email_address') }}</div>
                        </div>
                        <!--end form-group-->
                        <div class="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" ref="password" placeholder="Password" />
                            <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                        </div>
                        <div class="form-group center">
                            <button type="submit" class="btn btn-primary width-100" :disabled="status.loggingIn" >Sign In</button>
                        </div>
                        <!--end form-group-->
                    </form>

                    <hr>

                    <a href="#" data-modal-external-file="modal_reset_password.php" data-target="modal-reset-password">I have forgot my password</a>
                </section>
            </div>
            <!--col-md-4-->
        </div>
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    name: 'LoginView',

    data(){
        return {
            user: {
                email_address: '',
                password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState({
            status: state => state.auth.status,
            loginfailed: state => state.auth.loginfailed,
        })
    },
    methods: {
        ...mapActions('auth', ['login']),
        handleSubmit(e) {
            this.submitted = true;
            this.$validator.validate().then(valid => {
                if (valid) {
                    this.login(this.user);
                }
            });
        }
    }
}
</script>
