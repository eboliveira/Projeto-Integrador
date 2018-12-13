<template>
    <div id="registration">
        <div class="container-fluid">
            <div class="row justify-content-center" style="padding-top:5vh">
                <card>
                    <h4 slot="header" class="card-title text-center"> <strong>Reservas de salas UTFPR-CM<br>Criar cadastro</strong> </h4>
                    <form v-on:submit.prevent="registerUser">
                        <div class="row">
                            <div class="col-md-6">
                                <fg-input type="text" label="Nome" placeholder="Digite seu primeiro nome" v-model="new_user.name"  autocomplete="off" aria-required="Por favor, informe seu nome" required>
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="text" label="Sobrenome" placeholder="Digite seu sobrenome" v-model="new_user.last_name"  autocomplete="off" aria-required="Por favor, informe seu sobrenome" required>
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <fg-input type="text" label="Registro institucional" placeholder="Digite seu registro institucional" v-model="new_user.register_number"  autocomplete="off" aria-required="Por favor insira um registro institucional" required>
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input type="email" label="E-mail institucional" placeholder="Digite seu e-mail institucional" v-model="new_user.email"  autocomplete="off" aria-required="Por favor, informe um e-mail" required>
                                </fg-input>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-md-6">
                                <fg-input type="password" label="Senha" placeholder="Minimo de 6 caracteres" v-model="new_user.password" v-on:change="validatePassword" autocomplete="off" aria-required="Por favor digite uma senha" required>
                                </fg-input>
                            </div>
                            <div class="col-md-6">
                                <fg-input id="confirma_senha" type="password" label="Confirme sua senha" placeholder="Digite sua senha novamente" v-model="new_user.password_check" v-on:change="validatePassword" autocomplete="off" aria-required="Por favor, confirme sua senha" required>
                                </fg-input>
                            </div>
                        </div> -->
                        <div class="row">
                            <div class="col-md-6">
                                <label for="new_senha">Senha</label>
                                <b-form-input id="new_senha" type="password" label="Senha" placeholder="Digite sua senha (Min. 6 caracteres)" v-model="new_user.password" v-on:change="validatePassword" :state=this.pass_equal aria-describedby="Senhas diferem" required></b-form-input>
                                <b-form-invalid-feedback id = "formError">As senhas diferem</b-form-invalid-feedback>
                            </div>
                            <div class="col-md-6">
                                <label for="confirma_senha">Confirme sua senha</label>
                                <b-form-input id="confirma_senha" type="password" label="Confirme sua senha" placeholder="Digite sua senha novamente" v-model="new_user.password_check" v-on:change="validatePassword" :state=this.pass_equal aria-describedby="Senhas diferem" required></b-form-input>
                                <b-form-invalid-feedback id = "formError">As senhas diferem</b-form-invalid-feedback>
                            </div>
                        </div>
                        <br>
                        <hr />
                        <div class="row justify-content-center">
                                <button type="submit" class="btn btn-info btn-block">
                                    Realizar cadastro
                                </button>
                        </div>
                        <br>
                        <br>
                        <div slot="footer" class="clearfix">
                            <div class="row">
                                <div class="col-md-7 text-left">
                                </div>
                                <div class="col-md-5 text-right">
                                    <router-link to="/login" class="text-link">Já possui cadastro? Realize login clicando aqui.</router-link>
                                </div>
                            </div>
                        </div>
                    </form>
                </card>
            </div>
        </div>
    </div>
</template>
<script>
import auth from '../../services/firebase-controller'
import Card from 'src/components/UIComponents/Cards/Card.vue'
import {register} from '../../services/userManager'

export default {
    components: {
        Card
    },
    data () {
        return {
            pass_equal: null,
            new_user: {
                name: null,
                last_name: null,
                email: null,
                register_number: null,
                password: null,
                password_check: null
            }
        }
    },
    methods: {
        validatePassword() {
            var confirmPassword = document.getElementById('confirma_senha')            
            if (this.new_user.password == this.new_user.password_check) {
                confirmPassword.setCustomValidity('')
                this.pass_equal = true
            } else {
                this.pass_equal = false
                confirmPassword.setCustomValidity('As senhas diferem')
            }
        },
        registerUser(){
            let user = {
                uid: this.new_user.register_number,
                email: this.new_user.email,
                password: this.new_user.password,
                displayName: this.new_user.name + ' ' + this.new_user.last_name
            }
            let _this = this
            register(user).then(function(res){
                console.log(res)
                auth.signInWithEmailAndPassword(user.email, user.password).then((value) => {
                    auth.currentUser.sendEmailVerification().then((value) => {
                        console.log('Sending Email Verification...');
                    })
                })
                _this.$noty.success("Usuário criado com sucesso!<br><b>Confirme seu e-mail</b> para utilizar o sistema.<br>Não deixe de olhar sua caixa de spams.")
                _this.$router.replace('/login')
            }).catch((error) => {
                console.log('Error: ' + error.message)
                switch (error.message) {
                    case 'Request failed with status code 403':
                        this.$noty.error("E-mail não autorizado!<br>Por favor utilize um e-mail <b>institucional</b>.")
                        break
                    case 'Request failed with status code 401':
                        this.$noty.error("Não autorizado!<br>Por favor contate o administrador do sistema.")
                        break
                    case 'Request failed with status code 405':
                        this.$noty.error("Operação não autorizada!<br>Por favor Tente novamente mais tarde.")
                        break
                    case 'Request failed with status code 409':
                        this.$noty.error("E-mail inválido ou já cadastrado.<br>Você já não possui cadastro no sistema?")
                        break
                    default:
                        this.$noty.error("Um erro inesperado ocorreu.<br>Por favor, tente novamente mais tarde")
                        break
                }
            });
        }
    }
}
</script>
<style>
body {
    background-image: linear-gradient(0deg, #D0D0D0 50%, #D0D0D0 50%);
}
#registration .card {
    min-height: 90vh;
    min-width: 90vw;
    padding: 2em;
}

#registration {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
}

#registration::before {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;

    display: block;
    background-position: center;
    background-image: url('https://picsum.photos/1280/724/?random');
    background-size:cover;
    width: 100vw;
    height: 100vh;

    /* -webkit-filter: blur(0.35em);
    -moz-filter: blur(0.35em);
    -o-filter: blur(0.35em);
    -ms-filter: blur(0.35em);
    filter: blur(0.35em); */
}
</style>
