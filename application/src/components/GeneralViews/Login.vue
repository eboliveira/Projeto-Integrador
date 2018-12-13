<template>
  <div id="login">
    <div class="container-fluid">
      <div class="row justify-content-center" style="padding-top:25vh">
        <card>
          <h4 slot="header" class="card-title text-center">
            <strong>
              Reservas de salas UTFPR-CM
              <br>
              <span v-if="!recuperar_senha">Realizar login</span>
              <span v-else>Recuperar senha</span>
            </strong>
          </h4>
          <form>
            <div class="row">
              <div class="col-12">
                <fg-input
                  type="email"
                  label="E-mail institucional"
                  placeholder="Digite seu E-mail"
                  v-model="user"
                  autocomplete="username"
                ></fg-input>
              </div>
            </div>
            <div v-if="!recuperar_senha" class="row">
              <div class="col-12">
                <fg-input
                  type="password"
                  label="Senha"
                  placeholder="Digite sua senha"
                  v-model="password"
                  autocomplete="current-password"
                ></fg-input>
              </div>
            </div>
            <br>
            <div class="row justify-content-center">
              <button
                v-if="!recuperar_senha"
                type="submit"
                class="btn btn-info btn-block"
                @click.prevent="logIn"
              >Realizar login</button>
              <button
                v-else
                type="submit"
                class="btn btn-info btn-block"
                @click.prevent="recuperarSenha"
              >Recuperar senha</button>
            </div>
            <br>
            <br>
            <div slot="footer" class="clearfix">
              <div class="row">
                <div class="col-6 text-left">
                  <router-link to="/register" class="text-link">Realizar cadastro</router-link>
                </div>
                <div v-if="!recuperar_senha" class="col-6 text-right">
                  <a
                    href="#"
                    v-on:click="recuperar_senha = true"
                    class="text-link"
                  >Esqueci minha senha</a>
                </div>
                <div v-else class="col-6 text-right">
                  <a href="#" v-on:click="recuperar_senha = false" class="text-link">Realizar login</a>
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
import auth from "../../services/firebase-controller";
import Card from "src/components/UIComponents/Cards/Card.vue";

export default {
  components: {
    Card
  },
  data() {
    return {
      recuperar_senha: false,
      user: null,
      password: null
    };
  },
  created() {
    let loader = this.$loading.show();

    let userRole = null;
    let _this = this;
    auth.onAuthStateChanged(function(user) {
      if (user) {
        user
          .getIdTokenResult()
          .then(idTokenResult => {
            userRole = idTokenResult.claims.role;
            _this.$user.set(
              Object.assign(auth.currentUser, { role: userRole })
            );
            _this.$router.replace("/general/overview");
          })
          .then(() => {
            loader.hide();
          });
      } else {
          loader.hide();
      }
    });
  },
  methods: {
    recuperarSenha() {
      auth
        .sendPasswordResetEmail(this.user)
        .then(() => {
          this.$noty.success(
            "E-mail de recuperação enviado com sucesso!<br>Acesse o link em seu e-mail para <b>redefinir</b> sua senha.<br>Não deixe de olhar sua caixa de spams."
          );
          recuperar_senha = false;
        })
        .catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              this.$noty.error("E-mail inválido!");
              break;
            case "auth/user-disabled":
              this.$noty.error(
                "Usuário desabilitado!<br>Contate o administrador do sistema para mais informações."
              );
              break;
            case "auth/user-not-found":
              this.$noty.error(
                "Usuário não encontrado.<br>Você já realizou seu cadastro?"
              );
              break;
            default:
              this.$noty.error(
                "Um erro inesperado ocorreu.<br>Por favor, tente novamente mais tarde"
              );
              break;
          }
        });
    },
    logIn() {
      auth
        .signInWithEmailAndPassword(this.user, this.password)
        .then(value => {
          let userRole = null;
          auth.currentUser.getIdTokenResult().then(idTokenResult => {
            userRole = idTokenResult.claims.role;
            this.$user.set(Object.assign(auth.currentUser, { role: userRole }));
            this.$noty.success("Logado com sucesso!",{
                killer: true,
                visibilityControl: false
            });
            this.$router.replace("/general/overview");
          });
        })
        .catch(error => {
          switch (error.code) {
            case "auth/invalid-email":
              this.$noty.error("E-mail inválido!");
              break;
            case "auth/user-disabled":
              this.$noty.error(
                "Usuário desabilitado!<br>Contate o administrador do sistema para mais informações."
              );
              break;
            case "auth/user-not-found":
              this.$noty.error(
                "Usuário não encontrado ou senha incorreta.<br>Você já realizou seu cadastro?"
              );
              break;
            case "auth/wrong-password":
              this.$noty.error(
                "Usuário não encontrado ou senha incorreta.<br>Você já realizou seu cadastro no sistema?"
              );
              break;
            default:
              this.$noty.error(
                "Um erro inesperado ocorreu.<br>Por favor, tente novamente mais tarde"
              );
              break;
          }
          console.log("Error code: " + error.code);
          console.log("Error: " + error);
        });
    }
  }
};
</script>
<style>
body {
  overflow: hidden;
  overflow-x: hidden;
  overflow-y: hidden;
  background-image: linear-gradient(0deg, #d0d0d0 50%, #d0d0d0 50%);
}
#login .card {
  min-height: 50vh;
  min-width: 25vw;
  padding: 2em;
}

#login {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
}

#login::before {
  content: "";
  position: fixed;
  left: 0;
  right: 0;
  z-index: -1;

  display: block;
  background-position: center;
  background-image: url("https://picsum.photos/1280/724/?random");
  background-size: cover;
  width: 100%;
  height: 100%;

  /* -webkit-filter: blur(0.35em);
    -moz-filter: blur(0.35em);
    -o-filter: blur(0.35em);
    -ms-filter: blur(0.35em);
    filter: blur(0.35em); */
}
</style>
