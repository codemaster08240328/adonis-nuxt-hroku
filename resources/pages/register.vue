<template>
    <div class="sp-padding-top">
        <div class="row">
            <div class="col-lg-4 offset-lg-4">
                <section class="page-title">
                    <h1>Register</h1>
                </section>
                <section>
                    <div v-if="registerfailed" :class="`alert bg-danger`">
                        <span style="color: white">Failed: Email Duplicated</span>    
                    </div>
                    <form class="form inputs-underline" @submit.prevent="handleSubmit">
                        <div class="row">
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label for="first_name">First Name*</label>
                                    <input type="text" v-model="user.first_name" v-validate="'required'" name="first_name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('first_name') }" />
                                    <div v-if="submitted && errors.has('first_name')" class="invalid-feedback">{{ errors.first('first_name') }}</div>
                                </div>
                                <!--end form-group-->
                            </div>
                            <!--end col-md-6-->
                            <div class="col-md-6 col-sm-6">
                                <div class="form-group">
                                    <label for="last_name">Last Name*</label>
                                    <input type="text" v-model="user.last_name" v-validate="'required'" name="last_name" class="form-control" :class="{ 'is-invalid': submitted && errors.has('last_name') }" />
                                    <div v-if="submitted && errors.has('last_name')" class="invalid-feedback">{{ errors.first('last_name') }}</div>
                                </div>
                                <!--end form-group-->
                            </div>
                            <!--end col-md-6-->
                        </div>
                        <!--enr row-->
                        <div class="form-group">
                            <label for="email_address">Email Address*</label>
                            <input type="text" v-model="user.email_address" v-validate="'required|email'" name="email_address" class="form-control" :class="{ 'is-invalid': submitted && errors.has('email_address') }" />
                            <div v-if="submitted && errors.has('email_address')" class="invalid-feedback">{{ errors.first('email_address') }}</div>
                        </div>
                        <!--end form-group-->
                        <div class="form-group">
                            <label htmlFor="password">Password*</label>
                            <input type="password" v-model="user.password" v-validate="{ required: true, min: 6 }" name="password" class="form-control" :class="{ 'is-invalid': submitted && errors.has('password') }" ref="password" placeholder="Password" />
                            <div v-if="submitted && errors.has('password')" class="invalid-feedback">{{ errors.first('password') }}</div>
                        </div>
                        <!--end form-group-->
                        <div class="form-group">
                            <label for="confirm_password">Confirm Password*</label>
                            <input type="password" v-model="user.confirm_password" v-validate="{ required: true, confirmed: 'password' }" class="form-control" :class="{ 'is-invalid': submitted && errors.has('confirm_password') }" name="confirm_password" id="confirm_password" placeholder="Confirm Password" >
                            <div v-if="submitted && errors.has('confirm_password')" class="invalid-feedback">{{ errors.first('confirm_password') }}</div>
                        </div>
                        <!--end form-group-->
                        <div class="form-group center">
                            <button class="btn btn-primary width-100" :disabled="status.loading">Register</button>
                        </div>
                        <!--end form-group-->
                    </form>

                    <hr>

                    <p class="center">By clicking on “Register Now” button you are accepting the <a href="terms-conditions.html">Terms & Conditions</a></p>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'RegisterView',
    data(){
        return {
            user: {
                first_name: '',
                last_name: '',
                email_address: '',
                password: '',
                confirm_password: ''
            },
            submitted: false
        }
    },
    computed: {
        ...mapState({
            status: state => state.auth.status,
            registerfailed: state => state.auth.registerfailed,
            alert: state=> state.alert
        })
    },
    methods: {
        ...mapActions('auth', ['register']),
        handleSubmit(e) {
            this.submitted = true;
            console.log(this.user.email_address)
            this.$validator.validate().then(valid => {
                if (valid) {
                    const param = {
                        first_name: this.user.first_name,
                        last_name: this.user.last_name,
                        email_address: this.user.email_address,
                        password: this.user.password
                    }
                    this.register(param);
                }
            });
        }
    }
}
</script>
<style>
.show{
    display: inline;
    color: red;
}
.disable{
    display: none;
}
</style>

