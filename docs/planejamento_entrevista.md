# Planejamento de Entrevista - Extração de Requisitos

## Índice

[1. Perguntas Gerais](#1.\ Perguntas\ Gerais)

[2. Usuários e Cadastro](#2.\ Usuários\ e\ Cadastro)

[3. Serviços](#3.\ Serviços)

[4. Preço](#4.\ Preço)

[5. Contato](#5.\ Contato)

[6. Avaliação](#6.\ Avaliação)

[7. Requisitos Não Funcionais](#7.\ Requisitos\ Não\ Funcionais)

[8. Outras perguntas](#8.\ Outras\ perguntas)


## 1. Perguntas Gerais

- Como surgiu a ideia do UniJobs?

- Qual problema existe atualmente que você quer resolver?

- Quais tipos de pessoas você procura atingir?

- Qual o problema que existe para cada um desses tipos de pessoa hoje em dia?

- Você pode descrever qual o fluxo (caso de uso) seguido por cada uma dessas pessoas atualmente para obter o que o UniJobs quer oferecer?

- Barreira ética do aplicativo? Podemos oferecer qualquer tipo de serviço? Exemplo: pagar outra pessoa para fazer um trabalho de faculdade.

## 2. Usuários e Cadastro

- Qual o público em específico? Só universitários podem oferecer trabalho e qualquer pessoa pode contratar serviço?

- Como deve ser o cadastro de uma pessoa no sistema? Quais informações coletar? Integração com Facebook?

- Verificar que oferecedor é universitário? Como fazer essa verificação? Por email da universidade?

- Quais informações pessoais são obrigatórias? Foto obrigatórias? Quando foto é enviada? Que verificação deve ser feita?

- É necessário confirmar informações (confirmação de número, por exemplo)? 

- Perfil "jurídico"? "Ganesh<grupo extracurricular> procura/oferece um serviço". Cadastro por email constitucional?

- Para empresas procurando por serviço, verificação de cadastro deve ser manual? Ex: Raccoon procura estudantes para…

- Professor pode ser um usuário? E funcionário? 

- Quais informações de um usuário são abertas para os demais? (Biografia, Universidade, Curso)

- Podemos começar só com a USP?

## 3. Serviços

- Quais exemplos de serviço você imagina que podem ser oferecidos na plataforma?

- Há categorias de serviço? Todo serviço deve estar associado à uma categoria?

- Existem subcategorias? (Ex: Aula, subcategoria: Cálculo I)?

- Pessoas podem criar categorias? Se sim, tanto quem oferece quanto quem demanda pode criar categoria?

- Como gerenciar criação de categorias? Gerenciar categorias duplicadas?

- Devemos mostrar categorias de serviço mais procuradas?

- App deve ser lançado com categorias pré prontas? Quais categorias incluir?

- Como usuário pode buscar por serviço (filtro por categoria/subcategoria, preço)?

- Como deve ser busca? Um campo único como google que já gerencia tags e busca semântica? Posso entrar em uma categoria e fazer uma busca dentro de uma subcategoria?

- Busca exata ou por contexto? Como refinar a busca?

- Busca pode ser feito em um mapa? Por range? 

- Como resultados devem ser mostrados? Lista, mapa, qual ordem de prioridade?

- Mostramos distância entre dois usuários?

- Colocar disponibilidade no perfil de cada pessoa? (Ex: em uma semana de provas, pode demorar mais pra responder). Status ou calendário com dias nos quais ela não poderá oferecer o serviço?

- Oferecedor pode ocultar serviço durante um período de tempo (em um período de prova, por exemplo)?

- Contratação disponível a longo prazo?

- Há um moderador para revisar serviços e retirar aqueles inadequados ? Como se proteger contra casos como venda de drogas?

- Você pode descrever um fluxo típico de um usuário oferecedor?

- E de um usuário consumidor?

    - Usário 1 busca alguém que me ensine copoeira
    - Entra no app
    - Procura capoeira
    - Nenhum serviço é mostrado
    - Aparece uma opção pra cadastrar interesse
    - Cadastra interesse em categoria
    - Sai do app
    - Usuário 2 cadastra um serviço "aula de copoeira"
    - Usuário 1 recebe notificação informando sobre novo serviço 
    - Usuário 1 clica na notificação e é levado para página do serviço

- UI diferente para tipo de usuário? Tela Inicial diferente para cada usuário já que a informação importante para cada um é diferente.

## 4. Preço

- Todo serviço deve ser pago? O preço deve ser sempre informado ou pode ser combinado depois entre duas partes? (Exemplo: faixa de preço vs preço exato)

- Como processar o pagamento? Pela plataforma (ex Uber) ou pessoas podem acertar pessoalmente? (ex BlaBlaCar)? Se pelo aplicativo, como tratar refund?

- Há uma cobrança de taxa sobre transações no app? Retorno por porcentagem do valor pago?

## 5. Contato

- Devemos apenas oferecer informação de contato ou gerenciar próprio contato (oferecer possibilidade de chat entre partes envolvidas)?

- Basta dar match de interesse para as pessoas se conectarem? Ambas pessoas devem aceitar (oferecedor e consumidor)? 

- Somente damos informações pessoais quando ambas pessoas estão interessadas?

- Há um limite de tempo para o oferecedor aceitar o interesse?

## 6. Avaliação

- Há alguma forma de avaliação? Em ambos em sentidos (de quem oferece e de quem demanda)?

- Avaliação sobre pessoa ou serviço demandado/oferecido?

- Avaliação por nota? Qual escala?

- Nota + feedback? Exemplo, nota geral da pessoa + feedback por instância de serviço.

- Há categorias de avaliação (contato, satisfação, qualidade do atendimento, qualidade do serviço) ?

- Tags de avaliação para dar upvote (ex: LinkedIn)?

- Tags podem ser criadas? Se sim, quando? E se alguém criar uma tag ofensiva? Oferecedor deve aceitá-las antes de torná-las públicas.

- Duas avaliações: interna(só oferecedor pode ver avaliação) x externa(aberta a todo mundo)?

- Tags de avaliação de usuário consumidor pré prontas já que é algo mais genérico?

- Feedbacks anônimos? Pessoa pode escolher entre mostrar ou não feedback? 

- Podemos mostrar quantos "amigos" já usaram aquele serviço? Podemos ver feedback de um "amigo" se ele habilitou isso?

- Usuário pode dar reply em um feedback?

## 7. Requisitos Não Funcionais

- Qual o formato da solução (app ou site web)?

- Para qual plataforma o app deve estar disponível?

- Para qual versão do sistema operacional?

- Você acha interessante fazer dois protótipos?

- Qual frameworks/linguagem você prefere que a gente use? Go/Java?

- Quais tipos de testes? Unitário e Integração?

- Testes automatizados? Com quais ferramentas?

- Para deploys? Usar docker, kubernetes?

- SLA (Service Level Agreement)? Se servidor cair, rerotear tráfego? Servidor deve ser replicado para isso?

- Devemos adicionar algum tipo de monitoramento?

## 8. Outras Perguntas

- Você tem outras soluções que resolvem problemas parecidos que possuem funcionalidades que você considera primordial para o UniJobs? Se sim, dê exemplos.

- Alguma questão que eu não fiz que você ache pertinente?we
