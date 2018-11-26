<template>
    <div id="login">
        <div class="container-fluid">
            <div class="row justify-content-center" style="padding-top:25vh">
                <card>
                    <h4 slot="header" class="card-title text-center"> <strong>Reservas de salas UTFPR-CM</strong> </h4>
                    <form>
                        <div class="row">
                            <div class="col-12">
                                <fg-input type="email" label="E-mail institucional" placeholder="Digite seu E-mail" v-model="user"  autocomplete="username">
                                </fg-input>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <fg-input type="password" label="Senha" placeholder="Digite sua senha" v-model="password" autocomplete="current-password">
                                </fg-input>
                            </div>
                        </div>
                        <br>
                        <div class="row justify-content-center">
                                <button type="submit" class="btn btn-info btn-block" @click.prevent="teste">
                                    Realizar login
                                </button>
                        </div>
                        <br>
                        <br>
                        <div slot="footer" class="clearfix">
                            <div class="row">
                                <div class="col-6 text-left">
                                    <router-link to="/login/#" class="text-link">Realizar cadastro</router-link>
                                </div>
                                <div class="col-6 text-right">
                                    <router-link to="/login/#" class="text-link">Recuperar senha</router-link>
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
import Card from 'src/components/UIComponents/Cards/Card.vue'

export default {
    components: {
        Card
    },
    data () {
        return {
            user: null,
            password: null
        }
    },
    methods: {
        teste () {
            alert('user: ' + this.user + '\npass: ' + this.password)
        }
    }
}
</script>
<style>
body {
    overflow: hidden;
    overflow-x:hidden;
    overflow-y:hidden;
    background-image: linear-gradient(0deg, #D0D0D0 50%, #D0D0D0 50%);
}
.card {
    min-height: 50vh;
    min-width: 25vw;
    padding: 2em;
}

#login {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
}

#login::before {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;

    display: block;
    background-position: center;
    background-image: url('https://picsum.photos/1280/724/?random');
    background-size:cover;
    width: 100%;
    height: 100%;

    /* -webkit-filter: blur(0.35em);
    -moz-filter: blur(0.35em);
    -o-filter: blur(0.35em);
    -ms-filter: blur(0.35em);
    filter: blur(0.35em); */
}
</style>
