<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="card">
            <div class="card-header">
              <h4 class="card-title">Usuários</h4>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-hover table-striped">
                  <thead>
                    <td>Nome</td>
                    <td>Departamento</td>
                    <td>Cargo</td>
                    <td></td>
                  </thead>
                  <tbody>
                    <tr>
                      <td>José da Silva Sauro</td>
                      <td>DACOM</td>
                      <td>Professor</td>
                      <td>
                        <a class="btn btn-info btn-xs" v-tooltip="Visualizar" href="#"><i class="fa fa-eye fa-2x" style="padding-right:21px; color:black;"></i></a>
                        <a class="btn btn-danger btn-xs" v-tooltip="Excluir" href="#"><i class="fa fa-times fa-2x" style="padding-right:15px; color:black;"></i></a>
                      </td>
                    </tr>
                    <tr>
                      <td>Maria Juana da Silva</td>
                      <td>DALIM</td>
                      <td>Professora</td>
                      <td>
                          <a class="btn btn-info btn-xs" v-tooltip="Visualizar" href="#"><i class="fa fa-eye fa-2x" style="padding-right:21px; color:black;"></i></a>
                          <a class="btn btn-danger btn-xs" v-tooltip="Excluir" href="#"><i class="fa fa-times fa-2x" style="padding-right:15px; color:black;"></i></a>
                      </td>
                    </tr>
                    <tr>
                      <td>João José</td>
                      <td>DIRPLAD</td>
                      <td>SERVIDOR</td>
                      <td>
                          <a class="btn btn-info btn-xs" v-tooltip="Visualizar" href="#"><i class="fa fa-eye fa-2x" style="padding-right:21px; color:black;"></i></a>
                          <a class="btn btn-danger btn-xs" v-tooltip="Excluir" href="#"><i class="fa fa-times fa-2x" style="padding-right:15px; color:black;"></i></a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
