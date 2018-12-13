import httplib2
import urllib.parse
import re
import os
import sys

from base64 import b64encode


#gera o cabecalho com a autenticacao
def geraCabecalho(usuario, senha):
    h = httplib2.Http()

    # realiza a autenticação básica (apache)
    usuario_senha = usuario + ":" + senha
    autorizacao = "Basic " + b64encode(str.encode(usuario_senha)).decode("ascii")

    # Cabeçalhos com a autenticação
    header = { 'Host' : 'utfws.utfpr.edu.br',
                'Authorization' : autorizacao,
                'content-type':'application/x-www-form-urlencoded'
                }
    return header



############# PARSER DO HTML #########################
def parseSalasExistentes(html):
    valores = re.findall('<option value=\"(\d+)[^>]*>([\w|\d]*)',html)
    return valores


def parseHorariosSala(html):
    valores = re.findall("fsApresentacaoUmHorarioComb\(\s*'dv_([^']+)'[^>]+>([^<]+)<br[\s|\/]*>([^-]*)-([^\s]*) ([^<]*)<br[\s|\/]*>\s([^<]*)",html)
    return valores

def parseNomeSala(html):
    valores = re.findall("<strong>Mapa de aula da sala: </strong>([^\s]*)",html)
    return valores[0]

def parseTipoSala(html):
    valores = re.findall("<strong>Tipo de sala: </strong>([^\s]*)",html)
    return valores[0]

def parseCapacidadeSala(html):
    valores = re.findall("<strong>Capacidade Máx: </strong>(\d*)",html)
    return valores[0]

#######################################################

# captura as salas existentes e seus respectivos codigos
def capturaSalasExistentes(headers):
    h = httplib2.Http()

    #URL base para a consulta
    urlbase = "https://utfws.utfpr.edu.br/acad03/sistema/mprelsaladisp.inicio"

    pasta = './salas_html'
    if not os.path.exists(pasta) :
        os.mkdir(pasta)

    # armazena o arquivo html
    arquivo = open("./salas_html/_salas.html","w")
    try:
        resposta, conteudo = h.request(urlbase, 'GET', headers=headers)
        print("Captura Salas Existentes: ", resposta.status)
        html = conteudo.decode(encoding="ISO-8859-1")
        arquivo.write(html)
        salas = parseSalasExistentes(html) # parser do html para extrair as salas e seus codigos
        print(salas) # imprime o resultado para conferencia
        arquivo.close()
        return salas

    except ValueError as Argument:
        print ("The argument does not contain numbers\n", Argument)
        print("Erro na solicitação.")
        return None

    arquivo.close()


# faz uma requisicao do horario de cada sala
# cria um arquivo CSV para armazenar o resultado
def capturaHorarioSalas(headers, salas, ano, semestre):

    h = httplib2.Http(".cache", disable_ssl_certificate_validation=True)

    #URL base para a consulta
    urlbase = "https://utfws.utfpr.edu.br/acad03/sistema/mpRelSalaDisp.pcResultado"



    consultas = []
    for sala in salas:
        nome = sala[1]
        codigoSistema = sala[0]
        consultas.append({'sala':nome,'codigoSistema':codigoSistema, 'requisicao':{'p_periodoanualanonr':ano,  'p_periodoanualseqnr':semestre,'p_ambientecodnr':codigoSistema}})

    nomeArquivoHorarios = "horarios-" + str(ano) + "-" + str(semestre) + ".csv"
    arquivoHorariosCsv = open(nomeArquivoHorarios, "w")

    pasta = './salas_html'
    if not os.path.exists(pasta) :
        os.mkdir(pasta)

    arquivoSalasCsv = open("salas.csv", "w")

    for consulta in consultas:
        nomeArquivo = "salas_html/" + consulta['sala'] + ".html"
        arquivo = open(nomeArquivo,"w")

        try:
            resposta, conteudo = h.request(urlbase, 'POST', headers=headers, body=urllib.parse.urlencode(consulta['requisicao']))

            print("Sala ", consulta['sala'], ": ", resposta.status, " - ", len(conteudo.decode(encoding="ISO-8859-1")), " Kb")
            # html = conteudo.decode(encoding="ISO-8859-1")
            html = conteudo.decode(encoding="ISO-8859-1")
            arquivo.write(html)

            sala = parseNomeSala(html)
            tipo = parseTipoSala(html)
            capacidade = parseCapacidadeSala(html)

            arquivoSalasCsv.write(sala)
            arquivoSalasCsv.write(";")
            arquivoSalasCsv.write(consulta['codigoSistema'])
            arquivoSalasCsv.write(";")
            arquivoSalasCsv.write(tipo)
            arquivoSalasCsv.write(";")
            arquivoSalasCsv.write(capacidade)
            arquivoSalasCsv.write("\n")


            print("Parsing: ", sala, tipo, capacidade)
            horarios = parseHorariosSala(html)
            for entry in horarios:
                horario = entry[0]
                codigoDisciplina = entry[2]
                nomeDisciplina = entry[1]
                turma = entry[3]
                professor = entry[5]

                arquivoHorariosCsv.write(sala)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(tipo)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(capacidade)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(horario)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(codigoDisciplina)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(turma)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(nomeDisciplina)
                arquivoHorariosCsv.write(";")
                arquivoHorariosCsv.write(professor)
                arquivoHorariosCsv.write("\n")

        except ValueError as Argument:
            print ("The argument does not contain numbers\n", Argument)
            print("Erro na solicitação.")
            return None

        arquivo.close()

    arquivoHorariosCsv.close()
    arquivoSalasCsv.close()





username = sys.argv[1]
password = sys.argv[2]

#gera o cabecalho autenticado para usar nas requisicoes
header = geraCabecalho(username, password)

#captura todas as salas existentes
salas = capturaSalasExistentes(header)

#faz a requisicao do horario de todas as salas e gera um csv com os dados
capturaHorarioSalas(header, salas, 2018, 2)
